import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ThemeToggle from '../components/ui/ThemeToggle';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="w-8 h-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold text-primary">BlueTexT</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <MessageSquare className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Welcome to BlueTexT</h2>
            <p className="text-text/70">Connect with friends and get help from INIT, your personal AI assistant.</p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline transition"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-text/50">
        <p>© 2025 BlueTexT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthPage;