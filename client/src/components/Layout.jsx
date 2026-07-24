import React from 'react';
import Header from './Header';

const Layout = ({ children, onReset }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-dark">
      <Header onReset={onReset} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
