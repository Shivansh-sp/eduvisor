import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Assessment, { Question } from '../models/Assessment';

const router = express.Router();

// Get assessment questions
router.get('/questions', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { category = 'aptitude' } = req.query;
    
    // Get questions based on category
    const questions = await Question.find({ category }).limit(20);
    
    res.json({
      questions: questions.map(q => ({
        id: q._id,
        question: q.question,
        type: q.type,
        options: q.options,
        category: q.category
      }))
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ message: 'Failed to get assessment questions' });
  }
});

// Submit assessment responses
router.post('/submit', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?._id;
    const { responses } = req.body;

    // Calculate scores based on responses
    const scores = calculateScores(responses);
    
    // Generate recommendations based on scores
    const recommendations = generateRecommendations(scores, req.user);

    // Create or update assessment
    const assessment = await Assessment.findOneAndUpdate(
      { userId },
      {
        responses,
        scores,
        recommendations,
        completedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Assessment submitted successfully',
      scores,
      recommendations,
      assessmentId: assessment._id
    });
  } catch (error) {
    console.error('Submit assessment error:', error);
    res.status(500).json({ message: 'Failed to submit assessment' });
  }
});

// Get user's assessment results
router.get('/results', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?._id;
    
    const assessment = await Assessment.findOne({ userId }).sort({ completedAt: -1 });
    
    if (!assessment) {
      return res.status(404).json({ message: 'No assessment found' });
    }

    res.json({
      scores: assessment.scores,
      recommendations: assessment.recommendations,
      completedAt: assessment.completedAt
    });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ message: 'Failed to get assessment results' });
  }
});

// Helper function to calculate scores
function calculateScores(responses: any[]): any {
  // This is a simplified scoring algorithm
  // In a real application, this would be much more sophisticated
  const scores = {
    logical: 0,
    verbal: 0,
    numerical: 0,
    spatial: 0,
    interpersonal: 0,
    intrapersonal: 0,
    creative: 0,
    analytical: 0
  };

  // Calculate scores based on response patterns
  responses.forEach(response => {
    // This is a placeholder - actual implementation would be more complex
    const answerValue = typeof response.answer === 'number' ? response.answer : 1;
    scores.logical += answerValue * 2;
    scores.verbal += answerValue * 1.5;
    scores.numerical += answerValue * 1.8;
    scores.spatial += answerValue * 1.2;
    scores.interpersonal += answerValue * 1.3;
    scores.intrapersonal += answerValue * 1.1;
    scores.creative += answerValue * 1.4;
    scores.analytical += answerValue * 1.6;
  });

  // Normalize scores to 0-100 range
  Object.keys(scores).forEach(key => {
    scores[key as keyof typeof scores] = Math.min(100, Math.max(0, scores[key as keyof typeof scores]));
  });

  return scores;
}

// Helper function to generate recommendations
function generateRecommendations(scores: any, user: any): any {
  const recommendations = {
    streams: [] as string[],
    careers: [] as string[],
    colleges: [] as string[],
    courses: [] as string[]
  };

  // Determine recommended streams based on scores
  if (scores.logical > 70 && scores.numerical > 70) {
    recommendations.streams.push('Science');
  }
  if (scores.verbal > 70 && scores.interpersonal > 70) {
    recommendations.streams.push('Commerce');
  }
  if (scores.creative > 70 && scores.spatial > 70) {
    recommendations.streams.push('Arts');
  }

  // Determine recommended careers
  if (scores.logical > 80) {
    recommendations.careers.push('Software Engineer', 'Data Scientist', 'Engineer');
  }
  if (scores.verbal > 80) {
    recommendations.careers.push('Journalist', 'Lawyer', 'Teacher');
  }
  if (scores.interpersonal > 80) {
    recommendations.careers.push('Sales Manager', 'HR Manager', 'Counselor');
  }

  return recommendations;
}

export default router;
