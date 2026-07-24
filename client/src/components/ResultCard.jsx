import React from 'react';

const ResultCard = ({ score, total, wrongAnswers, onRetest, onFinish }) => {
  const percentage = Math.round((score / total) * 100);
  let message = '';
  let colorClass = '';

  if (percentage >= 80) {
    message = 'Excellent job! You have a solid grasp of this material.';
    colorClass = 'text-green-600';
  } else if (percentage >= 50) {
    message = 'Good effort! A little more review and you will be perfect.';
    colorClass = 'text-yellow-600';
  } else {
    message = 'Keep studying! Use the flashcards to reinforce your knowledge.';
    colorClass = 'text-red-600';
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-8 w-full max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Quiz Complete</h2>
      
      <div className="my-8">
        <div className="relative w-40 h-40 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className={`${percentage >= 80 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold text-gray-800">{percentage}%</span>
          </div>
        </div>
      </div>

      <p className={`text-lg font-medium mb-6 ${colorClass}`}>
        {message}
      </p>
      
      <p className="text-gray-600 mb-8">
        You answered <strong className="text-gray-900">{score}</strong> out of <strong className="text-gray-900">{total}</strong> questions correctly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {wrongAnswers.length > 0 && (
          <button
            onClick={onRetest}
            className="px-6 py-3 bg-primary-50 border border-primary-200 text-primary-700 font-medium rounded-xl hover:bg-primary-100 transition-colors"
          >
            Retest Incorrect ({wrongAnswers.length})
          </button>
        )}
        <button
          onClick={onFinish}
          className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 shadow-sm transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
