import React, { useState, useEffect } from 'react';
import { 
  allColleges, 
  getStates, 
  getCollegeTypes, 
  getCollegeCategories, 
  searchColleges,
  getCollegesByState,
  getCollegesByType,
  getCollegesByCategory,
  getTopRatedColleges,
  getCollegesByNIRFRank,
  College 
} from '../services/collegeData';

const Colleges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [savedColleges, setSavedColleges] = useState<number[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
  const handleViewDetails = (college: College) => {
    setSelectedCollege(college);
    setShowModal(true);
  };

  // Filter and sort colleges
  const getFilteredColleges = () => {
    let filtered = allColleges;

    // Apply search filter
    if (searchTerm) {
      filtered = searchColleges(searchTerm);
    }

    // Apply state filter
    if (selectedState && selectedState !== 'All') {
      filtered = filtered.filter(college => college.state === selectedState);
    }

    // Apply type filter
    if (selectedType && selectedType !== 'All') {
      filtered = filtered.filter(college => college.type === selectedType);
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(college => college.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'established':
        filtered = filtered.sort((a, b) => b.established - a.established);
        break;
      case 'nirf':
        filtered = filtered
          .filter(college => college.nirfRank)
          .sort((a, b) => (a.nirfRank || 0) - (b.nirfRank || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredColleges = getFilteredColleges();
  const states = getStates();
  const types = getCollegeTypes();
  const categories = getCollegeCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Colleges & Universities Directory</h1>
          <p className="text-gray-600 text-lg">Discover Central and State Government institutions across India</p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {allColleges.length} Government Institutions
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              All States Covered
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Central & State Universities
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Colleges
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, location, courses..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="name">Name (A to Z)</option>
                <option value="established">Established (Newest First)</option>
                <option value="nirf">NIRF Ranking</option>
              </select>
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State
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

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Type
                </label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
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
          )}
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
            <div key={college.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{college.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{college.location}, {college.state}</p>
                    <div className="flex items-center space-x-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {college.type}
                      </span>
                      {college.nirfRank && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          NIRF #{college.nirfRank}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm font-medium">{college.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">Est. {college.established}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Popular Courses:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 2).map((course, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {course.length > 20 ? course.substring(0, 20) + '...' : course}
                      </span>
                    ))}
                    {college.courses.length > 2 && (
                      <span className="text-xs text-gray-500">+{college.courses.length - 2} more</span>
                    )}
                  </div>
                </div>

                {college.placementStats && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Avg Package:</span>
                      <span className="font-semibold text-green-800">
                        ₹{(college.placementStats.averagePackage / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Placement:</span>
                      <span className="font-semibold text-green-800">
                        {college.placementStats.placementPercentage}%
                      </span>
                    </div>
                  </div>
                )}

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
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCollege.name}</h2>
                  <p className="text-gray-600 mb-2">{selectedCollege.location}, {selectedCollege.state}</p>
                  <div className="flex items-center space-x-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {selectedCollege.type}
                    </span>
                    <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                      {selectedCollege.category}
                    </span>
                    {selectedCollege.nirfRank && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                        NIRF Rank #{selectedCollege.nirfRank}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl ml-4"
                >
                  ×
                </button>
              </div>

              {/* College Details */}
              <div className="space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-1">Rating</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedCollege.rating}/5.0</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-green-800 mb-1">Established</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedCollege.established}</p>
                  </div>
                  {selectedCollege.totalStudents && (
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-purple-800 mb-1">Students</h4>
                      <p className="text-2xl font-bold text-purple-600">{selectedCollege.totalStudents.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedCollege.facultyCount && (
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-orange-800 mb-1">Faculty</h4>
                      <p className="text-2xl font-bold text-orange-600">{selectedCollege.facultyCount}</p>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                {(selectedCollege.website || selectedCollege.email || selectedCollege.phone) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCollege.website && (
                        <div className="flex items-center">
                          <span className="text-gray-600 w-20">Website:</span>
                          <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:text-blue-800 underline">
                            {selectedCollege.website}
                          </a>
                        </div>
                      )}
                      {selectedCollege.email && (
                        <div className="flex items-center">
                          <span className="text-gray-600 w-20">Email:</span>
                          <a href={`mailto:${selectedCollege.email}`} className="text-blue-600 hover:text-blue-800">
                            {selectedCollege.email}
                          </a>
                        </div>
                      )}
                      {selectedCollege.phone && (
                        <div className="flex items-center">
                          <span className="text-gray-600 w-20">Phone:</span>
                          <a href={`tel:${selectedCollege.phone}`} className="text-blue-600 hover:text-blue-800">
                            {selectedCollege.phone}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-600">Address: </span>
                      <span className="text-gray-800">{selectedCollege.address}, {selectedCollege.pincode}</span>
                    </div>
                  </div>
                )}

                {/* Placement Statistics */}
                {selectedCollege.placementStats && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Placement Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-green-800 mb-1">Average Package</h4>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{(selectedCollege.placementStats.averagePackage / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-blue-800 mb-1">Highest Package</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{(selectedCollege.placementStats.highestPackage / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-purple-800 mb-1">Placement Rate</h4>
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedCollege.placementStats.placementPercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admission Criteria */}
                {selectedCollege.admissionCriteria && selectedCollege.admissionCriteria.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Admission Criteria</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollege.admissionCriteria.map((criteria, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {criteria}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cutoff Scores */}
                {selectedCollege.cutoff && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cutoff Scores (Previous Year)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <h4 className="font-semibold text-gray-800 mb-1">General</h4>
                        <p className="text-lg font-bold text-gray-600">{selectedCollege.cutoff.general}%</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <h4 className="font-semibold text-orange-800 mb-1">OBC</h4>
                        <p className="text-lg font-bold text-orange-600">{selectedCollege.cutoff.obc}%</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <h4 className="font-semibold text-green-800 mb-1">SC</h4>
                        <p className="text-lg font-bold text-green-600">{selectedCollege.cutoff.sc}%</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <h4 className="font-semibold text-blue-800 mb-1">ST</h4>
                        <p className="text-lg font-bold text-blue-600">{selectedCollege.cutoff.st}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCollege.courses.map((course, index) => (
                      <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                        {course}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                {selectedCollege.specializations && selectedCollege.specializations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollege.specializations.map((spec, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fees Structure */}
                {selectedCollege.fees && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Fees Structure (Annual)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-green-800 mb-1">Tuition Fee</h4>
                        <p className="text-xl font-bold text-green-600">
                          ₹{selectedCollege.fees.tuition.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-blue-800 mb-1">Hostel Fee</h4>
                        <p className="text-xl font-bold text-blue-600">
                          ₹{selectedCollege.fees.hostel.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-purple-800 mb-1">Other Charges</h4>
                        <p className="text-xl font-bold text-purple-600">
                          ₹{selectedCollege.fees.other.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6 border-t">
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
                  {selectedCollege.website && (
                    <a
                      href={selectedCollege.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
                    >
                      Visit Website
                    </a>
                  )}
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
