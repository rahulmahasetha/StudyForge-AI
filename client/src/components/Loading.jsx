import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4" aria-live="polite" aria-busy="true">
      <div className="relative mb-6">
        {/* Outer Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin"></div>
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Generating study material...</h2>
      <p className="text-gray-500 text-sm max-w-sm">
        Our AI is analyzing your notes and crafting custom flashcards and quiz questions. This usually takes a few seconds.
      </p>
    </div>
  );
};

export default Loading;
