import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import FlashcardModule from './components/FlashcardModule';
import QuizModule from './components/QuizModule';
import AIThinkingExperience from './components/AIThinkingExperience';
import SummaryCard from './components/SummaryCard';
import QuickExamples from './components/QuickExamples';
import useAIRequest from './hooks/useAIRequest';
import useSessionHistory from './hooks/useSessionHistory';
import { ToastProvider, useToast } from './components/Toast';

const MAX_CHARS = 5000;

function AppContent() {
  const [notes, setNotes] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'flashcards', 'quiz'
  const { addToast } = useToast();
  
  const { loading, error, flashcards, quiz, metadata, generateStudyMaterial, resetState } = useAIRequest();
  const { sessions, saveSession, deleteSession } = useSessionHistory();

  // Save session when new data arrives
  useEffect(() => {
    if (flashcards && quiz && metadata && currentView === 'dashboard') {
      const topicTitle = notes.slice(0, 30) + (notes.length > 30 ? '...' : '') || 'Untitled Session';
      saveSession(topicTitle, difficulty, flashcards, quiz, metadata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashcards, quiz, metadata]); // Only trigger when the generated data changes

  const handleGenerate = (e) => {
    e.preventDefault();
    if (notes.length > MAX_CHARS) {
      addToast('Notes exceed maximum character limit.', 'error');
      return;
    }
    setCurrentView('dashboard');
    generateStudyMaterial(notes, difficulty);
  };

  const handleClear = () => {
    setNotes('');
    resetState();
    setCurrentView('dashboard');
  };

  const handleEditNotes = () => {
    resetState();
    setCurrentView('dashboard');
  };

  const loadSession = (session) => {
    addToast('Session loaded (Viewing only)', 'success');
  };

  const hasData = flashcards && quiz && !loading && !error;

  return (
    <Layout onReset={handleClear}>
      {currentView === 'dashboard' && (
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
          
          {/* Top Row: Input & History */}
          {!hasData && !loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Input Form (2 columns) */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-dark">What would you like to study?</h2>
                    <p className="text-sm text-gray-500">Paste your notes here, or type a topic like 'React Hooks'...</p>
                  </div>
                </div>
                
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="relative">
                    <textarea
                      className={`w-full h-48 p-5 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-dark ${notes.length > MAX_CHARS ? 'border-red-300' : 'border-gray-200'}`}
                      placeholder="Paste your notes here, or type a topic like 'React Hooks'..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      disabled={loading}
                      aria-label="Study notes input"
                    />
                    <div className={`absolute bottom-4 right-5 text-xs font-medium ${notes.length > MAX_CHARS ? 'text-red-500' : 'text-gray-400'}`}>
                      {notes.length} / {MAX_CHARS}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">Difficulty:</span>
                      <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="bg-white border border-gray-200 text-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-2 shadow-sm min-w-[120px]"
                        disabled={loading}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading || !notes.trim() || notes.length > MAX_CHARS}
                      className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white transition-all shadow-sm
                        ${loading || !notes.trim() || notes.length > MAX_CHARS
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-md active:transform active:scale-95'
                        }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Generate Material
                    </button>
                  </div>
                </form>
              </div>

              {/* Sidebar / Session History (1 column) */}
              <div className="lg:col-span-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col max-h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-dark text-lg">Session History</h3>
                  <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">{sessions.length}</span>
                </div>
                
                {sessions.length === 0 ? (
                  <div className="text-center py-8 flex-grow">
                    <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-sm text-gray-500">No past sessions yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    {sessions.map(session => (
                      <div key={session.id} className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:border-indigo-100 hover:shadow-sm transition-all flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-dark text-sm truncate">{session.topic}</h4>
                          <div className="flex items-center gap-2 text-xs mt-1">
                            <span className="font-medium text-indigo-600">{session.difficulty}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">{new Date(session.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteSession(session.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {sessions.length > 0 && (
                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-dark transition-colors flex items-center justify-center gap-2">
                      View All Sessions
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Area: Examples & Empty State OR Results */}
          <div className="w-full flex flex-col gap-8">
            {loading && (
              <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <AIThinkingExperience />
              </div>
            )}
            
            {error && !loading && (
              <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <ErrorState 
                  message={error} 
                  onRetry={() => generateStudyMaterial(notes, difficulty)} 
                  onEditNotes={handleEditNotes}
                  onClear={handleClear}
                />
              </div>
            )}
            
            {!loading && !error && !hasData && (
              <>
                <QuickExamples onExampleClick={(topic) => setNotes(topic)} />
                <EmptyState />
              </>
            )}
            
            {hasData && (
              <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <SummaryCard 
                  flashcards={flashcards} 
                  quiz={quiz} 
                  metadata={metadata}
                  onStartFlashcards={() => setCurrentView('flashcards')}
                  onTakeQuiz={() => setCurrentView('quiz')}
                />
              </div>
            )}
          </div>

        </div>
      )}

      {currentView === 'flashcards' && (
        <FlashcardModule flashcards={flashcards} onFinish={() => setCurrentView('dashboard')} />
      )}
      
      {currentView === 'quiz' && (
        <QuizModule quiz={quiz} onFinish={() => setCurrentView('dashboard')} />
      )}
    </Layout>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
