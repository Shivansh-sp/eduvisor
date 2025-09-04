import React, { useState, useEffect } from 'react';

const Colleges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [savedColleges, setSavedColleges] = useState<number[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Load saved colleges from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedColleges');
    if (saved) {
      setSavedColleges(JSON.parse(saved));
    }
  }, []);

  // Handle saving/unsaving colleges
  const handleSaveCollege = (collegeId: number) => {
    const newSavedColleges = savedColleges.includes(collegeId)
      ? savedColleges.filter(id => id !== collegeId)
      : [...savedColleges, collegeId];
    
    setSavedColleges(newSavedColleges);
    localStorage.setItem('savedColleges', JSON.stringify(newSavedColleges));
    
    // Show temporary success message
    const message = savedColleges.includes(collegeId) ? 'College removed from saved' : 'College saved successfully!';
    alert(message);
  };

  // Handle viewing college details
  const handleViewDetails = (college: any) => {
    setSelectedCollege(college);
    setShowModal(true);
  };

  const colleges = [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi",
      state: "Delhi",
      type: "Engineering",
      rating: 4.8,
      courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering"],
      established: 1961
    },
    {
      id: 2,
      name: "University of Delhi",
      location: "New Delhi",
      state: "Delhi",
      type: "General",
      rating: 4.5,
      courses: ["Arts", "Science", "Commerce", "Engineering"],
      established: 1922
    },
    {
      id: 3,
      name: "Jadavpur University",
      location: "Kolkata",
      state: "West Bengal",
      type: "Engineering",
      rating: 4.6,
      courses: ["Computer Science", "Civil Engineering", "Chemical Engineering"],
      established: 1955
    },
    {
      id: 4,
      name: "Anna University",
      location: "Chennai",
      state: "Tamil Nadu",
      type: "Engineering",
      rating: 4.4,
      courses: ["Information Technology", "Mechanical Engineering", "Electronics"],
      established: 1978
    },
    {
      id: 5,
      name: "Banaras Hindu University",
      location: "Varanasi",
      state: "Uttar Pradesh",
      type: "General",
      rating: 4.3,
      courses: ["Arts", "Science", "Medicine", "Engineering"],
      established: 1916
    }
  ];

  const states = ["All", "Delhi", "West Bengal", "Tamil Nadu", "Uttar Pradesh"];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === '' || selectedState === 'All' || college.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Colleges Directory</h1>
          <p className="text-gray-600">Find the perfect college for your educational journey</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Colleges
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by State
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map(college => (
            <div key={college.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{college.name}</h3>
                    <p className="text-gray-600 text-sm">{college.location}, {college.state}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm font-medium">{college.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {college.type}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">Est. {college.established}</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Popular Courses:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 3).map((course, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="text-xs text-gray-500">+{college.courses.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewDetails(college)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleSaveCollege(college.id)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      savedColleges.includes(college.id)
                        ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {savedColleges.includes(college.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* College Details Modal */}
      {showModal && selectedCollege && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCollege.name}</h2>
                  <p className="text-gray-600">{selectedCollege.location}, {selectedCollege.state}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* College Details */}
              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-600">
                    {selectedCollege.name} is a prestigious {selectedCollege.type.toLowerCase()} institution 
                    established in {selectedCollege.established}. Located in {selectedCollege.location}, 
                    {selectedCollege.state}, it offers world-class education and research opportunities.
                  </p>
                </div>

                {/* Rating & Established */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1">Rating</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedCollege.rating}/5.0</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-1">Established</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedCollege.established}</p>
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCollege.courses.map((course: string, index: number) => (
                      <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                        {course}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => handleSaveCollege(selectedCollege.id)}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      savedColleges.includes(selectedCollege.id)
                        ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {savedColleges.includes(selectedCollege.id) ? 'Remove from Saved' : 'Save College'}
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

export default Colleges;
