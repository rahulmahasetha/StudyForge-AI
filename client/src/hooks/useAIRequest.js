import { useState, useRef, useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook to manage the AI generation lifecycle.
 * Handles loading states, strict error boundaries, and race conditions (AbortController).
 */
const useAIRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flashcards, setFlashcards] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [metadata, setMetadata] = useState(null);

  // We use a ref to store the current AbortController so we can cancel stale requests
  // if the user clicks "Generate" multiple times in quick succession.
  const abortControllerRef = useRef(null);

  const generateStudyMaterial = useCallback(async (notes, difficulty = 'Medium') => {
    // Prevent empty requests
    if (!notes || !notes.trim()) return;

    // If there's an ongoing request, cancel it to prevent race conditions
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new controller for the current request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setFlashcards(null);
    setQuiz(null);
    setMetadata(null);

    try {
      const response = await api.post(
        '/generate',
        { notes, difficulty },
        { signal: controller.signal }
      );

      // The backend uses Zod, so we can trust `response.data.data` matches our schema exactly.
      const { data, metadata } = response.data;
      
      setFlashcards(data.flashcards);
      setQuiz(data.quiz);
      setMetadata(metadata);
    } catch (err) {
      // Ignore errors that were caused by intentionally aborting the request
      if (err.name === 'CanceledError' || err.message === 'canceled') {
        console.log('Previous request aborted due to a new request.');
        return;
      }

      // Handle expected backend errors (our errorHandler formats these as err.response.data.error)
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } 
      // Handle network errors or timeouts
      else if (err.code === 'ECONNABORTED') {
        setError('The request took too long. Please try a shorter topic.');
      } 
      else if (err.message === 'Network Error') {
        setError('Cannot connect to the server. Please check your internet connection.');
      } 
      // Fallback for unexpected exceptions
      else {
        setError('An unexpected error occurred. Please try again.');
        console.error('[useAIRequest Error]:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setFlashcards(null);
    setQuiz(null);
    setError(null);
    setLoading(false);
    setMetadata(null);
  }, []);

  return {
    loading,
    error,
    flashcards,
    quiz,
    metadata,
    generateStudyMaterial,
    resetState
  };
};

export default useAIRequest;
