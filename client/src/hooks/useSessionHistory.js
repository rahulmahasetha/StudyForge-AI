import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'studyforge_sessions';

const useSessionHistory = () => {
  const [sessions, setSessions] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSessions(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load sessions from localStorage', err);
    }
  }, []);

  const saveSession = useCallback((topic, difficulty, flashcards, quiz, metadata) => {
    const newSession = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      topic,
      difficulty,
      flashcards,
      quiz,
      metadata
    };

    setSessions(prev => {
      const updated = [newSession, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save session to localStorage', err);
      }
      return updated;
    });

    return newSession;
  }, []);

  const deleteSession = useCallback((id) => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to update localStorage', err);
      }
      return updated;
    });
  }, []);

  const getSession = useCallback((id) => {
    return sessions.find(s => s.id === id);
  }, [sessions]);

  return {
    sessions,
    saveSession,
    deleteSession,
    getSession
  };
};

export default useSessionHistory;
