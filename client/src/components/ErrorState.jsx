import React from 'react';

const ErrorState = ({ message, onRetry, onEditNotes, onClear }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto w-full animate-slide-up" role="alert" aria-live="assertive">
      <div className="bg-red-50 rounded-full p-4 mb-6 shadow-sm border border-red-100/50">
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-3 text-dark">Unable to generate study material</h2>
      
      <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8 text-left">
        <p className="text-sm font-medium text-dark mb-2">Possible reasons:</p>
        <ul className="text-sm text-gray-500 space-y-1.5 list-disc list-inside">
          <li>Network connection lost</li>
          <li>AI provider is temporarily busy</li>
          <li>Input was too ambiguous</li>
        </ul>
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-400 font-mono break-words">{message}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row w-full gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 px-6 py-3 bg-dark text-white rounded-xl font-medium shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark transition-all"
          >
            Retry Generation
          </button>
        )}
        <div className="flex gap-3 flex-1">
          {onEditNotes && (
            <button
              onClick={onEditNotes}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 text-dark rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Edit Notes
            </button>
          )}
          {onClear && (
            <button
              onClick={onClear}
              className="flex-1 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium shadow-sm hover:bg-red-100 transition-all focus:outline-none focus:ring-2 focus:ring-red-100"
            >
              Clear Input
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
