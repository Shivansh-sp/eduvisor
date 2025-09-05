import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HollandScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

interface AssessmentResults {
  hollandScores: HollandScores;
  primaryCode: string;
  secondaryCode: string;
  profile: {
    name: string;
    careers: string[];
    degrees: string[];
    scope: string[];
  };
  completedAt: string;
}

const AssessmentResults: React.FC = () => {
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Assessment Results Found</h1>
          <p className="text-gray-600 mb-8">You haven't completed the assessment yet. Take the assessment to get your personalized career profile.</p>
          <div className="space-y-4">
            <Link
              to="/assessment"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take Assessment
            </Link>
            <div>
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getCodeDescription = (code: string) => {
    const descriptions = {
      'R': 'Realistic - Practical, hands-on, technical',
      'I': 'Investigative - Analytical, research-oriented, scientific',
      'A': 'Artistic - Creative, imaginative, expressive',
      'S': 'Social - Helping, teaching, service-oriented',
      'E': 'Enterprising - Leadership, management, business',
      'C': 'Conventional - Organizing, detail-focused, systematic'
    };
    return descriptions[code as keyof typeof descriptions] || '';
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-blue-600 bg-blue-100';
    if (score >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Assessment Results</h1>
            <p className="text-gray-600 text-lg">Complete career profile based on Holland Codes (RIASEC)</p>
            <p className="text-sm text-gray-500 mt-2">
              Completed on {new Date(results.completedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Holland Scores */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Holland Code Profile</h2>
            <div className="space-y-4">
              {Object.entries(results.hollandScores).map(([code, score]) => (
                <div key={code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {code === 'R' ? 'Realistic' : 
                       code === 'I' ? 'Investigative' :
                       code === 'A' ? 'Artistic' :
                       code === 'S' ? 'Social' :
                       code === 'E' ? 'Enterprising' : 'Conventional'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getCodeDescription(code)}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-bold text-lg ${getScoreColor(score as number)}`}>
                    {score as number}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Your Primary Profile</h3>
              <p className="text-blue-800">
                <strong>{results.primaryCode}</strong> + <strong>{results.secondaryCode}</strong> = <strong>{results.profile.name}</strong>
              </p>
            </div>
          </div>

          {/* Career Profile */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Profile</h2>
            
            <div className="space-y-6">
              {/* Recommended Careers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Careers</h3>
                <div className="grid grid-cols-2 gap-2">
                  {results.profile.careers.map((career, index) => (
                    <div key={index} className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
                      {career}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Degrees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Degrees</h3>
                <div className="space-y-2">
                  {results.profile.degrees.map((degree, index) => (
                    <div key={index} className="p-3 bg-green-50 text-green-800 rounded-lg text-sm">
                      {degree}
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Scope */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Future Scope & Opportunities</h3>
                <div className="space-y-2">
                  {results.profile.scope.map((scope, index) => (
                    <div key={index} className="p-3 bg-purple-50 text-purple-800 rounded-lg text-sm">
                      {scope}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/careers"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Explore Recommended Careers
            </Link>
            <Link
              to="/colleges"
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Find Matching Colleges
            </Link>
            <button
              onClick={() => navigate('/assessment')}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Retake Assessment
            </button>
            <Link
              to="/dashboard"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
