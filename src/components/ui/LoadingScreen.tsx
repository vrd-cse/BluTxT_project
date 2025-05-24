import React from 'react';
import { MessageSquare } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
      <div className="animate-pulse mb-4">
        <MessageSquare className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-primary mb-2">BlueTexT</h1>
      <p className="text-text/70">Loading your conversations...</p>
    </div>
  );
};

export default LoadingScreen;