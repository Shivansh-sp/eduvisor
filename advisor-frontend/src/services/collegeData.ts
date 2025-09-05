// Comprehensive Indian College and University Database
// Based on AISHE (All India Survey on Higher Education) data structure

export interface College {
  id: number;
  name: string;
  location: string;
  state: string;
  type: 'IIT' | 'NIT' | 'Central University' | 'State University' | 'Private University' | 'Deemed University' | 'IIM' | 'IIIT' | 'Medical College' | 'Engineering College' | 'General College';
  category: 'Engineering' | 'Medical' | 'Management' | 'General' | 'Research' | 'Technical' | 'Arts' | 'Science' | 'Commerce';
  rating: number;
  established: number;
  courses: string[];
  specializations: string[];
  admissionCriteria: string[];
  website?: string;
  email?: string;
  phone?: string;
  address: string;
  pincode: string;
  nirfRank?: number;
  aicteApproved: boolean;
  ugcApproved: boolean;
  naacAccreditation?: string;
  totalStudents?: number;
  facultyCount?: number;
  campusSize?: string;
  hostelsAvailable: boolean;
  placementStats?: {
    averagePackage: number;
    highestPackage: number;
    placementPercentage: number;
  };
  fees?: {
    tuition: number;
    hostel: number;
    other: number;
  };
  cutoff?: {
    general: number;
    obc: number;
    sc: number;
    st: number;
  };
}

export const collegesData: College[] = [
  // IITs (Indian Institutes of Technology)
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "IIT",
    category: "Engineering",
    rating: 4.8,
    established: 1961,
    courses: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering", "Biotechnology", "Mathematics and Computing"],
    specializations: ["AI/ML", "Data Science", "Robotics", "Cybersecurity", "IoT", "Blockchain"],
    admissionCriteria: ["JEE Advanced", "GATE", "Direct Admission"],
    website: "https://www.iitd.ac.in",
    email: "info@iitd.ac.in",
    phone: "+91-11-2659-7135",
    address: "Hauz Khas, New Delhi",
    pincode: "110016",
    nirfRank: 2,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 8000,
    facultyCount: 500,
    campusSize: "320 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 1500000,
      highestPackage: 5000000,
      placementPercentage: 95
    },
    fees: {
      tuition: 200000,
      hostel: 50000,
      other: 30000
    },
    cutoff: {
      general: 98.5,
      obc: 95.2,
      sc: 85.1,
      st: 82.3
    }
  },
  {
    id: 2,
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    type: "IIT",
    category: "Engineering",
    rating: 4.9,
    established: 1958,
    courses: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering", "Metallurgical Engineering", "Ocean Engineering"],
    specializations: ["AI/ML", "Data Science", "Robotics", "Cybersecurity", "IoT", "Blockchain", "Marine Technology"],
    admissionCriteria: ["JEE Advanced", "GATE", "Direct Admission"],
    website: "https://www.iitb.ac.in",
    email: "info@iitb.ac.in",
    phone: "+91-22-2572-2545",
    address: "Powai, Mumbai",
    pincode: "400076",
    nirfRank: 3,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 10000,
    facultyCount: 600,
    campusSize: "550 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 1800000,
      highestPackage: 6000000,
      placementPercentage: 97
    },
    fees: {
      tuition: 200000,
      hostel: 55000,
      other: 35000
    },
    cutoff: {
      general: 99.1,
      obc: 96.8,
      sc: 87.2,
      st: 84.5
    }
  },
  {
    id: 3,
    name: "Indian Institute of Technology Madras",
    location: "Chennai",
    state: "Tamil Nadu",
    type: "IIT",
    category: "Engineering",
    rating: 4.8,
    established: 1959,
    courses: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering", "Ocean Engineering", "Biotechnology"],
    specializations: ["AI/ML", "Data Science", "Robotics", "Cybersecurity", "IoT", "Blockchain", "Marine Technology"],
    admissionCriteria: ["JEE Advanced", "GATE", "Direct Admission"],
    website: "https://www.iitm.ac.in",
    email: "info@iitm.ac.in",
    phone: "+91-44-2257-8280",
    address: "IIT P.O., Chennai",
    pincode: "600036",
    nirfRank: 1,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 9500,
    facultyCount: 550,
    campusSize: "620 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 1700000,
      highestPackage: 5500000,
      placementPercentage: 96
    },
    fees: {
      tuition: 200000,
      hostel: 52000,
      other: 32000
    },
    cutoff: {
      general: 98.8,
      obc: 96.1,
      sc: 86.5,
      st: 83.7
    }
  },

  // NITs (National Institutes of Technology)
  {
    id: 4,
    name: "National Institute of Technology Trichy",
    location: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "NIT",
    category: "Engineering",
    rating: 4.5,
    established: 1964,
    courses: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical and Electronics Engineering", "Civil Engineering", "Chemical Engineering", "Electronics and Communication Engineering"],
    specializations: ["AI/ML", "Data Science", "Embedded Systems", "VLSI", "Power Systems"],
    admissionCriteria: ["JEE Main", "GATE", "Direct Admission"],
    website: "https://www.nitt.edu",
    email: "info@nitt.edu",
    phone: "+91-431-250-3000",
    address: "Tanjore Main Road, Tiruchirappalli",
    pincode: "620015",
    nirfRank: 15,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 6000,
    facultyCount: 350,
    campusSize: "800 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 800000,
      highestPackage: 2500000,
      placementPercentage: 90
    },
    fees: {
      tuition: 150000,
      hostel: 40000,
      other: 20000
    },
    cutoff: {
      general: 95.5,
      obc: 92.1,
      sc: 78.5,
      st: 75.2
    }
  },

  // Central Universities
  {
    id: 5,
    name: "University of Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Central University",
    category: "General",
    rating: 4.4,
    established: 1922,
    courses: ["Bachelor of Arts", "Bachelor of Science", "Bachelor of Commerce", "Bachelor of Technology", "Bachelor of Medicine", "Bachelor of Law", "Master of Business Administration"],
    specializations: ["Economics", "Political Science", "History", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Law"],
    admissionCriteria: ["CUET", "Direct Admission", "Entrance Exams"],
    website: "https://www.du.ac.in",
    email: "info@du.ac.in",
    phone: "+91-11-2766-7000",
    address: "Benito Juarez Marg, New Delhi",
    pincode: "110021",
    nirfRank: 12,
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 50000,
    facultyCount: 2000,
    campusSize: "Multiple Campuses",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 600000,
      highestPackage: 2000000,
      placementPercentage: 85
    },
    fees: {
      tuition: 50000,
      hostel: 30000,
      other: 15000
    }
  },
  {
    id: 6,
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    state: "Delhi",
    type: "Central University",
    category: "Research",
    rating: 4.6,
    established: 1969,
    courses: ["Master of Arts", "Master of Science", "Master of Philosophy", "Doctor of Philosophy", "Master of Technology", "Master of Computer Applications"],
    specializations: ["International Studies", "Social Sciences", "Life Sciences", "Physical Sciences", "Environmental Sciences", "Computer Science", "Linguistics"],
    admissionCriteria: ["JNUEE", "Direct Admission", "Entrance Exams"],
    website: "https://www.jnu.ac.in",
    email: "info@jnu.ac.in",
    phone: "+91-11-2674-2557",
    address: "JNU Campus, New Delhi",
    pincode: "110067",
    nirfRank: 8,
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 8000,
    facultyCount: 400,
    campusSize: "1000 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 700000,
      highestPackage: 1800000,
      placementPercentage: 80
    },
    fees: {
      tuition: 30000,
      hostel: 25000,
      other: 10000
    }
  },

  // IIMs (Indian Institutes of Management)
  {
    id: 7,
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad",
    state: "Gujarat",
    type: "IIM",
    category: "Management",
    rating: 4.9,
    established: 1961,
    courses: ["Post Graduate Programme in Management", "Fellow Programme in Management", "Executive Post Graduate Programme", "Post Graduate Programme in Food and Agri-Business Management"],
    specializations: ["Finance", "Marketing", "Operations", "Human Resources", "Information Systems", "Strategy", "Entrepreneurship"],
    admissionCriteria: ["CAT", "GMAT", "Personal Interview", "Written Ability Test"],
    website: "https://www.iima.ac.in",
    email: "info@iima.ac.in",
    phone: "+91-79-6632-4900",
    address: "Vastrapur, Ahmedabad",
    pincode: "380015",
    nirfRank: 1,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 1200,
    facultyCount: 100,
    campusSize: "102 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 2500000,
      highestPackage: 8000000,
      placementPercentage: 100
    },
    fees: {
      tuition: 2300000,
      hostel: 200000,
      other: 100000
    }
  },

  // Medical Colleges
  {
    id: 8,
    name: "All India Institute of Medical Sciences Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Medical College",
    category: "Medical",
    rating: 4.9,
    established: 1956,
    courses: ["Bachelor of Medicine and Bachelor of Surgery", "Master of Surgery", "Doctor of Medicine", "Bachelor of Science in Nursing", "Master of Science in Nursing"],
    specializations: ["Cardiology", "Neurology", "Oncology", "Pediatrics", "Gynecology", "Orthopedics", "Radiology", "Anesthesiology"],
    admissionCriteria: ["NEET UG", "NEET PG", "AIIMS Entrance Exam"],
    website: "https://www.aiims.edu",
    email: "info@aiims.edu",
    phone: "+91-11-2658-8500",
    address: "Ansari Nagar, New Delhi",
    pincode: "110029",
    nirfRank: 1,
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 3000,
    facultyCount: 500,
    campusSize: "200 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 1200000,
      highestPackage: 3000000,
      placementPercentage: 100
    },
    fees: {
      tuition: 100000,
      hostel: 50000,
      other: 25000
    },
    cutoff: {
      general: 99.5,
      obc: 98.1,
      sc: 92.5,
      st: 89.3
    }
  },

  // State Universities
  {
    id: 9,
    name: "Anna University",
    location: "Chennai",
    state: "Tamil Nadu",
    type: "State University",
    category: "Engineering",
    rating: 4.3,
    established: 1978,
    courses: ["Bachelor of Technology", "Master of Technology", "Master of Business Administration", "Master of Computer Applications", "Bachelor of Architecture"],
    specializations: ["Information Technology", "Computer Science", "Mechanical Engineering", "Civil Engineering", "Electronics and Communication", "Aerospace Engineering"],
    admissionCriteria: ["TANCET", "GATE", "Direct Admission"],
    website: "https://www.annauniv.edu",
    email: "info@annauniv.edu",
    phone: "+91-44-2235-7000",
    address: "Sardar Patel Road, Chennai",
    pincode: "600025",
    nirfRank: 25,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 15000,
    facultyCount: 800,
    campusSize: "1000 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 500000,
      highestPackage: 1500000,
      placementPercentage: 75
    },
    fees: {
      tuition: 100000,
      hostel: 35000,
      other: 20000
    }
  },

  // More Central Universities
  {
    id: 10,
    name: "Visva Bharati University",
    location: "Santiniketan",
    state: "West Bengal",
    type: "Central University",
    category: "General",
    rating: 4.3,
    established: 1921,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Fine Arts", "Master of Fine Arts"],
    specializations: ["Fine Arts", "Music", "Dance", "Literature", "Philosophy", "Mathematics", "Physics", "Chemistry", "Economics"],
    admissionCriteria: ["CUET", "Direct Admission", "Entrance Exams"],
    website: "https://www.visvabharati.ac.in",
    email: "info@visvabharati.ac.in",
    phone: "+91-3463-262-751",
    address: "Visva Bharati University, Santiniketan",
    pincode: "731235",
    nirfRank: 20,
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 8000,
    facultyCount: 400,
    campusSize: "1133 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 70
    },
    fees: {
      tuition: 30000,
      hostel: 20000,
      other: 10000
    }
  }
];

// Additional Government colleges data (Central and State Government only)
export const additionalColleges: College[] = [
  // More IITs
  {
    id: 11,
    name: "Indian Institute of Technology Kanpur",
    location: "Kanpur",
    state: "Uttar Pradesh",
    type: "IIT",
    category: "Engineering",
    rating: 4.7,
    established: 1959,
    courses: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering", "Materials Science"],
    specializations: ["AI/ML", "Data Science", "Robotics", "Cybersecurity", "IoT", "Blockchain"],
    admissionCriteria: ["JEE Advanced", "GATE", "Direct Admission"],
    website: "https://www.iitk.ac.in",
    email: "info@iitk.ac.in",
    phone: "+91-512-259-0151",
    address: "IIT Kanpur, Kanpur",
    pincode: "208016",
    nirfRank: 4,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 8500,
    facultyCount: 500,
    campusSize: "1055 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 1600000,
      highestPackage: 5200000,
      placementPercentage: 96
    },
    fees: {
      tuition: 200000,
      hostel: 50000,
      other: 30000
    },
    cutoff: {
      general: 98.2,
      obc: 95.8,
      sc: 85.9,
      st: 83.1
    }
  },

  // More NITs
  {
    id: 12,
    name: "National Institute of Technology Karnataka",
    location: "Surathkal",
    state: "Karnataka",
    type: "NIT",
    category: "Engineering",
    rating: 4.4,
    established: 1960,
    courses: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical and Electronics Engineering", "Civil Engineering", "Chemical Engineering", "Electronics and Communication Engineering"],
    specializations: ["AI/ML", "Data Science", "Embedded Systems", "VLSI", "Power Systems"],
    admissionCriteria: ["JEE Main", "GATE", "Direct Admission"],
    website: "https://www.nitk.ac.in",
    email: "info@nitk.ac.in",
    phone: "+91-824-247-4000",
    address: "Srinivasnagar, Surathkal",
    pincode: "575025",
    nirfRank: 18,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 5500,
    facultyCount: 300,
    campusSize: "295 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 750000,
      highestPackage: 2200000,
      placementPercentage: 88
    },
    fees: {
      tuition: 150000,
      hostel: 40000,
      other: 20000
    },
    cutoff: {
      general: 94.8,
      obc: 91.2,
      sc: 77.8,
      st: 74.5
    }
  },

  // More Central Universities
  {
    id: 13,
    name: "Jadavpur University",
    location: "Kolkata",
    state: "West Bengal",
    type: "Central University",
    category: "Engineering",
    rating: 4.5,
    established: 1955,
    courses: ["Bachelor of Technology", "Master of Technology", "Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science"],
    specializations: ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Electronics", "Mathematics", "Physics", "Chemistry"],
    admissionCriteria: ["WBJEE", "GATE", "Direct Admission"],
    website: "https://www.jaduniv.edu.in",
    email: "info@jaduniv.edu.in",
    phone: "+91-33-2414-6666",
    address: "188, Raja S.C. Mullick Road, Kolkata",
    pincode: "700032",
    nirfRank: 10,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 12000,
    facultyCount: 600,
    campusSize: "58 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 650000,
      highestPackage: 1800000,
      placementPercentage: 82
    },
    fees: {
      tuition: 80000,
      hostel: 30000,
      other: 15000
    }
  },

  // More Central Universities from linkingsky.com
  {
    id: 15,
    name: "Central University of Andhra Pradesh",
    location: "Anantapur",
    state: "Andhra Pradesh",
    type: "Central University",
    category: "General",
    rating: 4.2,
    established: 2019,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Master of Business Administration", "Master of Technology"],
    specializations: ["Economics", "Political Science", "History", "Mathematics", "Physics", "Chemistry", "Computer Science", "Management"],
    admissionCriteria: ["CUET", "Direct Admission", "Entrance Exams"],
    website: "https://www.cuap.ac.in",
    email: "info@cuap.ac.in",
    phone: "+91-8555-257-200",
    address: "Central University of Andhra Pradesh, Anantapur",
    pincode: "515002",
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A",
    totalStudents: 3000,
    facultyCount: 150,
    campusSize: "200 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 70
    },
    fees: {
      tuition: 30000,
      hostel: 20000,
      other: 10000
    }
  },

  {
    id: 16,
    name: "Central University of South Bihar",
    location: "Gaya",
    state: "Bihar",
    type: "Central University",
    category: "General",
    rating: 4.1,
    established: 2009,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Master of Business Administration", "Master of Technology"],
    specializations: ["Economics", "Political Science", "History", "Mathematics", "Physics", "Chemistry", "Computer Science", "Management"],
    admissionCriteria: ["CUET", "Direct Admission", "Entrance Exams"],
    website: "https://www.cusb.ac.in",
    email: "info@cusb.ac.in",
    phone: "+91-631-222-9500",
    address: "Central University of South Bihar, Gaya",
    pincode: "824236",
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A",
    totalStudents: 4000,
    facultyCount: 200,
    campusSize: "300 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 350000,
      highestPackage: 1000000,
      placementPercentage: 65
    },
    fees: {
      tuition: 25000,
      hostel: 18000,
      other: 8000
    }
  },

  {
    id: 17,
    name: "Tezpur University",
    location: "Tezpur",
    state: "Assam",
    type: "Central University",
    category: "General",
    rating: 4.3,
    established: 1994,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["CUET", "GATE", "Direct Admission"],
    website: "https://www.tezu.ernet.in",
    email: "info@tezu.ernet.in",
    phone: "+91-3712-275-000",
    address: "Tezpur University, Napaam, Tezpur",
    pincode: "784028",
    nirfRank: 45,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 6000,
    facultyCount: 300,
    campusSize: "262 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 500000,
      highestPackage: 1500000,
      placementPercentage: 75
    },
    fees: {
      tuition: 40000,
      hostel: 25000,
      other: 12000
    }
  },

  // State Universities from linkingsky.com
  {
    id: 18,
    name: "Andhra University",
    location: "Visakhapatnam",
    state: "Andhra Pradesh",
    type: "State University",
    category: "General",
    rating: 4.0,
    established: 1926,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["AP EAMCET", "GATE", "Direct Admission"],
    website: "https://www.andhrauniversity.edu.in",
    email: "info@andhrauniversity.edu.in",
    phone: "+91-891-284-4000",
    address: "Andhra University, Visakhapatnam",
    pincode: "530003",
    nirfRank: 65,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 25000,
    facultyCount: 1200,
    campusSize: "422 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 70
    },
    fees: {
      tuition: 50000,
      hostel: 30000,
      other: 15000
    }
  },

  {
    id: 19,
    name: "Gauhati University",
    location: "Guwahati",
    state: "Assam",
    type: "State University",
    category: "General",
    rating: 4.1,
    established: 1948,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mathematics", "Physics", "Chemistry", "Economics", "Political Science", "History", "Management"],
    admissionCriteria: ["Assam CEE", "GATE", "Direct Admission"],
    website: "https://www.gauhati.ac.in",
    email: "info@gauhati.ac.in",
    phone: "+91-361-257-0410",
    address: "Gauhati University, Guwahati",
    pincode: "781014",
    nirfRank: 55,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 20000,
    facultyCount: 800,
    campusSize: "300 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 350000,
      highestPackage: 1000000,
      placementPercentage: 65
    },
    fees: {
      tuition: 40000,
      hostel: 25000,
      other: 12000
    }
  },

  {
    id: 20,
    name: "Calcutta University",
    location: "Kolkata",
    state: "West Bengal",
    type: "State University",
    category: "General",
    rating: 4.2,
    established: 1857,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mathematics", "Physics", "Chemistry", "Economics", "Political Science", "History", "Management"],
    admissionCriteria: ["WBJEE", "GATE", "Direct Admission"],
    website: "https://www.caluniv.ac.in",
    email: "info@caluniv.ac.in",
    phone: "+91-33-2241-0071",
    address: "Calcutta University, Kolkata",
    pincode: "700073",
    nirfRank: 40,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 30000,
    facultyCount: 1500,
    campusSize: "Multiple Campuses",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 450000,
      highestPackage: 1300000,
      placementPercentage: 72
    },
    fees: {
      tuition: 45000,
      hostel: 28000,
      other: 14000
    }
  },

  {
    id: 21,
    name: "Presidency University",
    location: "Kolkata",
    state: "West Bengal",
    type: "State University",
    category: "General",
    rating: 4.4,
    established: 1817,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Master of Philosophy", "Doctor of Philosophy"],
    specializations: ["Mathematics", "Physics", "Chemistry", "Economics", "Political Science", "History", "English", "Bengali"],
    admissionCriteria: ["CUET", "Direct Admission", "Entrance Exams"],
    website: "https://www.presidencyuniversity.ac.in",
    email: "info@presidencyuniversity.ac.in",
    phone: "+91-33-2241-0071",
    address: "Presidency University, Kolkata",
    pincode: "700073",
    nirfRank: 35,
    aicteApproved: false,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 5000,
    facultyCount: 300,
    campusSize: "50 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 500000,
      highestPackage: 1500000,
      placementPercentage: 80
    },
    fees: {
      tuition: 35000,
      hostel: 20000,
      other: 10000
    }
  },

  {
    id: 22,
    name: "Banaras Hindu University",
    location: "Varanasi",
    state: "Uttar Pradesh",
    type: "Central University",
    category: "General",
    rating: 4.3,
    established: 1916,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Bachelor of Medicine and Bachelor of Surgery"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Medicine"],
    admissionCriteria: ["CUET", "GATE", "NEET", "Direct Admission"],
    website: "https://www.bhu.ac.in",
    email: "info@bhu.ac.in",
    phone: "+91-542-236-8558",
    address: "Banaras Hindu University, Varanasi",
    pincode: "221005",
    nirfRank: 15,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A++",
    totalStudents: 40000,
    facultyCount: 2000,
    campusSize: "1300 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 500000,
      highestPackage: 1500000,
      placementPercentage: 75
    },
    fees: {
      tuition: 40000,
      hostel: 25000,
      other: 12000
    }
  },

  {
    id: 23,
    name: "Aligarh Muslim University",
    location: "Aligarh",
    state: "Uttar Pradesh",
    type: "Central University",
    category: "General",
    rating: 4.2,
    established: 1920,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Bachelor of Medicine and Bachelor of Surgery"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Medicine"],
    admissionCriteria: ["CUET", "GATE", "NEET", "Direct Admission"],
    website: "https://www.amu.ac.in",
    email: "info@amu.ac.in",
    phone: "+91-571-270-0920",
    address: "Aligarh Muslim University, Aligarh",
    pincode: "202002",
    nirfRank: 25,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 35000,
    facultyCount: 1800,
    campusSize: "467 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 450000,
      highestPackage: 1300000,
      placementPercentage: 70
    },
    fees: {
      tuition: 35000,
      hostel: 22000,
      other: 10000
    }
  },

  {
    id: 24,
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    state: "Delhi",
    type: "Central University",
    category: "General",
    rating: 4.1,
    established: 1920,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Bachelor of Medicine and Bachelor of Surgery"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Medicine"],
    admissionCriteria: ["CUET", "GATE", "NEET", "Direct Admission"],
    website: "https://www.jmi.ac.in",
    email: "info@jmi.ac.in",
    phone: "+91-11-2698-1717",
    address: "Jamia Millia Islamia, New Delhi",
    pincode: "110025",
    nirfRank: 30,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 25000,
    facultyCount: 1200,
    campusSize: "200 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 68
    },
    fees: {
      tuition: 30000,
      hostel: 20000,
      other: 8000
    }
  },

  {
    id: 25,
    name: "Punjab University",
    location: "Chandigarh",
    state: "Punjab",
    type: "State University",
    category: "General",
    rating: 4.0,
    established: 1882,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["PUCET", "GATE", "Direct Admission"],
    website: "https://www.puchd.ac.in",
    email: "info@puchd.ac.in",
    phone: "+91-172-253-4000",
    address: "Punjab University, Chandigarh",
    pincode: "160014",
    nirfRank: 50,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 20000,
    facultyCount: 1000,
    campusSize: "550 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 70
    },
    fees: {
      tuition: 40000,
      hostel: 25000,
      other: 12000
    }
  },

  // More State Universities from linkingsky.com
  {
    id: 26,
    name: "Osmania University",
    location: "Hyderabad",
    state: "Telangana",
    type: "State University",
    category: "General",
    rating: 4.1,
    established: 1918,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["TS EAMCET", "GATE", "Direct Admission"],
    website: "https://www.osmania.ac.in",
    email: "info@osmania.ac.in",
    phone: "+91-40-2768-2222",
    address: "Osmania University, Hyderabad",
    pincode: "500007",
    nirfRank: 60,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 30000,
    facultyCount: 1500,
    campusSize: "1600 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 450000,
      highestPackage: 1300000,
      placementPercentage: 72
    },
    fees: {
      tuition: 45000,
      hostel: 28000,
      other: 14000
    }
  },

  {
    id: 27,
    name: "Mysore University",
    location: "Mysore",
    state: "Karnataka",
    type: "State University",
    category: "General",
    rating: 4.0,
    established: 1916,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["KCET", "GATE", "Direct Admission"],
    website: "https://www.uni-mysore.ac.in",
    email: "info@uni-mysore.ac.in",
    phone: "+91-821-241-9000",
    address: "Mysore University, Mysore",
    pincode: "570005",
    nirfRank: 70,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 25000,
    facultyCount: 1200,
    campusSize: "739 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 70
    },
    fees: {
      tuition: 40000,
      hostel: 25000,
      other: 12000
    }
  },

  {
    id: 28,
    name: "Madras University",
    location: "Chennai",
    state: "Tamil Nadu",
    type: "State University",
    category: "General",
    rating: 4.1,
    established: 1857,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["TANCET", "GATE", "Direct Admission"],
    website: "https://www.unom.ac.in",
    email: "info@unom.ac.in",
    phone: "+91-44-2536-9000",
    address: "Madras University, Chennai",
    pincode: "600005",
    nirfRank: 55,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 35000,
    facultyCount: 1800,
    campusSize: "Multiple Campuses",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 450000,
      highestPackage: 1300000,
      placementPercentage: 72
    },
    fees: {
      tuition: 45000,
      hostel: 28000,
      other: 14000
    }
  },

  {
    id: 29,
    name: "Mumbai University",
    location: "Mumbai",
    state: "Maharashtra",
    type: "State University",
    category: "General",
    rating: 4.0,
    established: 1857,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["MHT CET", "GATE", "Direct Admission"],
    website: "https://www.mu.ac.in",
    email: "info@mu.ac.in",
    phone: "+91-22-2654-3000",
    address: "Mumbai University, Mumbai",
    pincode: "400032",
    nirfRank: 65,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 40000,
    facultyCount: 2000,
    campusSize: "Multiple Campuses",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementPercentage: 70
    },
    fees: {
      tuition: 40000,
      hostel: 25000,
      other: 12000
    }
  },

  {
    id: 30,
    name: "Pune University",
    location: "Pune",
    state: "Maharashtra",
    type: "State University",
    category: "General",
    rating: 4.2,
    established: 1949,
    courses: ["Bachelor of Arts", "Master of Arts", "Bachelor of Science", "Master of Science", "Bachelor of Technology", "Master of Technology", "Master of Business Administration"],
    specializations: ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering", "Mathematics", "Physics", "Chemistry", "Economics", "Management"],
    admissionCriteria: ["MHT CET", "GATE", "Direct Admission"],
    website: "https://www.unipune.ac.in",
    email: "info@unipune.ac.in",
    phone: "+91-20-2569-0000",
    address: "Pune University, Pune",
    pincode: "411007",
    nirfRank: 45,
    aicteApproved: true,
    ugcApproved: true,
    naacAccreditation: "A+",
    totalStudents: 30000,
    facultyCount: 1500,
    campusSize: "411 acres",
    hostelsAvailable: true,
    placementStats: {
      averagePackage: 500000,
      highestPackage: 1500000,
      placementPercentage: 75
    },
    fees: {
      tuition: 45000,
      hostel: 28000,
      other: 14000
    }
  }
];

// Combine all colleges
export const allColleges: College[] = [...collegesData, ...additionalColleges];

// Helper functions
export const getCollegesByState = (state: string): College[] => {
  if (state === 'All' || state === '') return allColleges;
  return allColleges.filter(college => college.state === state);
};

export const getCollegesByType = (type: string): College[] => {
  if (type === 'All' || type === '') return allColleges;
  return allColleges.filter(college => college.type === type);
};

export const getCollegesByCategory = (category: string): College[] => {
  if (category === 'All' || category === '') return allColleges;
  return allColleges.filter(college => college.category === category);
};

export const searchColleges = (query: string): College[] => {
  const lowercaseQuery = query.toLowerCase();
  return allColleges.filter(college => 
    college.name.toLowerCase().includes(lowercaseQuery) ||
    college.location.toLowerCase().includes(lowercaseQuery) ||
    college.state.toLowerCase().includes(lowercaseQuery) ||
    college.courses.some(course => course.toLowerCase().includes(lowercaseQuery)) ||
    college.specializations.some(spec => spec.toLowerCase().includes(lowercaseQuery))
  );
};

export const getStates = (): string[] => {
  const states = [...new Set(allColleges.map(college => college.state))];
  return ['All', ...states.sort()];
};

export const getCollegeTypes = (): string[] => {
  const types = [...new Set(allColleges.map(college => college.type))];
  return ['All', ...types.sort()];
};

export const getCollegeCategories = (): string[] => {
  const categories = [...new Set(allColleges.map(college => college.category))];
  return ['All', ...categories.sort()];
};

export const getTopRatedColleges = (limit: number = 10): College[] => {
  return allColleges
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getCollegesByNIRFRank = (): College[] => {
  return allColleges
    .filter(college => college.nirfRank)
    .sort((a, b) => (a.nirfRank || 0) - (b.nirfRank || 0));
};
