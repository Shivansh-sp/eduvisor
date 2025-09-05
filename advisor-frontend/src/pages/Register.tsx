import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { useFloatingAnimation, useMagneticEffect } from '../hooks/useAnimations';
import { authService, RegisterData } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const RegisterEnhanced: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phoneNumber: '',
    classCompleted: '12th' as '10th' | '12th',
    stream: 'Science' as 'Science' | 'Commerce' | 'Arts' | 'Vocational',
    location: {
      state: '',
      city: '',
      pincode: ''
    }
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
          translateY: [-10, 10],
          duration: 3000,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value
        }
      });
    } else {
    setFormData({
      ...formData,
        [name]: value,
    });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || 
        !formData.dateOfBirth || !formData.phoneNumber || !formData.location.state || 
        !formData.location.city || !formData.location.pincode) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Prepare registration data
      const registrationData: RegisterData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        classCompleted: formData.classCompleted,
        stream: formData.stream,
        location: formData.location
      };

      // Call real registration service
      const response = await authService.register(registrationData);

      // Update auth context
      login(response.user);

      // Registration successful - navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      // Handle registration errors
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-blue-700/90 to-indigo-800/90"></div>
        
        {/* Floating geometric shapes */}
        <div 
          ref={floatingElement1}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        ></div>
        <div 
          ref={floatingElement2}
          className="absolute top-40 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"
        ></div>
        <div 
          ref={floatingElement3}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-300/20 rounded-full blur-xl"
        ></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="text-center mb-8">
          <h2 ref={titleRef} className="text-4xl font-bold text-white mb-2">
            Create your account
          </h2>
          <p className="text-blue-100 text-lg">
            Join students on their career journey
          </p>
      </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                  First Name *
                </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your first name"
                  />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                  Last Name *
                </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your last name"
                  />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address *
              </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your email address"
                />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password *
              </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Create a password"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password *
              </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white mb-2">
                  Date of Birth *
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-2">
                  Phone Number *
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="classCompleted" className="block text-sm font-medium text-white mb-2">
                  Class Completed *
                </label>
                <select
                  id="classCompleted"
                  name="classCompleted"
                  value={formData.classCompleted}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="10th">10th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
              </div>

              <div>
                <label htmlFor="stream" className="block text-sm font-medium text-white mb-2">
                  Stream
                </label>
                <select
                  id="stream"
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Vocational">Vocational</option>
                </select>
              </div>
            </div>

            {/* Location Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="location.state" className="block text-sm font-medium text-white mb-2">
                  State *
                </label>
                <input
                  id="location.state"
                  name="location.state"
                  type="text"
                  required
                  value={formData.location.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your state"
                />
              </div>

              <div>
                <label htmlFor="location.city" className="block text-sm font-medium text-white mb-2">
                  City *
                </label>
                <input
                  id="location.city"
                  name="location.city"
                  type="text"
                  required
                  value={formData.location.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label htmlFor="location.pincode" className="block text-sm font-medium text-white mb-2">
                  Pincode *
                </label>
                <input
                  id="location.pincode"
                  name="location.pincode"
                  type="text"
                  required
                  value={formData.location.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter pincode"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                ref={magneticButton}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-blue-100">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Sign in to your existing account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEnhanced;