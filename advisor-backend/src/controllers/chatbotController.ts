import { Request, Response } from 'express';
import ChatMessage, { IChatMessage } from '../models/ChatMessage';
import User from '../models/User';
import College from '../models/College';
import Career from '../models/Career';
import { AuthRequest } from '../middleware/auth';

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
// @access  Public
export const sendMessage = async (req: Request | AuthRequest, res: Response) => {
  try {
    const { message, sessionId } = req.body;
    const userId = (req as AuthRequest).user?._id;

    // Save user message
    const userMessage = await ChatMessage.create({
      message,
      sender: 'user',
      sessionId,
      user: userId
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(message, userId);

    // Save bot message
    const botMessage = await ChatMessage.create({
      message: aiResponse,
      sender: 'bot',
      sessionId,
      user: userId
    });

    res.status(200).json({
      success: true,
      data: {
        userMessage,
        botMessage: {
          ...botMessage.toObject(),
          message: aiResponse
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get chat history
// @route   GET /api/chatbot/history/:sessionId
// @access  Private
export const getChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?._id;

    const messages = await ChatMessage.find({
      sessionId,
      user: userId
    }).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get user's chat sessions
// @route   GET /api/chatbot/sessions
// @access  Private
export const getChatSessions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const sessions = await ChatMessage.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$sessionId',
          lastMessage: { $last: '$message' },
          lastTimestamp: { $last: '$timestamp' },
          messageCount: { $sum: 1 }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// AI Response Generation Function
const generateAIResponse = async (userMessage: string, userId?: string): Promise<string> => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Get user context if available
  let userContext = null;
  if (userId) {
    try {
      userContext = await User.findById(userId);
    } catch (error) {
      console.log('Could not fetch user context');
    }
  }

  // Career guidance responses
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('profession')) {
    const careers = await Career.find().limit(5);
    const careerNames = careers.map(c => c.name).join(', ');
    
    return `Great question about careers! Based on current market trends, here are some promising career paths: ${careerNames}.

🔬 **STEM Fields**: High demand in technology, healthcare, and research
💼 **Business**: Growing opportunities in digital marketing, data analysis, and management
🎨 **Creative Fields**: Expanding scope in digital media, UX/UI design, and content creation
🏛️ **Public Service**: Stable careers in education, civil services, and social work

${userContext ? `Based on your profile, ` : ''}To give you more personalized advice, consider:
- Your academic strengths and interests
- Market demand in your preferred location
- Growth potential and salary expectations
- Work-life balance preferences

Would you like me to suggest specific career paths based on your academic background? You can also take our comprehensive career assessment for detailed recommendations!`;
  }

  // College recommendations
  if (lowerMessage.includes('college') || lowerMessage.includes('university') || lowerMessage.includes('admission')) {
    const colleges = await College.find().limit(3);
    const collegeInfo = colleges.map(c => `${c.name} (${c.location.city}, ${c.location.state})`).join(', ');
    
    return `I'd be happy to help you find the perfect college! Here are some top institutions: ${collegeInfo}.

🏛️ **Government Colleges**: 
- Cost-effective education with quality faculty
- Strong alumni networks and placement support
- Diverse student community

🎓 **Selection Criteria**:
- Academic performance and entrance exam scores
- Location preferences and campus facilities
- Course offerings and specializations
- Placement records and industry connections

${userContext ? `Given your background, ` : ''}Key factors to consider:
- Admission requirements and cut-offs
- Fee structure and scholarship opportunities
- Campus infrastructure and facilities
- Faculty expertise and research opportunities

Would you like me to recommend colleges based on:
- Your preferred course/stream?
- Specific location or state?
- Budget constraints?

You can also explore our comprehensive college directory for detailed information!`;
  }

  // Course selection help
  if (lowerMessage.includes('course') || lowerMessage.includes('subject') || lowerMessage.includes('stream')) {
    return `Excellent question! Choosing the right course is crucial for your future success. Here's my guidance:

📚 **Popular Courses by Stream**:

**Science Stream**:
- Engineering (Computer, Mechanical, Civil, Electrical)
- Medicine (MBBS, BDS, Pharmacy, Nursing)
- Pure Sciences (Physics, Chemistry, Mathematics, Biology)
- Technology (Information Technology, Biotechnology)

**Commerce Stream**:
- Business Administration (BBA, MBA)
- Finance & Accounting (CA, CS, CMA)
- Economics and Statistics
- Banking and Insurance

**Arts/Humanities**:
- Literature and Languages
- Psychology and Sociology
- Journalism and Mass Communication
- Law and Legal Studies

🎯 **Decision Framework**:
1. **Interest Assessment**: What subjects do you enjoy most?
2. **Aptitude Analysis**: Where are your natural strengths?
3. **Market Research**: What's the demand for different skills?
4. **Career Goals**: What kind of work environment do you prefer?

${userContext ? `Based on your academic background, ` : ''}Would you like me to:
- Suggest courses based on your 12th grade subjects?
- Explain career prospects for specific courses?
- Help you understand admission requirements?

I can also connect you with our career assessment tool for personalized recommendations!`;
  }

  // Exam preparation guidance
  if (lowerMessage.includes('exam') || lowerMessage.includes('preparation') || lowerMessage.includes('study') || lowerMessage.includes('jee') || lowerMessage.includes('neet')) {
    return `Fantastic! Proper exam preparation is the key to unlocking your dream college. Here's my comprehensive guide:

📖 **Study Strategy Framework**:

**Phase 1: Foundation Building**
- Master NCERT textbooks thoroughly
- Understand concepts before memorizing formulas
- Create mind maps for complex topics
- Practice numerical problems daily

**Phase 2: Advanced Preparation**
- Solve previous year question papers (last 10 years)
- Take regular mock tests and analyze performance
- Focus on time management and accuracy
- Identify and strengthen weak areas

**Phase 3: Final Sprint**
- Intensive revision using notes and flashcards
- Solve sample papers under exam conditions
- Maintain physical and mental health
- Stay positive and confident

🎯 **Exam-Specific Tips**:

**JEE Main/Advanced**: Focus on Physics concepts, Chemistry reactions, and Math problem-solving speed
**NEET**: Emphasize Biology diagrams, Chemistry equations, and Physics numericals
**CUET**: Strong foundation in chosen subjects with current affairs awareness

⏰ **Time Management**:
- Create a realistic daily study schedule
- Allocate time based on subject weightage
- Include regular breaks and recreational activities
- Maintain consistent sleep patterns

Which specific exam are you preparing for? I can provide targeted strategies and resources!`;
  }

  // Scholarship information
  if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid') || lowerMessage.includes('funding')) {
    return `Excellent question! Scholarships can significantly reduce your education costs. Here's comprehensive information:

💰 **Government Scholarship Programs**:

**Central Government**:
- National Scholarship Portal (scholarships.gov.in)
- Merit-cum-Means scholarships
- Post-Matric scholarships for minorities
- INSPIRE Scholarship for Science students

**State Government**:
- State-specific merit scholarships
- Backward class welfare schemes
- Girl child education incentives
- Professional course scholarships

🏆 **Private & Institutional Scholarships**:
- Corporate CSR scholarships (Tata, Reliance, Infosys)
- University-specific merit scholarships
- International study grants
- Sports and cultural scholarships

📋 **Eligibility Criteria**:
- **Academic**: Usually 60%+ in qualifying exam
- **Economic**: Family income below specified limits
- **Category**: Special provisions for SC/ST/OBC/Minorities
- **Course-specific**: Different criteria for different streams

🔍 **Application Process**:
1. Register on National Scholarship Portal
2. Complete profile with accurate information
3. Upload required documents (income certificate, marks sheets, etc.)
4. Submit applications before deadlines
5. Track application status regularly

💡 **Pro Tips**:
- Apply early to avoid last-minute rush
- Keep all documents ready in digital format
- Apply for multiple scholarships to increase chances
- Follow up on application status

Would you like me to help you find scholarships specific to your course, category, or state?`;
  }

  // Admission process guidance
  if (lowerMessage.includes('admission') || lowerMessage.includes('application') || lowerMessage.includes('entrance')) {
    return `Great question! The admission process can seem complex, but I'll break it down for you:

📝 **Common Admission Process**:

**Step 1: Research & Planning**
- Identify colleges and courses of interest
- Check eligibility criteria and cut-offs
- Note important dates and deadlines
- Understand fee structure and scholarships

**Step 2: Entrance Exams**
- Register for relevant entrance exams
- Prepare systematically with proper study plan
- Take mock tests and practice papers
- Appear for exams with confidence

**Step 3: Application Process**
- Fill online application forms carefully
- Upload required documents (photos, signatures, certificates)
- Pay application fees through secure portals
- Keep application receipts and confirmation numbers

**Step 4: Counseling & Selection**
- Participate in counseling process if applicable
- Choose colleges based on rank and preferences
- Complete document verification
- Confirm seat allocation and pay fees

🎯 **Important Documents Checklist**:
- Class 10th and 12th mark sheets and certificates
- Entrance exam scorecards
- Category certificates (if applicable)
- Income certificate for scholarships
- Migration certificate (for state changes)
- Character certificate from school
- Recent passport-size photographs

⏰ **Timeline Management**:
- Create a calendar with all important dates
- Set reminders for application deadlines
- Keep buffer time for document preparation
- Start early to avoid last-minute stress

${userContext ? `Based on your profile, ` : ''}Which specific admission process would you like me to explain in detail? I can guide you through:
- Engineering admissions (JEE/State CET)
- Medical admissions (NEET)
- Central University admissions (CUET)
- State university admissions
- Private college admissions`;
  }

  // General confusion or help
  if (lowerMessage.includes('confused') || lowerMessage.includes('help') || lowerMessage.includes('advice') || lowerMessage.includes('guidance')) {
    return `I completely understand! Choosing your academic and career path is one of life's biggest decisions, and it's natural to feel overwhelmed. You're definitely not alone in this journey! 🌟

🧭 **Let's Start with Self-Discovery**:

**Identify Your Interests**:
- What subjects make you excited to learn?
- What activities do you enjoy in your free time?
- What problems in the world do you want to solve?

**Recognize Your Strengths**:
- Which subjects come naturally to you?
- What skills do people often compliment you on?
- What achievements are you most proud of?

**Consider Your Values**:
- Do you prefer job security or entrepreneurial freedom?
- Is work-life balance important to you?
- Do you want to help people, create things, or analyze data?

📊 **Systematic Approach**:

1. **Take Assessments**: Our platform offers comprehensive career and personality assessments
2. **Research Thoroughly**: Explore different career paths and their requirements
3. **Talk to Professionals**: Connect with people working in fields you're interested in
4. **Try Before You Decide**: Look for internships, workshops, or online courses
5. **Seek Multiple Perspectives**: Talk to teachers, parents, and career counselors

🎯 **Remember These Key Points**:
- There's no single "perfect" career for anyone
- Most successful people change careers multiple times
- Skills can be learned and developed over time
- Passion often develops through mastery and success

${userContext ? `Given your background and interests, ` : ''}What would you like to explore first?
- Take our career assessment quiz?
- Learn about specific career paths?
- Understand college admission processes?
- Get study and exam preparation guidance?

I'm here to guide you step by step through this important decision-making process! 🚀`;
  }

  // Default comprehensive response
  return `Hello! I'm EduBot, your AI educational advisor, and I'm here to help you navigate your academic and career journey! 🎓

I can assist you with:

🎯 **Career Guidance**:
- Explore different career paths and opportunities
- Understand job market trends and salary expectations
- Match your interests and skills with suitable professions
- Get personalized career recommendations

🏛️ **College & Course Selection**:
- Find the right colleges based on your preferences
- Compare courses, fees, and placement records
- Understand admission processes and requirements
- Get scholarship and financial aid information

📚 **Academic Support**:
- Exam preparation strategies and study tips
- Subject-specific guidance and resources
- Time management and stress management techniques
- Mock test recommendations and analysis

💡 **Personalized Advice**:
- Based on your academic background and interests
- Considering your location and budget preferences
- Aligned with current market demands and trends
- Focused on your long-term career goals

**Popular Questions I Can Help With**:
- "What career options do I have after 12th Science/Commerce/Arts?"
- "Which colleges are best for [specific course] in [city/state]?"
- "How should I prepare for [specific entrance exam]?"
- "What scholarships am I eligible for?"
- "I'm confused about my career path, can you help?"

${userContext ? `Based on your profile, I can provide more personalized recommendations. ` : 'To get started, '}simply ask me anything about your educational or career concerns!

What would you like to explore today? 🚀`;
};

// @desc    Clear chat history
// @route   DELETE /api/chatbot/history/:sessionId
// @access  Private
export const clearChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?._id;

    await ChatMessage.deleteMany({
      sessionId,
      user: userId
    });

    res.status(200).json({
      success: true,
      message: 'Chat history cleared successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
