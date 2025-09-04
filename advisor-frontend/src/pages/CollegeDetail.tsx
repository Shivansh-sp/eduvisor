import React from 'react';
import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion'; // Removed framer-motion

const CollegeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            College Details
          </h1>
          <p className="text-xl text-gray-600">
            Detailed information about college ID: {id}
          </p>
        </div>

        <div className="card text-center py-16">
          <div className="text-6xl mb-6">🏛️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            College Details Coming Soon
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working on building detailed college pages with comprehensive information 
            about programs, faculty, facilities, admission process, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;


