import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import ProgressBar from './ProgressBar';
import { useToast } from './Toast';

const FlashcardModule = ({ flashcards: initialFlashcards, onFinish }) => {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToast } = useToast();

  useEffect(() => {
    setFlashcards(initialFlashcards);
    setCurrentIndex(0);
  }, [initialFlashcards]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (onFinish) onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    addToast('Flashcards shuffled', 'success');
  };

  const handleCopy = () => {
    const text = flashcards.map((f, i) => `Q${i + 1}: ${f.question}\nA: ${f.answer}\n`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      addToast('Flashcards copied to clipboard', 'success');
    }).catch(() => {
      addToast('Failed to copy', 'error');
    });
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="max-w-2xl mx-auto w-full animate-slide-up">
      <div className="mb-8">
        <button 
          onClick={onFinish}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-dark mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Dashboard
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-dark">Flashcard Review</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleShuffle}
              className="p-2 text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all"
              title="Shuffle Cards"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </button>
            <button 
              onClick={handleCopy}
              className="p-2 text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all"
              title="Copy All"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            </button>
          </div>
        </div>
        <ProgressBar current={currentIndex + 1} total={flashcards.length} label="Progress" />
      </div>

      <div className="mb-8">
        {currentCard && <Flashcard card={currentCard} />}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-xl font-medium transition-all shadow-sm ${
            currentIndex === 0
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'bg-white border border-gray-300 text-dark hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200'
          }`}
        >
          Previous
        </button>
        
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">
          {currentIndex + 1} / {flashcards.length}
        </span>

        <button
          onClick={handleNext}
          className="px-6 py-3 bg-dark text-white font-medium rounded-xl hover:bg-gray-800 shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-dark"
        >
          {currentIndex === flashcards.length - 1 ? 'Finish Review' : 'Next Card'}
        </button>
      </div>
    </div>
  );
};

export default FlashcardModule;
