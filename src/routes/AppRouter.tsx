import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../pages/AuthPage';
import MainLayout from '../layouts/MainLayout';
import LoadingScreen from '../components/ui/LoadingScreen';

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <MainLayout /> : <AuthPage />;
};

export default AppRouter;