import React, { useState, useEffect } from 'react';

const Flashcard = ({ card, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when the card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) onFlip();
  };

  return (
    <div 
      className="w-full h-80 perspective-1000 cursor-pointer group"
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard: ${isFlipped ? 'Answer' : 'Question'}. Press Enter or Space to flip.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleFlip();
        }
      }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front (Question) */}
        <div className="absolute w-full h-full backface-hidden bg-white border border-gray-100 rounded-[2rem] shadow-sm p-8 flex flex-col justify-center items-center text-center group-hover:shadow-md group-hover:border-indigo-100 transition-all">
          <span className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Question</span>
          <h3 className="text-2xl font-semibold text-dark leading-relaxed">{card.question}</h3>
          <p className="absolute bottom-6 text-sm font-medium text-gray-400 group-hover:text-indigo-400 transition-colors">Click to flip</p>
        </div>

        {/* Back (Answer) */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] shadow-md p-8 flex flex-col justify-center items-center text-center rotate-y-180 text-white">
          <span className="text-xs font-bold text-white/80 mb-4 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Answer</span>
          <p className="text-xl font-medium leading-relaxed">{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
