import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [savedCareers, setSavedCareers] = useState<number[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const careers = [
    {
      id: 1,
      title: "Software Engineer",
      category: "Technology",
      description: "Design, develop, and maintain software applications and systems.",
      salary: "₹6-15 LPA",
      education: "B.Tech Computer Science",
      skills: ["Programming", "Problem Solving", "Teamwork"],
      growth: "High",
      demand: "Very High"
    },
    {
      id: 2,
      title: "Data Scientist",
      category: "Technology",
      description: "Analyze complex data to help organizations make informed decisions.",
      salary: "₹8-20 LPA",
      education: "B.Tech/M.Sc in Data Science",
      skills: ["Statistics", "Machine Learning", "Python"],
      growth: "Very High",
      demand: "High"
    },
    {
      id: 3,
      title: "Civil Engineer",
      category: "Engineering",
      description: "Design and oversee construction of infrastructure projects.",
      salary: "₹4-12 LPA",
      education: "B.Tech Civil Engineering",
      skills: ["Design", "Project Management", "Technical Drawing"],
      growth: "Medium",
      demand: "High"
    },
    {
      id: 4,
      title: "Doctor",
      category: "Healthcare",
      description: "Diagnose and treat patients, provide medical care and advice.",
      salary: "₹8-25 LPA",
      education: "MBBS + Specialization",
      skills: ["Medical Knowledge", "Communication", "Empathy"],
      growth: "High",
      demand: "Very High"
    },
    {
      id: 5,
      title: "Teacher",
      category: "Education",
      description: "Educate students and help them develop knowledge and skills.",
      salary: "₹3-8 LPA",
      education: "B.Ed + Subject Specialization",
      skills: ["Communication", "Patience", "Subject Knowledge"],
      growth: "Medium",
      demand: "High"
    },
    {
      id: 6,
      title: "Marketing Manager",
      category: "Business",
      description: "Develop and implement marketing strategies to promote products or services.",
      salary: "₹5-15 LPA",
      education: "MBA Marketing",
      skills: ["Creativity", "Analytics", "Communication"],
      growth: "High",
      demand: "Medium"
    }
  ];

  const categories = ["All", "Technology", "Engineering", "Healthcare", "Education", "Business"];

  // Load saved careers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedCareers');
    if (saved) {
      setSavedCareers(JSON.parse(saved));
    }
  }, []);

  // Save career to localStorage
  const handleSaveCareer = (careerId: number) => {
    console.log('Saving career:', careerId, 'Current saved careers:', savedCareers);
    
    const isCurrentlySaved = savedCareers.includes(careerId);
    const newSavedCareers = isCurrentlySaved
      ? savedCareers.filter(id => id !== careerId)
      : [...savedCareers, careerId];
    
    console.log('New saved careers:', newSavedCareers);
    
    setSavedCareers(newSavedCareers);
    localStorage.setItem('savedCareers', JSON.stringify(newSavedCareers));
    
    // Show success message
    const career = careers.find(c => c.id === careerId);
    if (career) {
      const message = isCurrentlySaved 
        ? `${career.title} removed from saved careers`
        : `${career.title} saved successfully!`;
      
      // Create a temporary success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      successDiv.textContent = message;
      document.body.appendChild(successDiv);
      
      // Remove after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successDiv);
      }, 3000);
    }
  };

  // Show detailed career information
  const handleLearnMore = (career: any) => {
    setSelectedCareer(career);
    setShowModal(true);
  };

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Explorer</h1>
          <p className="text-gray-600">Discover career paths that match your interests and skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Careers
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Careers Grid */}
        <div id="careers-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map(career => (
            <div key={career.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{career.title}</h3>
                    <p className="text-blue-600 text-sm font-medium">{career.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{career.salary}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{career.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Required Education:</h4>
                  <p className="text-sm text-gray-600">{career.education}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {career.skills.map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs text-gray-500">Growth:</span>
                    <span className={`ml-1 text-xs px-2 py-1 rounded-full ${getGrowthColor(career.growth)}`}>
                      {career.growth}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Demand:</span>
                    <span className={`ml-1 text-xs px-2 py-1 rounded-full ${getDemandColor(career.demand)}`}>
                      {career.demand}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleLearnMore(career)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </button>
                  <button 
                    onClick={() => handleSaveCareer(career.id)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      savedCareers.includes(career.id)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {savedCareers.includes(career.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No careers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Career Guidance Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Career Guidance?</h2>
          <p className="text-gray-600 mb-6">
            Take our comprehensive assessment to discover careers that match your interests, skills, and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/assessment"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Take Assessment
            </Link>
            <button 
              onClick={() => {
                setSelectedCategory('');
                // Scroll to careers section
                const careersSection = document.getElementById('careers-section');
                if (careersSection) {
                  careersSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View All Categories
            </button>
          </div>
        </div>
      </div>

      {/* Career Details Modal */}
      {showModal && selectedCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCareer.title}</h2>
                  <p className="text-blue-600 font-medium">{selectedCareer.category}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-600">{selectedCareer.description}</p>
                </div>

                {/* Salary & Growth */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-1">Salary Range</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedCareer.salary}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1">Growth Potential</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedCareer.growth}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-1">Job Demand</h4>
                    <p className="text-2xl font-bold text-orange-600">{selectedCareer.demand}</p>
                  </div>
                </div>

                {/* Education Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Education Requirements</h3>
                  <p className="text-gray-600">{selectedCareer.education}</p>
                </div>

                {/* Key Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.skills.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Path */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Path</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Entry Level (0-2 years)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Mid Level (3-5 years)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">Senior Level (6+ years)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    onClick={() => handleSaveCareer(selectedCareer.id)}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      savedCareers.includes(selectedCareer.id)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {savedCareers.includes(selectedCareer.id) ? 'Saved' : 'Save Career'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;