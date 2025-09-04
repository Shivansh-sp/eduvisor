import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { useFloatingAnimation, useMagneticEffect } from '../hooks/useAnimations';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const LoginEnhanced: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const floatingElement1 = useFloatingAnimation();
  const floatingElement2 = useFloatingAnimation();
  const floatingElement3 = useFloatingAnimation();
  const magneticButton = useMagneticEffect<HTMLButtonElement>(0.1);

  useEffect(() => {
    // Page entrance animation
    const timelineAnimation = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    timelineAnimation
      .add({
        targets: containerRef.current,
        opacity: [0, 1],
        duration: 800
      })
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
      }, '-=400')
      .add({
        targets: formRef.current?.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100)
      }, '-=200');

    // Floating background elements
    setTimeout(() => {
      if (floatingElement1.current) {
        anime({
          targets: floatingElement1.current,
          translateY: [-20, 20],
          duration: 4000,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true
        });
      }
    }, 1000);

    setTimeout(() => {
      if (floatingElement2.current) {
        anime({
          targets: floatingElement2.current,
          translateY: [-15, 15],
          duration: 3500,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true
        });
      }
    }, 1500);

    setTimeout(() => {
      if (floatingElement3.current) {
        anime({
          targets: floatingElement3.current,
          translateY: [-25, 25],
          duration: 4500,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true
        });
      }
    }, 2000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      // Call real authentication service
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      // Update auth context
      login(response.user);

      // Login successful - navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      // Handle authentication errors
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');

    try {
      if (provider === 'google') {
        // Real Google OAuth using Google Identity Services
        await handleGoogleLogin();
      } else {
        // GitHub OAuth (we'll implement this separately)
        await handleGitHubLogin();
      }
    } catch (err: any) {
      setError(`${provider} login failed. Please try again.`);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Load Google Identity Services script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }

    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
      callback: handleGoogleCallback,
      auto_select: false,
      cancel_on_tap_outside: true
    });

    // Show the Google One Tap prompt
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to popup
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button') as HTMLElement,
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'rectangular'
          }
        );
      }
    });
  };

  const handleGoogleCallback = (response: any) => {
    try {
      // Decode the JWT token
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      // Create user from Google response
      const googleUser = {
        id: payload.sub,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        classCompleted: '12th' as const,
        stream: 'Science' as const,
        isEmailVerified: payload.email_verified,
        isPhoneVerified: false,
        profilePicture: payload.picture
      };

      // Update auth context
      login(googleUser);

      // Navigate to dashboard
      navigate('/dashboard');
      
      setLoading(false);
    } catch (error) {
      console.error('Google callback error:', error);
      setError('Google login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      // Create a demo GitHub OAuth popup with email selection
      const demoEmails = ['john.doe@github.com', 'jane.smith@github.com', 'demo.user@github.com'];
      
      // Create popup content for GitHub
      const popupContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>GitHub Sign In</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0; padding: 20px; background: #f5f5f5;
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              min-height: 100vh;
            }
            .container { 
              background: white; padding: 40px; border-radius: 12px; 
              box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 400px; width: 100%;
            }
            .logo { 
              text-align: center; margin-bottom: 30px;
              font-size: 24px; font-weight: bold;
              color: #333;
            }
            .email-list { margin: 20px 0; }
            .email-option { 
              padding: 12px; margin: 8px 0; border: 1px solid #ddd; 
              border-radius: 8px; cursor: pointer; transition: all 0.2s;
              background: white;
            }
            .email-option:hover { 
              background: #f6f8fa; 
              border-color: #0366d6;
            }
            .email-option.selected { 
              background: #f1f8ff; 
              border-color: #0366d6;
            }
            .continue-btn { 
              width: 100%; padding: 12px; background: #0366d6; 
              color: white; border: none; border-radius: 8px; font-size: 16px; 
              cursor: pointer; margin-top: 20px; opacity: 0.5;
            }
            .continue-btn.enabled { opacity: 1; }
            .continue-btn:hover.enabled { 
              background: #0256cc; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">⚫ GitHub</div>
            <h2 style="text-align: center; margin-bottom: 20px;">Choose an account</h2>
            <div class="email-list">
              ${demoEmails.map(email => `
                <div class="email-option" onclick="selectEmail('${email}')">
                  <div style="font-weight: 500;">${email.split('@')[0]}</div>
                  <div style="font-size: 14px; color: #666;">${email}</div>
                </div>
              `).join('')}
            </div>
            <button class="continue-btn" id="continueBtn" onclick="continueLogin()" disabled>
              Continue
            </button>
          </div>
          <script>
            let selectedEmail = '';
            function selectEmail(email) {
              selectedEmail = email;
              document.querySelectorAll('.email-option').forEach(el => el.classList.remove('selected'));
              event.target.closest('.email-option').classList.add('selected');
              document.getElementById('continueBtn').classList.add('enabled');
              document.getElementById('continueBtn').disabled = false;
            }
            function continueLogin() {
              if (selectedEmail) {
                window.opener.postMessage({
                  type: 'oauth_success',
                  provider: 'github',
                  email: selectedEmail,
                  name: selectedEmail.split('@')[0].replace('.', ' ')
                }, '*');
                window.close();
              }
            }
          </script>
        </body>
        </html>
      `;

      // Open popup with demo content
      const popup = window.open('', 'oauth', 'width=450,height=600,scrollbars=yes,resizable=yes');
      if (!popup) {
        setError('Popup blocked. Please allow popups for this site.');
        setLoading(false);
        return;
      }

      popup.document.write(popupContent);
      popup.document.close();

      // Listen for OAuth success message
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'oauth_success' && event.data.provider === 'github') {
          window.removeEventListener('message', handleMessage);
          setLoading(false);
          
          // Create user from OAuth data
          const mockUser = {
            id: '1',
            email: event.data.email,
            firstName: event.data.name.split(' ')[0],
            lastName: event.data.name.split(' ')[1] || 'User',
            classCompleted: '12th' as const,
            stream: 'Science' as const,
            isEmailVerified: true,
            isPhoneVerified: false,
          };

          // Update auth context
          login(mockUser);

          // Navigate to dashboard
          navigate('/dashboard');
        }
      };

      window.addEventListener('message', handleMessage);

      // Timeout after 5 minutes
      setTimeout(() => {
        if (!popup.closed) {
          popup.close();
          window.removeEventListener('message', handleMessage);
          setLoading(false);
          setError('Login timeout. Please try again.');
        }
      }, 300000);

    } catch (error) {
      console.error('GitHub login error:', error);
      setError('GitHub login failed. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-700/90 to-indigo-800/90"></div>
        
        {/* Floating geometric shapes */}
        <div 
          ref={floatingElement1}
          className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        ></div>
        <div 
          ref={floatingElement2}
          className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,0,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
        ></div>
        <div 
          ref={floatingElement3}
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-400/20 rounded-full blur-xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,192,203,0.3) 0%, transparent 70%)',
            filter: 'blur(35px)'
          }}
        ></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <h2 
            ref={titleRef}
            className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            style={{ opacity: 0 }}
          >
            Welcome Back
          </h2>
          <p className="text-lg text-gray-200">
            Sign in to your EduAdvisor account
          </p>
          <p className="mt-2 text-sm text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-yellow-300 hover:text-yellow-200 transition-colors">
              Create one here
            </Link>
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          className="bg-white/10 backdrop-blur-lg py-10 px-8 rounded-3xl shadow-2xl border border-white/20"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
          }}
        >
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-300 text-sm text-center bg-red-500/20 px-4 py-2 rounded-lg border border-red-400/30">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your email"
                  style={{ 
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your password"
                  style={{ 
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded bg-white/20"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-300 hover:text-yellow-200">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                ref={magneticButton}
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                }}
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-300">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleSocialLogin('google')}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-white/30 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                onClick={() => handleSocialLogin('github')}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-white/30 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
            
            {/* Hidden Google Sign-in Button */}
            <div id="google-signin-button" className="hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEnhanced;
