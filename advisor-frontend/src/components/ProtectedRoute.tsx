import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // For demo purposes, we'll consider the user authenticated if they have a token in localStorage
  // In a real app, you'd check against your auth state/context
  const isAuthenticated = localStorage.getItem('authToken') || true; // Always true for demo

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
