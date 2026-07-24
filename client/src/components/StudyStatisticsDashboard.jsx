import React from 'react';

const StudyStatisticsDashboard = ({ score, total, wrongAnswers, onRetest, onFinish }) => {
  const percentage = Math.round((score / total) * 100);
  
  let statusMessage = '';
  if (percentage >= 80) statusMessage = 'Excellent work!';
  else if (percentage >= 60) statusMessage = 'Good job, but room for review.';
  else statusMessage = 'Keep practicing. You will get there!';

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-slide-up">
      <button 
        onClick={onFinish}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-dark mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Dashboard
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-dark mb-2">Quiz Completed</h2>
        <p className="text-gray-500">{statusMessage}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100/50">
          <div className="text-gray-500 text-sm font-medium mb-1">Score</div>
          <div className="text-3xl font-bold text-dark">{score} / {total}</div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100/50">
          <div className="text-gray-500 text-sm font-medium mb-1">Accuracy</div>
          <div className="text-3xl font-bold text-dark">{percentage}%</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100/50 text-green-700">
          <div className="text-green-600/80 text-sm font-medium mb-1">Correct</div>
          <div className="text-3xl font-bold">{score}</div>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 border border-red-100/50 text-red-700">
          <div className="text-red-600/80 text-sm font-medium mb-1">Wrong</div>
          <div className="text-3xl font-bold">{wrongAnswers.length}</div>
        </div>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="mb-8 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h3 className="font-semibold text-dark">Questions to Review</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {wrongAnswers.map((item, idx) => (
              <div key={idx} className="p-6">
                <p className="font-medium text-dark mb-3">Q: {item.question}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100/50">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Your answer: <span className="font-semibold">{item.userAnswer}</span></span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100/50">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Correct answer: <span className="font-semibold">{item.correctAnswer}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetest}
          className="flex-1 bg-white text-dark border border-gray-200 rounded-xl py-4 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 shadow-sm"
        >
          Retake Quiz
        </button>
        <button
          onClick={onFinish}
          className="flex-1 bg-dark text-white rounded-xl py-4 font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark shadow-sm"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default StudyStatisticsDashboard;
