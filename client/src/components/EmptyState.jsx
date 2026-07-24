import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-8 sm:p-12 bg-white rounded-3xl shadow-sm w-full">
      <div className="relative mb-6 sm:mb-0 sm:mr-10 flex-shrink-0">
        <div className="bg-indigo-50/80 w-64 h-48 rounded-[3rem] absolute top-2 -left-4 -z-10 rotate-3 transform"></div>
        <div className="w-56 h-auto">
          {/* SVG Illustration resembling the book and plant */}
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="70" y="80" width="260" height="150" rx="20" fill="#E0E7FF" opacity="0.5" />
            <path d="M120 230 C120 230, 200 230, 200 210 C200 230, 280 230, 280 230 L280 100 C280 100, 200 100, 200 120 C200 100, 120 100, 120 100 Z" fill="white" stroke="#6366F1" strokeWidth="6" strokeLinejoin="round" />
            <path d="M200 120 V210" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" />
            <path d="M140 140 H180" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
            <path d="M140 160 H180" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
            <path d="M140 180 H170" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
            <path d="M220 140 H260" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
            <path d="M220 160 H260" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
            <path d="M220 180 H250" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
            
            {/* Plant */}
            <path d="M310 230 Q305 200 320 190 Q325 210 310 230" fill="#34D399" />
            <path d="M310 230 Q315 180 290 195 Q300 215 310 230" fill="#10B981" />
            <path d="M300 230 H320 L315 250 H305 Z" fill="#E2E8F0" />
            
            {/* Sparkles */}
            <path d="M90 110 L95 100 L100 110 L110 115 L100 120 L95 130 L90 120 L80 115 Z" fill="#A5B4FC" />
            <circle cx="340" cy="120" r="4" fill="#A5B4FC" />
            <circle cx="110" cy="180" r="3" fill="#A5B4FC" />
          </svg>
        </div>
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold mb-3 text-dark">Paste your notes or choose an example</h2>
        <p className="text-gray-500 max-w-sm leading-relaxed">
          StudyForge AI will instantly generate interactive flashcards and a quiz based on your study material.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
