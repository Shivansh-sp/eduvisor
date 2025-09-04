import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HollandScores {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

const Assessment: React.FC = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hollandScores, setHollandScores] = useState<HollandScores>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Part 1: Interest Areas (Holland Codes / RIASEC)
  const interestQuestions = [
    {
      id: 1,
      question: "I enjoy solving math or science problems.",
      codes: { Like: 'I', Neutral: 'I', Dislike: 'C' }
    },
    {
      id: 2,
      question: "I like helping people with their personal or emotional problems.",
      codes: { Like: 'S', Neutral: 'S', Dislike: 'R' }
    },
    {
      id: 3,
      question: "I am interested in designing posters, logos, or creative art.",
      codes: { Like: 'A', Neutral: 'A', Dislike: 'C' }
    },
    {
      id: 4,
      question: "I enjoy organizing events or leading a group project.",
      codes: { Like: 'E', Neutral: 'E', Dislike: 'I' }
    },
    {
      id: 5,
      question: "I like working with machines, tools, or technology.",
      codes: { Like: 'R', Neutral: 'R', Dislike: 'A' }
    },
    {
      id: 6,
      question: "I prefer reading books, analyzing data, or doing research.",
      codes: { Like: 'I', Neutral: 'I', Dislike: 'E' }
    },
    {
      id: 7,
      question: "I enjoy selling products, persuading people, or public speaking.",
      codes: { Like: 'E', Neutral: 'E', Dislike: 'I' }
    },
    {
      id: 8,
      question: "I like outdoor work, nature, or hands-on activities.",
      codes: { Like: 'R', Neutral: 'R', Dislike: 'A' }
    },
    {
      id: 9,
      question: "I enjoy writing essays, stories, or creating digital content.",
      codes: { Like: 'A', Neutral: 'A', Dislike: 'R' }
    },
    {
      id: 10,
      question: "I am curious about laws, social issues, or community development.",
      codes: { Like: 'S', Neutral: 'S', Dislike: 'R' }
    }
  ];

  // Part 2: Aptitude Indicators
  const aptitudeQuestions = [
    {
      id: 1,
      question: "Numerical Ability (Math, Logic)",
      codes: { Strong: 'I', Medium: 'I', Weak: 'A' }
    },
    {
      id: 2,
      question: "Verbal Ability (Languages, Communication)",
      codes: { Strong: 'A', Medium: 'S', Weak: 'R' }
    },
    {
      id: 3,
      question: "Spatial Ability (Design, Visualization, Imagination)",
      codes: { Strong: 'A', Medium: 'A', Weak: 'C' }
    },
    {
      id: 4,
      question: "Mechanical/Technical Aptitude",
      codes: { Strong: 'R', Medium: 'R', Weak: 'A' }
    },
    {
      id: 5,
      question: "Memory & Attention to Detail",
      codes: { Strong: 'C', Medium: 'C', Weak: 'A' }
    },
    {
      id: 6,
      question: "Social/Emotional Skills",
      codes: { Strong: 'S', Medium: 'S', Weak: 'I' }
    },
    {
      id: 7,
      question: "Leadership/Decision-making Skills",
      codes: { Strong: 'E', Medium: 'E', Weak: 'I' }
    }
  ];

  // Part 3: Values & Preferences
  const valuesQuestions = [
    {
      id: 1,
      question: "Do you want a stable job or a high-risk, high-reward career?",
      options: ["Stable job", "High-risk, high-reward", "Somewhere in between"]
    },
    {
      id: 2,
      question: "Do you prefer working indoors or outdoors?",
      options: ["Indoors", "Outdoors", "Mixed environments"]
    },
    {
      id: 3,
      question: "Do you enjoy teamwork or independent tasks?",
      options: ["Teamwork", "Independent tasks", "Both equally"]
    },
    {
      id: 4,
      question: "Would you prefer government service, private sector, or entrepreneurship?",
      options: ["Government service", "Private sector", "Entrepreneurship"]
    }
  ];

  const handleAnswer = (answer: string) => {
    const questionKey = `${currentPart}-${currentQuestion}`;
    setAnswers({
      ...answers,
      [questionKey]: answer
    });

    // Update Holland scores based on answer
    let currentQuestions: any[] = [];
    if (currentPart === 1) currentQuestions = interestQuestions;
    else if (currentPart === 2) currentQuestions = aptitudeQuestions;

    if (currentQuestions[currentQuestion]) {
      const question = currentQuestions[currentQuestion];
      const code = question.codes[answer as keyof typeof question.codes];
      if (code) {
        setHollandScores(prev => ({
          ...prev,
          [code]: prev[code as keyof HollandScores] + 1
        }));
      }
    }
  };

  const handleNext = () => {
    const currentQuestions = currentPart === 1 ? interestQuestions : 
                           currentPart === 2 ? aptitudeQuestions : valuesQuestions;
    
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentPart < 3) {
      setCurrentPart(currentPart + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Find top 2 Holland codes
    const sortedCodes = Object.entries(hollandScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([code]) => code);

    const primaryCode = sortedCodes[0];
    const secondaryCode = sortedCodes[1];

    // Career recommendations based on Holland codes
    const careerProfiles = {
      'RI': { // Realistic + Investigative
        name: 'Science & Tech Oriented',
        careers: ['Engineering (Mechanical, Civil, Computer, Electrical)', 'Medicine', 'Data Science', 'Biotechnology', 'Architecture'],
        degrees: ['B.Tech', 'MBBS', 'B.Sc. (Math/Physics/Chem/Bio)', 'BCA', 'B.Arch'],
        scope: ['Government: UPSC (IES, IAS), PSU jobs, ISRO/DRDO', 'Private: IT companies, research labs, automotive firms', 'Higher Studies: M.Tech, MS abroad, PhD']
      },
      'AI': { // Artistic + Investigative
        name: 'Creative & Imaginative',
        careers: ['Graphic Designer', 'Filmmaker', 'Fashion Designer', 'Writer', 'Architect', 'UI/UX Designer', 'Media Professional'],
        degrees: ['B.A. (Fine Arts, Design, Literature)', 'B.Des', 'Mass Communication', 'Animation'],
        scope: ['Creative agencies, advertising, design firms, gaming industry', 'Freelancing, entrepreneurship in digital media']
      },
      'SE': { // Social + Enterprising
        name: 'People-Centered',
        careers: ['Teacher', 'Psychologist', 'Social Worker', 'HR', 'Manager', 'Counselor', 'NGO Professional'],
        degrees: ['B.A. Psychology', 'B.Ed', 'BBA', 'MSW', 'Sociology'],
        scope: ['Education sector, hospitals, NGOs, HR roles', 'Government exams for teaching & social services']
      },
      'EC': { // Enterprising + Conventional
        name: 'Business & Management Oriented',
        careers: ['Business Analyst', 'Manager', 'Entrepreneur', 'Lawyer', 'Chartered Accountant', 'Banker'],
        degrees: ['B.Com', 'BBA', 'Law (LLB)', 'Economics', 'MBA'],
        scope: ['Banking, finance, corporate jobs, startups', 'Competitive exams (UPSC, SSC, Banking)']
      },
      'RC': { // Realistic + Conventional
        name: 'Hands-On Practical',
        careers: ['Technician', 'Pilot', 'Armed Forces', 'Agriculture Scientist', 'Sports Professional'],
        degrees: ['Polytechnic', 'B.Sc. Agriculture', 'Physical Education', 'Defense Academies'],
        scope: ['Government defense jobs, aviation, sports coaching', 'Stable career in industrial & technical fields']
      },
      'IS': { // Investigative + Social
        name: 'Research & Service',
        careers: ['Researcher', 'Scientist', 'Doctor', 'Psychologist', 'Social Scientist', 'Policy Analyst'],
        degrees: ['B.Sc./M.Sc. in Sciences', 'MBBS', 'PhD programs', 'Social Sciences'],
        scope: ['Research institutions, universities, government research', 'Healthcare, social services']
      }
    };

    const profileKey = `${primaryCode}${secondaryCode}`;
    const profile = careerProfiles[profileKey as keyof typeof careerProfiles] || careerProfiles['RI'];

    const assessmentResults = {
      hollandScores,
      primaryCode,
      secondaryCode,
      profile,
      completedAt: new Date().toISOString()
    };

    setResults(assessmentResults);
    setIsCompleted(true);

    // Save results to localStorage
    localStorage.setItem('assessmentResults', JSON.stringify(assessmentResults));
  };

  const getCurrentQuestion = () => {
    if (currentPart === 1) return interestQuestions[currentQuestion];
    if (currentPart === 2) return aptitudeQuestions[currentQuestion];
    return valuesQuestions[currentQuestion];
  };

  const getTotalQuestions = () => {
    return interestQuestions.length + aptitudeQuestions.length + valuesQuestions.length;
  };

  const getCurrentQuestionNumber = () => {
    if (currentPart === 1) return currentQuestion + 1;
    if (currentPart === 2) return interestQuestions.length + currentQuestion + 1;
    return interestQuestions.length + aptitudeQuestions.length + currentQuestion + 1;
  };

  const getProgress = () => {
    return (getCurrentQuestionNumber() / getTotalQuestions()) * 100;
  };

  const getPartTitle = () => {
    if (currentPart === 1) return 'Interest Areas (Holland Codes)';
    if (currentPart === 2) return 'Aptitude Assessment';
    return 'Values & Preferences';
  };

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h1>
              <p className="text-gray-600">Your career profile has been generated based on Holland Codes (RIASEC)</p>
            </div>

            {/* Holland Scores */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Holland Code Profile</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(results.hollandScores).map(([code, score]) => (
                  <div key={code} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{score as number}</div>
                    <div className="text-sm text-gray-600">
                      {code === 'R' ? 'Realistic' : 
                       code === 'I' ? 'Investigative' :
                       code === 'A' ? 'Artistic' :
                       code === 'S' ? 'Social' :
                       code === 'E' ? 'Enterprising' : 'Conventional'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Profile */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Career Profile: {results.profile.name}</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Recommended Careers</h3>
                  <ul className="space-y-2">
                    {results.profile.careers.map((career: string, index: number) => (
                      <li key={index} className="text-blue-700 text-sm">• {career}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Degree Options</h3>
                  <ul className="space-y-2">
                    {results.profile.degrees.map((degree: string, index: number) => (
                      <li key={index} className="text-green-700 text-sm">• {degree}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Future Scope</h3>
                  <ul className="space-y-2">
                    {results.profile.scope.map((scope: string, index: number) => (
                      <li key={index} className="text-purple-700 text-sm">• {scope}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentPart(1);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setHollandScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
                  setIsCompleted(false);
                  setResults(null);
                }}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = getCurrentQuestion();
  const isLastQuestion = currentPart === 3 && currentQuestion === valuesQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Part {currentPart}: {getPartTitle()}</span>
            <span>Question {getCurrentQuestionNumber()} of {getTotalQuestions()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {currentPart === 3 ? (
              // Values questions with options
              (question as any).options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    answers[`${currentPart}-${currentQuestion}`] === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              // Interest and Aptitude questions with Like/Neutral/Dislike or Strong/Medium/Weak
              (currentPart === 1 ? ['Like', 'Neutral', 'Dislike'] : ['Strong', 'Medium', 'Weak']).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    answers[`${currentPart}-${currentQuestion}`] === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
              } else if (currentPart > 1) {
                setCurrentPart(currentPart - 1);
                setCurrentQuestion(currentPart === 2 ? aptitudeQuestions.length - 1 : interestQuestions.length - 1);
              }
            }}
            disabled={currentPart === 1 && currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[`${currentPart}-${currentQuestion}`]}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;