import React from 'react';

const ProgressBar = ({ current, total, label }) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="w-full mb-8" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-sm font-semibold text-dark block">{label}</span>
          <span className="text-xs font-medium text-gray-500 mt-0.5 block">{current} / {total} Completed</span>
        </div>
        <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-out relative" 
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle shimmer effect */}
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
