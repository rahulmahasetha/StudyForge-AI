import React, { useState, useRef, useEffect } from 'react';

const Header = ({ onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmRef = useRef(null);

  // Close confirmation box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target)) {
        setShowConfirm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetClick = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    onReset();
    setShowConfirm(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            S
          </div>
          <h1 className="text-xl font-bold text-dark">
            StudyForge AI
          </h1>
        </div>
        <nav className="relative" ref={confirmRef}>
          <button 
            onClick={showConfirm ? () => setShowConfirm(false) : handleResetClick}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              showConfirm ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Session
          </button>

          {/* Simple Confirmation Box */}
          {showConfirm && (
            <div className="absolute right-0 mt-3 p-3 bg-white border border-gray-100 rounded-xl shadow-lg w-48 z-50 animate-slide-up">
              <p className="text-xs text-gray-600 font-medium mb-3 text-center">
                Are you sure you want to reset the current session?
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmReset}
                  className="flex-1 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 shadow-sm transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
