import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import anime from 'animejs';
import { Link } from 'react-router-dom';
import { useFloatingAnimation, useMagneticEffect } from '../hooks/useAnimations';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    classCompleted: user?.classCompleted || '12th',
    stream: user?.stream || 'Science',
    phoneNumber: '',
    dateOfBirth: '',
    location: {
      state: '',
      city: '',
      pincode: ''
    }
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [savedCareers, setSavedCareers] = useState<any[]>([]);

  // Animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const floatingElement1 = useFloatingAnimation();
  const floatingElement2 = useFloatingAnimation();
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
        targets: photoRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutBack(1.7)'
      }, '-=200')
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
  }, []);

  // Load saved careers and profile photo
  useEffect(() => {
    // Load saved careers
    const saved = localStorage.getItem('savedCareers');
    if (saved) {
      const savedIds = JSON.parse(saved);
      // Mock career data - in a real app, you'd fetch from API
      const allCareers = [
        { id: 1, title: "Software Engineer", category: "Technology", salary: "₹6-15 LPA" },
        { id: 2, title: "Data Scientist", category: "Technology", salary: "₹8-20 LPA" },
        { id: 3, title: "Civil Engineer", category: "Engineering", salary: "₹4-12 LPA" },
        { id: 4, title: "Doctor", category: "Healthcare", salary: "₹8-25 LPA" },
        { id: 5, title: "Teacher", category: "Education", salary: "₹3-8 LPA" },
        { id: 6, title: "Marketing Manager", category: "Business", salary: "₹5-15 LPA" }
      ];
      const savedCareersData = allCareers.filter(career => savedIds.includes(career.id));
      setSavedCareers(savedCareersData);
    }

    // Load saved profile photo
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Create preview URL and save to localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoDataUrl = event.target?.result as string;
        setProfilePhoto(photoDataUrl);
        
        // Save to localStorage
        localStorage.setItem('profilePhoto', photoDataUrl);
        
        // Show success message
        setSuccess('Profile photo uploaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare update data
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        classCompleted: formData.classCompleted,
        stream: formData.stream,
        // Add other fields as needed
      };

      // Call update profile API
      const response = await authService.updateProfile(updateData);
      
      // Update auth context
      updateUser(response.user);
      
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-700/90 to-pink-600/90"></div>
        
        {/* Floating geometric shapes */}
        <div 
          ref={floatingElement1}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        ></div>
        <div 
          ref={floatingElement2}
          className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-bold text-white mb-4">
            Profile Settings
          </h1>
          <p className="text-blue-100 text-lg">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-400/50 text-green-100 px-4 py-3 rounded-lg backdrop-blur-sm">
                {success}
              </div>
            )}

            {/* Profile Photo Section */}
            <div ref={photoRef} className="text-center">
              <div className="relative inline-block">
                <div 
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl cursor-pointer hover:border-white/50 transition-all duration-300 transform hover:scale-105"
                  onClick={() => document.getElementById('profile-photo-input')?.click()}
                >
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 inline-block border-2 border-dashed border-white/30 hover:border-white/50">
                  <input
                    id="profile-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span>Click to Upload Photo</span>
                  </span>
                </label>
                <p className="text-blue-200 text-sm mt-2">JPG, PNG or GIF (max 5MB)</p>
                <p className="text-blue-300 text-xs mt-1">Click the button above to select a photo</p>
              </div>
            </div>

            {/* Personal Information */}
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/70 cursor-not-allowed backdrop-blur-sm"
                placeholder="Email address"
              />
              <p className="text-blue-200 text-sm mt-1">Email cannot be changed</p>
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Vocational">Vocational</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                ref={magneticButton}
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating Profile...
                  </div>
                ) : (
                  'Update Profile'
                )}
            </button>
          </div>
          </form>
        </div>

        {/* Saved Careers Section */}
        {savedCareers.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mt-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Saved Careers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCareers.map((career) => (
                <div key={career.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <h4 className="font-semibold text-white mb-1">{career.title}</h4>
                  <p className="text-blue-200 text-sm mb-2">{career.category}</p>
                  <p className="text-green-300 text-sm font-medium">{career.salary}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                to="/careers"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Explore More Careers
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;