import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import ProgressBar from './ProgressBar';
import StudyStatisticsDashboard from './StudyStatisticsDashboard';
import { useToast } from './Toast';

const QuizModule = ({ quiz, onFinish }) => {
  const [activeQuiz, setActiveQuiz] = useState(quiz); // Can be the full quiz, or just the wrong answers for a retest
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const { addToast } = useToast();

  const handleAnswer = (isCorrect, selectedOptionIndex, currentQuestion) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // Store the wrong answer and the user's selected option for review
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        userAnswer: currentQuestion.options[selectedOptionIndex],
        correctAnswer: currentQuestion.options[currentQuestion.correctAnswer]
      }]);
    }

    // Move to next question or finish quiz
    if (currentIndex < activeQuiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetest = () => {
    // Start a new quiz with only the incorrect answers (mapped back to original quiz format)
    const questionsToRetest = quiz.filter(q => 
      wrongAnswers.some(wa => wa.question === q.question)
    );
    setActiveQuiz(questionsToRetest);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setIsComplete(false);
  };

  const handleCopy = () => {
    const text = activeQuiz.map((q, i) => {
      const options = q.options.map((opt, idx) => `  ${String.fromCharCode(65 + idx)}. ${opt}`).join('\n');
      return `Q${i + 1}: ${q.question}\n${options}\nAnswer: ${q.options[q.correctAnswer]}\n`;
    }).join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      addToast('Quiz copied to clipboard', 'success');
    }).catch(() => {
      addToast('Failed to copy', 'error');
    });
  };

  if (isComplete) {
    return (
      <StudyStatisticsDashboard 
        score={score} 
        total={activeQuiz.length} 
        wrongAnswers={wrongAnswers} 
        onRetest={handleRetest}
        onFinish={onFinish}
      />
    );
  }

  const currentQuestionData = activeQuiz[currentIndex];

  return (
    <div className="max-w-2xl mx-auto w-full animate-slide-up">
      <div className="mb-8">
        <button 
          onClick={onFinish}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-dark mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Dashboard
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-dark">Quiz</h2>
          <button 
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all"
            title="Copy Quiz"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
          </button>
        </div>
        <ProgressBar current={currentIndex + 1} total={activeQuiz.length} label="Question Progress" />
      </div>

      <div className="mb-8">
        <QuizQuestion 
          questionData={currentQuestionData} 
          onAnswer={handleAnswer} 
        />
      </div>
    </div>
  );
};

export default QuizModule;
