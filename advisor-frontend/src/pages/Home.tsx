import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { 
  useParallax, 
  useFloatingAnimation, 
  useMagneticEffect, 
  useTextReveal,
  useScrollReveal,
  useStaggeredAnimation
} from '../hooks/useAnimations';
import { createParticleSystem } from '../utils/animations';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Animation hooks
  const floatingElement1 = useFloatingAnimation();
  const floatingElement2 = useFloatingAnimation();
  const floatingElement3 = useFloatingAnimation();
  const magneticButton1 = useMagneticEffect<HTMLAnchorElement>(0.2);
  const magneticButton2 = useMagneticEffect<HTMLAnchorElement>(0.2);
  const { elementRef: titleElementRef, triggerReveal: triggerTitleReveal } = useTextReveal<HTMLHeadingElement>();
  const { elementRef: subtitleElementRef, triggerReveal: triggerSubtitleReveal } = useTextReveal<HTMLParagraphElement>();
  const { containerRef: featuresContainerRef, animateChildren: animateFeatures } = useStaggeredAnimation<HTMLDivElement>(150);
  const { addElement: addScrollElement } = useScrollReveal();

  useEffect(() => {
    // Hero section entrance animation
    const heroAnimation = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    heroAnimation
      .add({
        targets: heroRef.current,
        opacity: [0, 1],
        duration: 800
      })
      .add({
        targets: titleElementRef.current,
        opacity: [0, 1],
        translateY: [100, 0],
        duration: 1200,
        easing: 'easeOutElastic(1, .6)'
      }, '-=600')
      .add({
        targets: subtitleElementRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800
      }, '-=400')
      .add({
        targets: buttonsRef.current?.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100)
      }, '-=200');

    // Trigger text reveal animations
    setTimeout(() => {
      triggerTitleReveal();
      triggerSubtitleReveal();
    }, 500);

    // Create particle system
    if (particlesRef.current) {
      createParticleSystem(particlesRef.current, 30);
    }

    // Animate floating elements
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

    // Animate features section
    setTimeout(() => {
      animateFeatures();
    }, 2000);

  }, [triggerTitleReveal, triggerSubtitleReveal, animateFeatures]);

  const features = [
    {
      title: "Aptitude Assessment",
      description: "Discover your strengths and interests through our comprehensive assessment tools.",
      icon: "🧠",
      link: "/assessment"
    },
    {
      title: "Career Mapping",
      description: "Explore career paths that align with your skills and aspirations.",
      icon: "🎯",
      link: "/careers"
    },
    {
      title: "College Directory",
      description: "Find the perfect government colleges and universities for your goals.",
      icon: "🏛️",
      link: "/colleges"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-600 text-white overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-700/90 to-indigo-600/90"></div>
          <div ref={particlesRef} className="absolute inset-0"></div>
          
          {/* Floating geometric shapes */}
          <div 
            ref={floatingElement1}
            className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center">
            <h1 
              ref={titleElementRef}
              className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            >
              {user ? `Welcome back, ${user.firstName}!` : 'EduAdvisor'}
            </h1>
            <p 
              ref={subtitleElementRef}
              className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto text-gray-100 leading-relaxed"
            >
              {user 
                ? "Continue your journey towards educational and career success" 
                : "Your comprehensive guide to educational and career success"
              }
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
              {user ? (
                <>
                  <Link
                    ref={magneticButton1}
                    to="/dashboard"
                    className="group relative bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
                    style={{ 
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)'
                    }}
                  >
                    <span className="relative z-10">Go to Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    ref={magneticButton2}
                    to="/assessment"
                    className="group relative border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                    style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  >
                    <span className="relative z-10">Take Assessment</span>
                    <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    ref={magneticButton1}
                    to="/register"
                    className="group relative bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
                    style={{ 
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)'
                    }}
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    ref={magneticButton2}
                    to="/login"
                    className="group relative border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                    style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  >
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose EduAdvisor?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We provide comprehensive tools and guidance to help you make informed decisions about your education and career.
            </p>
          </div>
          
          <div ref={featuresContainerRef} className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer block"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Click indicator */}
                  <div className="mt-6 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to explore →
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show when not logged in */}
      {!user && (
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/90 via-purple-700/90 to-indigo-800/90"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who have found their path with EduAdvisor.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="group relative bg-white text-blue-600 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
              style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/login"
              className="group relative border-2 border-white/30 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              style={{ 
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default Home;
