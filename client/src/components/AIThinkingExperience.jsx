import React, { useState, useEffect } from 'react';

const STEPS = [
  "Understanding your notes...",
  "Extracting key concepts...",
  "Generating flashcards...",
  "Creating quiz questions...",
  "Preparing study experience..."
];

const AIThinkingExperience = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Advance steps automatically for the simulation
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on last step until generation finishes
      });
    }, 1500); // 1.5s per step

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto w-full">
      <div className="relative w-16 h-16 mb-8">
        {/* Animated Pulse Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping"></div>
        {/* Core AI Icon Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-dark mb-6">AI is Thinking</h3>
      
      <div className="w-full space-y-4">
        {STEPS.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-4 transition-all duration-500 ${
              index < currentStep 
                ? 'opacity-100 translate-y-0 text-gray-500' // completed
                : index === currentStep 
                  ? 'opacity-100 translate-y-0 text-dark font-medium' // active
                  : 'opacity-0 translate-y-4 pointer-events-none absolute -z-10' // upcoming (hidden)
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${
              index < currentStep ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : index === currentStep ? (
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              ) : null}
            </div>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIThinkingExperience;
