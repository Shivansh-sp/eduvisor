import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { useScrollReveal, useStaggeredAnimation, useMagneticEffect } from '../hooks/useAnimations';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [savedCareers, setSavedCareers] = useState<any[]>([]);
  const [savedColleges, setSavedColleges] = useState<any[]>([]);

  // Animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  
  // Animation hooks
  const { addElement: addScrollElement } = useScrollReveal();
  const { containerRef: statsContainerRef, animateChildren: animateStats } = useStaggeredAnimation<HTMLDivElement>(100);
  const { containerRef: actionsContainerRef, animateChildren: animateActions } = useStaggeredAnimation<HTMLDivElement>(150);
  const magneticButton1 = useMagneticEffect<HTMLAnchorElement>(0.1);
  const magneticButton2 = useMagneticEffect<HTMLAnchorElement>(0.1);
  const magneticButton3 = useMagneticEffect<HTMLAnchorElement>(0.1);
  const magneticButton4 = useMagneticEffect<HTMLAnchorElement>(0.1);

  // Load assessment results and saved items
  useEffect(() => {
    const results = localStorage.getItem('assessmentResults');
    if (results) {
      setAssessmentResults(JSON.parse(results));
    }

    const careers = localStorage.getItem('savedCareers');
    if (careers) {
      setSavedCareers(JSON.parse(careers));
    }

    const colleges = localStorage.getItem('savedColleges');
    if (colleges) {
      setSavedColleges(JSON.parse(colleges));
    }
  }, []);

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
        targets: headerRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
      }, '-=400')
      .add({
        targets: statsRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600
      }, '-=200');

    // Animate stats cards
    setTimeout(() => {
      animateStats();
    }, 1000);

    // Animate quick actions
    setTimeout(() => {
      animateActions();
    }, 1200);

    // Add scroll reveal to recommendations
    setTimeout(() => {
      if (recommendationsRef.current) {
        addScrollElement(recommendationsRef.current);
      }
    }, 1500);

  }, [animateStats, animateActions, addScrollElement]);
  const stats = [
    { label: 'Assessment Score', value: '85%', color: 'text-green-600' },
    { label: 'Recommended Careers', value: '12', color: 'text-blue-600' },
    { label: 'Colleges Found', value: '8', color: 'text-purple-600' },
    { label: 'Deadlines', value: '3', color: 'text-orange-600' }
  ];

  // Dynamic stats based on actual data
  const dynamicStats = [
    { 
      label: 'Assessment Status', 
      value: assessmentResults ? 'Completed' : 'Not Taken', 
      color: assessmentResults ? 'text-green-600' : 'text-gray-500' 
    },
    { 
      label: 'Saved Careers', 
      value: savedCareers.length.toString(), 
      color: 'text-blue-600' 
    },
    { 
      label: 'Saved Colleges', 
      value: savedColleges.length.toString(), 
      color: 'text-purple-600' 
    },
    { 
      label: 'Profile Complete', 
      value: user ? 'Yes' : 'No', 
      color: user ? 'text-green-600' : 'text-orange-600' 
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome back! Here's your progress overview and personalized recommendations.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="mb-12">
          <div ref={statsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dynamicStats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-white/20 transition-all duration-500 transform hover:-translate-y-2"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <div className="text-white text-xl font-bold">
                        {index === 0 ? '📊' : index === 1 ? '🎯' : index === 2 ? '🏛️' : '⏰'}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-600 mb-1">{stat.label}</p>
                      <p className={`text-3xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div ref={quickActionsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Actions
            </h2>
            <div ref={actionsContainerRef} className="space-y-4">
              <Link
                ref={magneticButton1}
                to="/assessment"
                className="group block w-full text-left px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-blue-200/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <p className="font-semibold">Take Assessment</p>
                    <p className="text-sm text-blue-600">Discover your strengths</p>
                  </div>
                </div>
              </Link>
              <Link
                ref={magneticButton2}
                to="/colleges"
                className="group block w-full text-left px-6 py-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-green-200/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-lg">🏛️</span>
                  </div>
                  <div>
                    <p className="font-semibold">Browse Colleges</p>
                    <p className="text-sm text-green-600">Find your perfect match</p>
                  </div>
                </div>
              </Link>
              <Link
                ref={magneticButton3}
                to="/careers"
                className="group block w-full text-left px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-purple-200/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="font-semibold">Explore Careers</p>
                    <p className="text-sm text-purple-600">Plan your future</p>
                  </div>
                </div>
              </Link>
              <Link
                ref={magneticButton4}
                to="/timeline"
                className="group block w-full text-left px-6 py-4 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-orange-200/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-lg">📅</span>
                  </div>
                  <div>
                    <p className="font-semibold">View Timeline</p>
                    <p className="text-sm text-orange-600">Track your progress</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assessment Results & Saved Items
            </h2>
            <div className="space-y-4">
              {/* Assessment Results */}
              {assessmentResults ? (
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Assessment Completed</p>
                      <p className="text-sm text-gray-600">Profile: {assessmentResults.profile.name}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p><strong>Top Holland Codes:</strong> {assessmentResults.primaryCode} + {assessmentResults.secondaryCode}</p>
                    <p><strong>Recommended:</strong> {assessmentResults.profile.careers.slice(0, 2).join(', ')}</p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to="/assessment-results"
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Detailed Results
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">No Assessment Taken</p>
                      <p className="text-sm text-gray-600">Take the assessment to get personalized recommendations</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Careers */}
              {savedCareers.length > 0 ? (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">🎯</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Saved Careers ({savedCareers.length})</p>
                      </div>
                    </div>
                    <Link
                      to="/careers"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-1">
                    {savedCareers.slice(0, 3).map((career, index) => (
                      <Link
                        key={index}
                        to="/careers"
                        className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        • {career.title}
                      </Link>
                    ))}
                    {savedCareers.length > 3 && (
                      <p className="text-sm text-gray-500">+{savedCareers.length - 3} more</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">No Saved Careers</p>
                      <p className="text-sm text-gray-600">Explore careers and save your favorites</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Colleges */}
              {savedColleges.length > 0 ? (
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">🏛️</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Saved Colleges ({savedColleges.length})</p>
                      </div>
                    </div>
                    <Link
                      to="/colleges"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-1">
                    {savedColleges.slice(0, 3).map((college, index) => (
                      <Link
                        key={index}
                        to="/colleges"
                        className="block text-sm text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        • {college.name}
                      </Link>
                    ))}
                    {savedColleges.length > 3 && (
                      <p className="text-sm text-gray-500">+{savedColleges.length - 3} more</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🏛️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">No Saved Colleges</p>
                      <p className="text-sm text-gray-600">Browse colleges and save your favorites</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div 
          ref={recommendationsRef}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top Career Match</h3>
              <p className="text-blue-700 text-lg font-semibold mb-3">Software Engineer</p>
              <p className="text-sm text-gray-600 mb-4">Based on your assessment results and interests</p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">92% Match</p>
            </div>
            
            <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recommended College</h3>
              <p className="text-green-700 text-lg font-semibold mb-3">IIT Delhi</p>
              <p className="text-sm text-gray-600 mb-4">High match with your academic preferences</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <p className="text-xs text-green-600 mt-2">88% Match</p>
            </div>
            
            <div className="group relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Upcoming Deadline</h3>
              <p className="text-orange-700 text-lg font-semibold mb-3">JEE Main Registration</p>
              <p className="text-sm text-gray-600 mb-4">Application deadline approaching</p>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-orange-600">15</div>
                <div className="text-sm text-orange-600">Days Left</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
