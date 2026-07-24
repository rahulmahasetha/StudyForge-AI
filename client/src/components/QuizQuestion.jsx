import React, { useState, useEffect } from 'react';

const QuizQuestion = ({ questionData, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [questionData.id]);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    
    // Pass back whether it was correct or not, and the selected index
    const isCorrect = selectedOption === questionData.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect, selectedOption, questionData);
    }, 1500); // 1.5s delay to show feedback before moving to next question
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-6 sm:p-8 w-full">
      <h3 className="text-xl font-medium text-gray-800 mb-6 leading-relaxed">
        {questionData.question}
      </h3>
      
      <div className="space-y-3">
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectAnswer = index === questionData.correctAnswer;
          
          let optionClass = "w-full text-left p-4 rounded-xl border transition-all ";
          
          if (!isSubmitted) {
            optionClass += isSelected 
              ? "border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-200" 
              : "border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-700";
          } else {
            if (isCorrectAnswer) {
              optionClass += "border-green-500 bg-green-50 text-green-700";
            } else if (isSelected && !isCorrectAnswer) {
              optionClass += "border-red-500 bg-red-50 text-red-700";
            } else {
              optionClass += "border-gray-200 opacity-50 text-gray-500 cursor-not-allowed";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelectedOption(index)}
              disabled={isSubmitted}
              className={optionClass}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 text-sm font-bold ${
                  isSubmitted && isCorrectAnswer ? 'bg-green-200 text-green-800' :
                  isSubmitted && isSelected && !isCorrectAnswer ? 'bg-red-200 text-red-800' :
                  isSelected ? 'bg-primary-200 text-primary-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                </span>
                <span className="flex-1">{option}</span>
                
                {isSubmitted && isCorrectAnswer && (
                  <svg className="w-6 h-6 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isSubmitted && isSelected && !isCorrectAnswer && (
                  <svg className="w-6 h-6 text-red-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || isSubmitted}
          className={`px-8 py-3 rounded-xl font-medium transition-colors shadow-sm
            ${selectedOption === null || isSubmitted
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
        >
          {isSubmitted ? 'Checking...' : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
