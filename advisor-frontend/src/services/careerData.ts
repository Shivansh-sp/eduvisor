// Comprehensive Career Database with Detailed Information

export interface Career {
  id: number;
  title: string;
  category: string;
  description: string;
  salary: string;
  education: string;
  skills: string[];
  growth: string;
  demand: string;
  experience: string;
  responsibilities: string[];
  requirements: string[];
  futureScope: string;
  companies: string[];
  workEnvironment: string;
  careerPath: string[];
}

export const careersData: Career[] = [
  // Technology & Engineering
  {
    id: 1,
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software applications and systems using various programming languages and frameworks.",
    salary: "₹6-15 LPA",
    education: "B.Tech Computer Science, BCA, MCA",
    skills: ["Programming", "Problem Solving", "Teamwork", "Algorithms", "Data Structures"],
    growth: "High",
    demand: "Very High",
    experience: "0-2 years entry level",
    responsibilities: [
      "Write clean, efficient code",
      "Debug and troubleshoot software issues",
      "Collaborate with cross-functional teams",
      "Participate in code reviews",
      "Maintain and update existing software"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Proficiency in programming languages (Java, Python, C++, etc.)",
      "Understanding of software development lifecycle",
      "Problem-solving and analytical skills"
    ],
    futureScope: "Excellent growth prospects with opportunities in AI, cloud computing, and mobile development",
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Accenture"],
    workEnvironment: "Office-based with flexible hours, remote work options available",
    careerPath: ["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager", "CTO"]
  },
  {
    id: 2,
    title: "Data Scientist",
    category: "Technology",
    description: "Analyze complex data to help organizations make informed decisions using statistical methods and machine learning.",
    salary: "₹8-20 LPA",
    education: "B.Tech/M.Sc in Data Science, Statistics, Mathematics",
    skills: ["Statistics", "Machine Learning", "Python", "R", "SQL", "Data Visualization"],
    growth: "Very High",
    demand: "High",
    experience: "1-3 years",
    responsibilities: [
      "Collect and analyze large datasets",
      "Build predictive models",
      "Create data visualizations",
      "Present findings to stakeholders",
      "Develop machine learning algorithms"
    ],
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "Strong programming skills in Python/R",
      "Knowledge of machine learning algorithms",
      "Experience with data visualization tools"
    ],
    futureScope: "Rapidly growing field with high demand across industries",
    companies: ["Google", "Amazon", "Microsoft", "IBM", "Accenture", "Deloitte", "EY"],
    workEnvironment: "Office-based with flexible hours, data-driven decision making",
    careerPath: ["Junior Data Scientist", "Senior Data Scientist", "Lead Data Scientist", "Data Science Manager", "Chief Data Officer"]
  },
  {
    id: 3,
    title: "Product Manager",
    category: "Technology",
    description: "Lead product development from conception to launch, working with cross-functional teams to deliver successful products.",
    salary: "₹12-25 LPA",
    education: "B.Tech + MBA, Business Administration, Engineering",
    skills: ["Product Strategy", "Market Research", "Project Management", "Analytics", "Communication"],
    growth: "High",
    demand: "High",
    experience: "3-5 years",
    responsibilities: [
      "Define product vision and strategy",
      "Conduct market research and competitive analysis",
      "Work with engineering teams on product development",
      "Coordinate with marketing and sales teams",
      "Analyze product performance and user feedback"
    ],
    requirements: [
      "Bachelor's degree in Engineering or Business",
      "MBA preferred",
      "Strong analytical and communication skills",
      "Experience in product development or management"
    ],
    futureScope: "Excellent growth opportunities in tech companies and startups",
    companies: ["Google", "Microsoft", "Amazon", "Flipkart", "Paytm", "Zomato", "Swiggy"],
    workEnvironment: "Office-based with frequent meetings and cross-team collaboration",
    careerPath: ["Associate Product Manager", "Product Manager", "Senior Product Manager", "Product Director", "VP Product"]
  },
  {
    id: 4,
    title: "UI/UX Designer",
    category: "Design",
    description: "Create user-friendly and visually appealing interfaces for digital products, focusing on user experience and usability.",
    salary: "₹5-15 LPA",
    education: "B.Des, BFA, B.Tech + Design courses, Graphic Design",
    skills: ["UI Design", "UX Research", "Prototyping", "Figma", "Adobe Creative Suite", "User Testing"],
    growth: "High",
    demand: "High",
    experience: "1-3 years",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes and prototypes",
      "Collaborate with developers and product managers",
      "Maintain design systems and style guides"
    ],
    requirements: [
      "Bachelor's degree in Design, Fine Arts, or related field",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Understanding of user-centered design principles",
      "Portfolio demonstrating design skills"
    ],
    futureScope: "Growing demand with opportunities in tech companies and design agencies",
    companies: ["Google", "Microsoft", "Amazon", "Adobe", "Figma", "Design agencies", "Startups"],
    workEnvironment: "Creative office environment with flexible hours",
    careerPath: ["Junior Designer", "UI/UX Designer", "Senior Designer", "Design Lead", "Creative Director"]
  },
  {
    id: 5,
    title: "Marketing Manager",
    category: "Marketing",
    description: "Develop and execute marketing strategies to promote products and services, manage marketing campaigns and teams.",
    salary: "₹8-18 LPA",
    education: "BBA, MBA Marketing, Business Administration, Mass Communication",
    skills: ["Digital Marketing", "Brand Management", "Analytics", "Communication", "Strategy"],
    growth: "Medium",
    demand: "High",
    experience: "3-5 years",
    responsibilities: [
      "Develop marketing strategies and campaigns",
      "Manage marketing budgets and resources",
      "Analyze market trends and competitor activities",
      "Coordinate with sales and product teams",
      "Measure and report on marketing performance"
    ],
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "MBA in Marketing preferred",
      "Experience in marketing or sales",
      "Strong analytical and communication skills"
    ],
    futureScope: "Good growth opportunities in various industries",
    companies: ["P&G", "Unilever", "Nestle", "Coca-Cola", "Amazon", "Flipkart", "Marketing agencies"],
    workEnvironment: "Office-based with occasional travel for events and meetings",
    careerPath: ["Marketing Executive", "Marketing Manager", "Senior Marketing Manager", "Marketing Director", "CMO"]
  },
  {
    id: 6,
    title: "Data Analyst",
    category: "Analytics",
    description: "Collect, process, and analyze data to help organizations make data-driven decisions and improve business performance.",
    salary: "₹4-12 LPA",
    education: "B.Tech, B.Sc Statistics, Mathematics, Economics, Business Analytics",
    skills: ["SQL", "Excel", "Python", "R", "Tableau", "Power BI", "Statistics"],
    growth: "High",
    demand: "High",
    experience: "0-2 years",
    responsibilities: [
      "Collect and clean data from various sources",
      "Analyze data to identify trends and patterns",
      "Create reports and dashboards",
      "Present findings to stakeholders",
      "Support business decision-making with data insights"
    ],
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, Economics, or related field",
      "Proficiency in SQL and Excel",
      "Knowledge of data visualization tools",
      "Strong analytical and problem-solving skills"
    ],
    futureScope: "High demand across industries with good growth prospects",
    companies: ["Deloitte", "EY", "KPMG", "PwC", "Accenture", "TCS", "Infosys"],
    workEnvironment: "Office-based with data-focused work",
    careerPath: ["Junior Analyst", "Data Analyst", "Senior Analyst", "Analytics Manager", "Head of Analytics"]
  },
  {
    id: 7,
    title: "Search Engine Optimization Specialist",
    category: "Digital Marketing",
    description: "Optimize websites and content to improve search engine rankings and increase organic traffic.",
    salary: "₹3-10 LPA",
    education: "Any Bachelor's degree + SEO certification, Digital Marketing courses",
    skills: ["SEO", "Google Analytics", "Content Marketing", "Keyword Research", "Technical SEO"],
    growth: "Medium",
    demand: "High",
    experience: "1-3 years",
    responsibilities: [
      "Conduct keyword research and analysis",
      "Optimize website content and structure",
      "Monitor search engine rankings and traffic",
      "Develop link-building strategies",
      "Create SEO reports and recommendations"
    ],
    requirements: [
      "Bachelor's degree in any field",
      "SEO certification preferred",
      "Knowledge of Google Analytics and Search Console",
      "Understanding of HTML and web development basics"
    ],
    futureScope: "Growing demand with digital marketing expansion",
    companies: ["Digital marketing agencies", "E-commerce companies", "Content platforms", "SEO agencies"],
    workEnvironment: "Office-based or remote work options available",
    careerPath: ["SEO Executive", "SEO Specialist", "Senior SEO Specialist", "SEO Manager", "Digital Marketing Head"]
  },
  {
    id: 8,
    title: "Data Mining Analyst",
    category: "Analytics",
    description: "Extract valuable insights from large datasets using advanced statistical and machine learning techniques.",
    salary: "₹6-15 LPA",
    education: "B.Tech, M.Sc Statistics, Mathematics, Computer Science",
    skills: ["Data Mining", "Machine Learning", "Python", "R", "SQL", "Statistics", "Big Data"],
    growth: "High",
    demand: "Medium",
    experience: "2-4 years",
    responsibilities: [
      "Extract patterns and insights from large datasets",
      "Develop data mining models and algorithms",
      "Clean and preprocess data for analysis",
      "Create predictive models",
      "Present findings to business stakeholders"
    ],
    requirements: [
      "Master's degree in Statistics, Mathematics, or Computer Science",
      "Strong programming skills in Python/R",
      "Knowledge of machine learning algorithms",
      "Experience with big data tools"
    ],
    futureScope: "Good growth opportunities in data-driven organizations",
    companies: ["IBM", "SAS", "Oracle", "Microsoft", "Amazon", "Data analytics companies"],
    workEnvironment: "Office-based with data-intensive work",
    careerPath: ["Junior Analyst", "Data Mining Analyst", "Senior Analyst", "Data Science Manager", "Chief Data Officer"]
  },
  {
    id: 9,
    title: "Analytics Manager",
    category: "Analytics",
    description: "Lead analytics teams to provide data-driven insights and support strategic business decisions.",
    salary: "₹12-25 LPA",
    education: "MBA, M.Sc Statistics, B.Tech + Analytics experience",
    skills: ["Team Management", "Analytics", "Business Intelligence", "Strategy", "Communication"],
    growth: "High",
    demand: "High",
    experience: "5-8 years",
    responsibilities: [
      "Lead and manage analytics teams",
      "Develop analytics strategies and roadmaps",
      "Present insights to senior management",
      "Oversee data quality and governance",
      "Drive data-driven decision making across organization"
    ],
    requirements: [
      "Master's degree in Analytics, Statistics, or Business",
      "5+ years of analytics experience",
      "Strong leadership and communication skills",
      "Experience with analytics tools and platforms"
    ],
    futureScope: "Excellent growth opportunities in senior management roles",
    companies: ["Deloitte", "EY", "KPMG", "PwC", "Accenture", "McKinsey", "BCG"],
    workEnvironment: "Office-based with team management responsibilities",
    careerPath: ["Analytics Manager", "Senior Analytics Manager", "Director of Analytics", "VP Analytics", "Chief Analytics Officer"]
  },
  {
    id: 10,
    title: "Digital Content Manager",
    category: "Content Marketing",
    description: "Create, manage, and optimize digital content across various platforms to engage audiences and drive business goals.",
    salary: "₹5-12 LPA",
    education: "B.A, B.Sc, Mass Communication, Journalism, English Literature",
    skills: ["Content Writing", "SEO", "Social Media", "CMS", "Analytics", "Creative Writing"],
    growth: "Medium",
    demand: "High",
    experience: "2-4 years",
    responsibilities: [
      "Create and manage digital content calendar",
      "Write and edit content for various platforms",
      "Optimize content for SEO and engagement",
      "Manage content distribution across channels",
      "Analyze content performance and metrics"
    ],
    requirements: [
      "Bachelor's degree in English, Journalism, or related field",
      "Strong writing and editing skills",
      "Knowledge of content management systems",
      "Understanding of digital marketing principles"
    ],
    futureScope: "Growing demand with digital marketing expansion",
    companies: ["Content agencies", "E-commerce companies", "Media houses", "Digital marketing agencies"],
    workEnvironment: "Office-based or remote work options available",
    careerPath: ["Content Writer", "Content Manager", "Senior Content Manager", "Content Director", "Head of Content"]
  },
  {
    id: 11,
    title: "Content Strategist",
    category: "Content Marketing",
    description: "Develop comprehensive content strategies to achieve business objectives and engage target audiences effectively.",
    salary: "₹8-18 LPA",
    education: "MBA, B.A, Mass Communication, Marketing, English Literature",
    skills: ["Content Strategy", "Brand Management", "Analytics", "Research", "Communication"],
    growth: "Medium",
    demand: "High",
    experience: "3-5 years",
    responsibilities: [
      "Develop content strategies aligned with business goals",
      "Conduct audience research and persona development",
      "Plan content distribution across channels",
      "Measure and optimize content performance",
      "Collaborate with marketing and creative teams"
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "MBA preferred",
      "Experience in content marketing or strategy",
      "Strong analytical and strategic thinking skills"
    ],
    futureScope: "Good growth opportunities in marketing and communications",
    companies: ["Marketing agencies", "Brand consultancies", "E-commerce companies", "Media companies"],
    workEnvironment: "Office-based with strategic planning focus",
    careerPath: ["Content Strategist", "Senior Content Strategist", "Content Director", "Head of Content Strategy", "CMO"]
  },
  {
    id: 12,
    title: "Data Scientist",
    category: "Technology",
    description: "Advanced analytics professional who uses scientific methods, algorithms, and systems to extract insights from data.",
    salary: "₹10-25 LPA",
    education: "M.Sc, PhD in Data Science, Statistics, Computer Science, Mathematics",
    skills: ["Machine Learning", "Deep Learning", "Python", "R", "Statistics", "Big Data", "AI"],
    growth: "Very High",
    demand: "Very High",
    experience: "3-5 years",
    responsibilities: [
      "Develop machine learning models and algorithms",
      "Analyze complex datasets to extract insights",
      "Build predictive models for business applications",
      "Collaborate with engineering teams to deploy models",
      "Research and implement cutting-edge data science techniques"
    ],
    requirements: [
      "Master's or PhD in Data Science, Statistics, or related field",
      "Strong programming skills in Python/R",
      "Deep knowledge of machine learning algorithms",
      "Experience with big data technologies"
    ],
    futureScope: "Excellent growth prospects with high demand across industries",
    companies: ["Google", "Microsoft", "Amazon", "IBM", "Netflix", "Uber", "Airbnb"],
    workEnvironment: "Office-based with research and development focus",
    careerPath: ["Data Scientist", "Senior Data Scientist", "Lead Data Scientist", "Principal Data Scientist", "Chief Data Scientist"]
  },
  {
    id: 13,
    title: "Marketing Automation Specialist",
    category: "Digital Marketing",
    description: "Design and implement automated marketing campaigns using technology platforms to improve efficiency and effectiveness.",
    salary: "₹6-15 LPA",
    education: "BBA, MBA Marketing, Digital Marketing courses",
    skills: ["Marketing Automation", "Email Marketing", "CRM", "Analytics", "Campaign Management"],
    growth: "High",
    demand: "High",
    experience: "2-4 years",
    responsibilities: [
      "Design and implement marketing automation workflows",
      "Manage email marketing campaigns",
      "Integrate marketing tools with CRM systems",
      "Analyze campaign performance and optimize",
      "Train team members on automation tools"
    ],
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Experience with marketing automation platforms",
      "Knowledge of CRM systems",
      "Strong analytical and technical skills"
    ],
    futureScope: "Growing demand with digital marketing automation",
    companies: ["Marketing agencies", "SaaS companies", "E-commerce companies", "Marketing technology companies"],
    workEnvironment: "Office-based with technology-focused work",
    careerPath: ["Marketing Automation Specialist", "Senior Specialist", "Automation Manager", "Marketing Technology Manager", "Head of Marketing Technology"]
  },
  {
    id: 14,
    title: "Media Planner",
    category: "Advertising",
    description: "Plan and execute media campaigns across various channels to reach target audiences effectively and efficiently.",
    salary: "₹4-12 LPA",
    education: "BBA, MBA Marketing, Mass Communication, Advertising",
    skills: ["Media Planning", "Market Research", "Analytics", "Budget Management", "Campaign Optimization"],
    growth: "Medium",
    demand: "High",
    experience: "1-3 years",
    responsibilities: [
      "Develop media strategies and plans",
      "Research target audiences and media consumption",
      "Negotiate with media vendors",
      "Monitor and optimize campaign performance",
      "Prepare media reports and recommendations"
    ],
    requirements: [
      "Bachelor's degree in Marketing, Advertising, or related field",
      "Knowledge of media planning tools and platforms",
      "Strong analytical and communication skills",
      "Understanding of advertising metrics"
    ],
    futureScope: "Good opportunities in advertising agencies and media companies",
    companies: ["Advertising agencies", "Media agencies", "Brand companies", "Digital marketing agencies"],
    workEnvironment: "Office-based with client-facing responsibilities",
    careerPath: ["Media Planner", "Senior Media Planner", "Media Manager", "Media Director", "Head of Media"]
  },
  {
    id: 15,
    title: "Graphic Designer",
    category: "Design",
    description: "Create visual concepts and designs for various media including print, digital, and social media platforms.",
    salary: "₹3-10 LPA",
    education: "B.Des, BFA, Graphic Design diploma, Fine Arts",
    skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Layout Design", "Branding"],
    growth: "Medium",
    demand: "High",
    experience: "1-3 years",
    responsibilities: [
      "Create visual designs for various media",
      "Develop brand identities and style guides",
      "Collaborate with marketing and creative teams",
      "Present design concepts to clients",
      "Maintain brand consistency across all materials"
    ],
    requirements: [
      "Bachelor's degree in Design, Fine Arts, or related field",
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio demonstrating design skills",
      "Understanding of design principles and trends"
    ],
    futureScope: "Good opportunities in design agencies and corporate environments",
    companies: ["Design agencies", "Advertising agencies", "Publishing houses", "Corporate design teams"],
    workEnvironment: "Creative office environment with flexible hours",
    careerPath: ["Junior Designer", "Graphic Designer", "Senior Designer", "Art Director", "Creative Director"]
  },
  {
    id: 16,
    title: "Data Visualization Specialist",
    category: "Analytics",
    description: "Create compelling visual representations of data to help stakeholders understand complex information and make decisions.",
    salary: "₹6-15 LPA",
    education: "B.Tech, B.Sc, Design, Statistics, Computer Science",
    skills: ["Data Visualization", "Tableau", "Power BI", "Python", "D3.js", "Design"],
    growth: "High",
    demand: "High",
    experience: "2-4 years",
    responsibilities: [
      "Create interactive dashboards and reports",
      "Design data visualizations for various audiences",
      "Work with data analysts to understand requirements",
      "Present insights through visual storytelling",
      "Maintain and update visualization tools"
    ],
    requirements: [
      "Bachelor's degree in Design, Statistics, or related field",
      "Proficiency in visualization tools (Tableau, Power BI)",
      "Knowledge of programming languages (Python, JavaScript)",
      "Strong design and analytical skills"
    ],
    futureScope: "High demand with growing importance of data-driven decision making",
    companies: ["Consulting firms", "Technology companies", "Financial services", "Healthcare organizations"],
    workEnvironment: "Office-based with creative and analytical work",
    careerPath: ["Data Visualization Specialist", "Senior Specialist", "Visualization Manager", "Head of Data Visualization", "Chief Data Officer"]
  },
  {
    id: 17,
    title: "E-commerce Analyst",
    category: "E-commerce",
    description: "Analyze e-commerce data to optimize online sales, improve customer experience, and drive business growth.",
    salary: "₹5-12 LPA",
    education: "B.Tech, BBA, MBA, E-commerce courses",
    skills: ["E-commerce Analytics", "Google Analytics", "Conversion Optimization", "A/B Testing", "Customer Behavior"],
    growth: "High",
    demand: "High",
    experience: "2-4 years",
    responsibilities: [
      "Analyze e-commerce performance metrics",
      "Optimize conversion rates and user experience",
      "Conduct A/B tests for website improvements",
      "Monitor customer behavior and purchase patterns",
      "Provide insights for business strategy"
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "Experience with e-commerce platforms",
      "Knowledge of web analytics tools",
      "Understanding of online consumer behavior"
    ],
    futureScope: "Excellent growth with e-commerce expansion",
    companies: ["Amazon", "Flipkart", "Myntra", "E-commerce companies", "Retail brands"],
    workEnvironment: "Office-based with data analysis focus",
    careerPath: ["E-commerce Analyst", "Senior Analyst", "E-commerce Manager", "Head of E-commerce", "VP E-commerce"]
  },
  {
    id: 18,
    title: "Digital Marketing Manager",
    category: "Digital Marketing",
    description: "Lead digital marketing initiatives across various online channels to increase brand awareness and drive sales.",
    salary: "₹8-20 LPA",
    education: "BBA, MBA Marketing, Digital Marketing courses",
    skills: ["Digital Marketing", "SEO", "SEM", "Social Media", "Analytics", "Campaign Management"],
    growth: "High",
    demand: "Very High",
    experience: "3-5 years",
    responsibilities: [
      "Develop and execute digital marketing strategies",
      "Manage online advertising campaigns",
      "Oversee social media marketing efforts",
      "Analyze digital marketing performance",
      "Lead and manage digital marketing teams"
    ],
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "MBA preferred",
      "Experience in digital marketing",
      "Strong analytical and leadership skills"
    ],
    futureScope: "Excellent growth opportunities in digital-first companies",
    companies: ["Digital agencies", "E-commerce companies", "SaaS companies", "Startups", "Corporate brands"],
    workEnvironment: "Office-based with digital focus",
    careerPath: ["Digital Marketing Executive", "Digital Marketing Manager", "Senior Manager", "Digital Marketing Director", "CMO"]
  },
  {
    id: 19,
    title: "Communications Specialist",
    category: "Communications",
    description: "Develop and implement communication strategies to enhance brand reputation and engage with various stakeholders.",
    salary: "₹4-12 LPA",
    education: "B.A, Mass Communication, Journalism, Public Relations",
    skills: ["Written Communication", "Public Relations", "Media Relations", "Crisis Communication", "Content Creation"],
    growth: "Medium",
    demand: "High",
    experience: "2-4 years",
    responsibilities: [
      "Develop communication strategies and materials",
      "Manage media relations and press releases",
      "Handle crisis communication situations",
      "Create content for various communication channels",
      "Monitor and manage brand reputation"
    ],
    requirements: [
      "Bachelor's degree in Communications, Journalism, or related field",
      "Strong written and verbal communication skills",
      "Experience in public relations or communications",
      "Understanding of media landscape"
    ],
    futureScope: "Good opportunities in corporate communications and PR agencies",
    companies: ["PR agencies", "Corporate communications", "Government organizations", "Non-profits"],
    workEnvironment: "Office-based with media and stakeholder interaction",
    careerPath: ["Communications Specialist", "Senior Specialist", "Communications Manager", "Head of Communications", "VP Communications"]
  },
  {
    id: 20,
    title: "Marketing Assistant",
    category: "Marketing",
    description: "Support marketing teams with administrative tasks, campaign coordination, and market research activities.",
    salary: "₹2-6 LPA",
    education: "BBA, B.A, Marketing, Business Administration",
    skills: ["Administrative Skills", "Market Research", "Communication", "Organization", "Basic Marketing"],
    growth: "Medium",
    demand: "High",
    experience: "0-2 years",
    responsibilities: [
      "Assist with marketing campaign coordination",
      "Conduct market research and data collection",
      "Support social media and content creation",
      "Help with event planning and execution",
      "Maintain marketing databases and records"
    ],
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "Strong organizational and communication skills",
      "Basic knowledge of marketing principles",
      "Proficiency in Microsoft Office"
    ],
    futureScope: "Entry-level position with growth opportunities",
    companies: ["Marketing agencies", "Corporate marketing departments", "Startups", "Small businesses"],
    workEnvironment: "Office-based with administrative focus",
    careerPath: ["Marketing Assistant", "Marketing Executive", "Marketing Coordinator", "Marketing Manager", "Senior Marketing Manager"]
  },
  {
    id: 21,
    title: "Marketing Manager",
    category: "Marketing",
    description: "Lead marketing initiatives to promote products and services, manage marketing teams and budgets.",
    salary: "₹10-20 LPA",
    education: "MBA Marketing, BBA, Business Administration",
    skills: ["Marketing Strategy", "Team Management", "Budget Management", "Analytics", "Leadership"],
    growth: "High",
    demand: "High",
    experience: "5-8 years",
    responsibilities: [
      "Develop comprehensive marketing strategies",
      "Lead and manage marketing teams",
      "Oversee marketing budgets and campaigns",
      "Analyze market trends and competitor activities",
      "Collaborate with sales and product teams"
    ],
    requirements: [
      "MBA in Marketing or related field",
      "5+ years of marketing experience",
      "Strong leadership and analytical skills",
      "Experience in team management"
    ],
    futureScope: "Excellent growth opportunities in senior management",
    companies: ["Fortune 500 companies", "Multinational corporations", "Marketing agencies", "E-commerce companies"],
    workEnvironment: "Office-based with team management responsibilities",
    careerPath: ["Marketing Manager", "Senior Marketing Manager", "Marketing Director", "VP Marketing", "CMO"]
  },
  {
    id: 22,
    title: "Creative Director",
    category: "Creative",
    description: "Lead creative teams to develop innovative campaigns and visual concepts that align with brand objectives.",
    salary: "₹15-30 LPA",
    education: "B.Des, MFA, Fine Arts, Design, Advertising",
    skills: ["Creative Leadership", "Brand Strategy", "Team Management", "Visual Design", "Campaign Development"],
    growth: "Medium",
    demand: "High",
    experience: "8-12 years",
    responsibilities: [
      "Lead creative strategy and vision",
      "Manage and mentor creative teams",
      "Oversee campaign development and execution",
      "Present creative concepts to clients",
      "Ensure brand consistency across all touchpoints"
    ],
    requirements: [
      "Bachelor's degree in Design, Fine Arts, or related field",
      "8+ years of creative experience",
      "Strong portfolio and creative leadership skills",
      "Experience in team management"
    ],
    futureScope: "Senior-level position with opportunities in creative agencies",
    companies: ["Advertising agencies", "Design agencies", "Creative studios", "Brand consultancies"],
    workEnvironment: "Creative office environment with leadership responsibilities",
    careerPath: ["Creative Director", "Executive Creative Director", "Chief Creative Officer", "Creative Partner"]
  },
  {
    id: 23,
    title: "Marketing Specialist",
    category: "Marketing",
    description: "Focus on specific areas of marketing such as digital, content, or product marketing to drive targeted results.",
    salary: "₹6-15 LPA",
    education: "BBA, MBA Marketing, Specialized marketing courses",
    skills: ["Specialized Marketing", "Analytics", "Campaign Management", "Research", "Strategy"],
    growth: "High",
    demand: "High",
    experience: "3-5 years",
    responsibilities: [
      "Develop specialized marketing strategies",
      "Execute targeted marketing campaigns",
      "Analyze performance and optimize results",
      "Conduct market research and analysis",
      "Collaborate with cross-functional teams"
    ],
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Specialization in specific marketing area",
      "Strong analytical and strategic skills",
      "Experience in targeted marketing"
    ],
    futureScope: "Good growth opportunities in specialized marketing roles",
    companies: ["Marketing agencies", "Technology companies", "E-commerce companies", "Corporate marketing"],
    workEnvironment: "Office-based with specialized focus",
    careerPath: ["Marketing Specialist", "Senior Specialist", "Marketing Manager", "Senior Manager", "Director"]
  },
  {
    id: 24,
    title: "Web Designer",
    category: "Design",
    description: "Design and create visually appealing and user-friendly websites that meet client requirements and business objectives.",
    salary: "₹4-12 LPA",
    education: "B.Des, B.Tech, Web Design courses, Computer Science",
    skills: ["Web Design", "HTML/CSS", "JavaScript", "UI/UX", "Responsive Design"],
    growth: "High",
    demand: "High",
    experience: "2-4 years",
    responsibilities: [
      "Design and develop websites",
      "Create responsive web layouts",
      "Optimize websites for performance and usability",
      "Collaborate with developers and clients",
      "Maintain and update existing websites"
    ],
    requirements: [
      "Bachelor's degree in Design, Computer Science, or related field",
      "Proficiency in web design tools and technologies",
      "Knowledge of HTML, CSS, and JavaScript",
      "Understanding of user experience principles"
    ],
    futureScope: "Excellent growth with increasing demand for web presence",
    companies: ["Web design agencies", "Technology companies", "E-commerce companies", "Freelance opportunities"],
    workEnvironment: "Office-based or remote work options available",
    careerPath: ["Web Designer", "Senior Web Designer", "Lead Designer", "Creative Director", "Head of Design"]
  },
  {
    id: 25,
    title: "Growth Marketing Manager",
    category: "Marketing",
    description: "Focus on rapid business growth through data-driven marketing strategies and experimentation.",
    salary: "₹12-25 LPA",
    education: "MBA, BBA, Marketing, Business Analytics",
    skills: ["Growth Hacking", "Data Analysis", "A/B Testing", "Funnel Optimization", "Experimentation"],
    growth: "Very High",
    demand: "High",
    experience: "4-6 years",
    responsibilities: [
      "Develop and execute growth marketing strategies",
      "Conduct A/B tests and experiments",
      "Optimize conversion funnels and user acquisition",
      "Analyze data to identify growth opportunities",
      "Scale successful marketing initiatives"
    ],
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "MBA preferred",
      "Experience in growth marketing or digital marketing",
      "Strong analytical and experimentation skills"
    ],
    futureScope: "High demand in startups and growth-focused companies",
    companies: ["Startups", "SaaS companies", "E-commerce companies", "Technology companies"],
    workEnvironment: "Office-based with data-driven focus",
    careerPath: ["Growth Marketing Manager", "Senior Growth Manager", "Head of Growth", "VP Growth", "Chief Growth Officer"]
  },
  {
    id: 26,
    title: "Marketing Research Product Designer",
    category: "Research",
    description: "Design and conduct market research studies to understand consumer behavior and market trends.",
    salary: "₹6-15 LPA",
    education: "MBA, M.Sc, B.Tech, Market Research, Statistics",
    skills: ["Market Research", "Survey Design", "Data Analysis", "Consumer Behavior", "Research Methods"],
    growth: "Medium",
    demand: "High",
    experience: "3-5 years",
    responsibilities: [
      "Design market research studies and surveys",
      "Analyze consumer behavior and market trends",
      "Present research findings to stakeholders",
      "Develop research methodologies and frameworks",
      "Collaborate with marketing and product teams"
    ],
    requirements: [
      "Master's degree in Marketing, Statistics, or related field",
      "Experience in market research",
      "Strong analytical and research skills",
      "Knowledge of research tools and methodologies"
    ],
    futureScope: "Good opportunities in research agencies and corporate research",
    companies: ["Market research agencies", "Consulting firms", "Corporate research departments", "Government organizations"],
    workEnvironment: "Office-based with research focus",
    careerPath: ["Research Analyst", "Research Designer", "Senior Researcher", "Research Manager", "Head of Research"]
  }
];

// Helper functions
export const getCareersByCategory = (category: string) => {
  return careersData.filter(career => career.category === category);
};

export const searchCareers = (term: string) => {
  return careersData.filter(career => 
    career.title.toLowerCase().includes(term.toLowerCase()) ||
    career.description.toLowerCase().includes(term.toLowerCase()) ||
    career.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
  );
};

export const getCareerById = (id: number) => {
  return careersData.find(career => career.id === id);
};

export const getCategories = () => {
  const categories = [...new Set(careersData.map(career => career.category))];
  return categories.sort();
};

export const getTopCareers = (count: number = 10) => {
  return careersData
    .filter(career => career.demand === 'Very High' || career.demand === 'High')
    .slice(0, count);
};

export default careersData;
