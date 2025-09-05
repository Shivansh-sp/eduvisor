import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import AssessmentResults from './pages/AssessmentResults';
import Colleges from './pages/Colleges';
import CollegeDetail from './pages/CollegeDetail';
import Careers from './pages/Careers';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="colleges" element={<Colleges />} />
              <Route path="colleges/:id" element={<CollegeDetail />} />
              <Route path="careers" element={<Careers />} />
            </Route>

                              {/* Protected routes */}
                  <Route path="/" element={<Layout />}>
                    <Route path="dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="assessment" element={
                      <ProtectedRoute>
                        <Assessment />
                      </ProtectedRoute>
                    } />
                    <Route path="assessment-results" element={
                      <ProtectedRoute>
                        <AssessmentResults />
                      </ProtectedRoute>
                    } />
                    <Route path="timeline" element={
                      <ProtectedRoute>
                        <Timeline />
                      </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                  </Route>

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;


