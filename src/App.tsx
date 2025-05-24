import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { UserProvider } from './contexts/UserContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ChatProvider>
            <AppRouter />
          </ChatProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;