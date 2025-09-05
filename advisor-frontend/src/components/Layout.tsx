import React, { useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { usePageTransition } from '../hooks/useAnimations';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || 
                     location.pathname === '/register' || 
                     location.pathname.startsWith('/login') || 
                     location.pathname.startsWith('/register');
  const { pageRef, enterPage, exitPage } = usePageTransition();
  const navRef = useRef<HTMLElement>(null);
  
  // Authentication state
  const { user, loading, logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    // Navigation entrance animation
    if (navRef.current) {
      anime({
        targets: navRef.current,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }

    // Page transition animation
    enterPage();
  }, [location.pathname, enterPage]);

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav 
        ref={navRef}
        className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              >
                EduAdvisor
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-blue-600 bg-blue-50 shadow-lg' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Home
                {location.pathname === '/' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <Link 
                to="/colleges" 
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/colleges' 
                    ? 'text-blue-600 bg-blue-50 shadow-lg' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Colleges
                {location.pathname === '/colleges' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <Link 
                to="/careers" 
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/careers' 
                    ? 'text-blue-600 bg-blue-50 shadow-lg' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Careers
                {location.pathname === '/careers' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              <Link 
                to="/dashboard" 
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/dashboard' 
                    ? 'text-blue-600 bg-blue-50 shadow-lg' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Dashboard
                {location.pathname === '/dashboard' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
              {loading ? (
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  {/* Profile Photo - Clickable */}
                  <Link to="/profile" className="relative group">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      View Profile
                    </div>
                  </Link>
                  
                  {/* User Info */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to="/profile"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={pageRef}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12 mt-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduAdvisor
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Your comprehensive guide to educational and career success
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors duration-300 hover:scale-105 transform">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors duration-300 hover:scale-105 transform">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors duration-300 hover:scale-105 transform">
                Contact Us
              </a>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-500 text-sm">
                © 2024 EduAdvisor. All rights reserved. Made with ❤️ for students.(BY: TEAM CODE TYRANS)
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot - Only load on main pages, not on auth pages */}
      {!isAuthPage && (
        <Chatbot />
      )}
    </div>
  );
};

// Chatbot component
const Chatbot: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Double check that we're not on auth pages
    const isAuthPage = location.pathname === '/login' || 
                       location.pathname === '/register' || 
                       location.pathname.startsWith('/login') || 
                       location.pathname.startsWith('/register');
    
    if (isAuthPage) {
      return;
    }

    // Load Botpress scripts only on main pages
    const loadBotpress = () => {
      // Check if scripts are already loaded
      if (window.botpressWebchat) {
        return;
      }

      // Load the inject script
      const injectScript = document.createElement('script');
      injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
      injectScript.defer = true;
      document.head.appendChild(injectScript);

      // Load the bot configuration script
      const botScript = document.createElement('script');
      botScript.src = 'https://files.bpcontent.cloud/2025/03/29/10/20250329102306-6BV2I5JN.js';
      botScript.defer = true;
      document.head.appendChild(botScript);
    };

    // Load chatbot after a short delay to ensure page is ready
    const timer = setTimeout(loadBotpress, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything visible
};

export default Layout;
