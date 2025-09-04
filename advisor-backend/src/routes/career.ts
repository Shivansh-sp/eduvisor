import express from 'express';
import { 
  getCareers, 
  getCareer, 
  getCareersByCourse, 
  getCareerMappingData,
  createCareer, 
  updateCareer, 
  deleteCareer 
} from '../controllers/careerController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getCareers);
router.get('/mapping/data', getCareerMappingData);
router.get('/course/:courseId', getCareersByCourse);
router.get('/:id', getCareer);

// Protected routes (Admin only)
router.post('/', authenticateToken, createCareer);
router.put('/:id', authenticateToken, updateCareer);
router.delete('/:id', authenticateToken, deleteCareer);

export default router;