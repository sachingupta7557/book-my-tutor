import express from 'express';
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsTutor,
  loginTutor,
  tutorDashboard,
  tutorList,
  tutorProfile,
  updateTutorProfile,
  forgotPasswordTutor,
  resetPasswordTutor,
} from '../controllers/tutorController.js';
import authTutor from '../middlewares/authTutor.js';

const tutorRouter = express.Router();

tutorRouter.get('/list', tutorList);
tutorRouter.post('/login', loginTutor);

tutorRouter.get('/bookings', authTutor, appointmentsTutor);
tutorRouter.post('/complete-appointment', authTutor, appointmentComplete);
tutorRouter.post('/cancel-appointment', authTutor, appointmentCancel);

tutorRouter.get('/dashboard', authTutor, tutorDashboard);
tutorRouter.get('/profile', authTutor, tutorProfile);
tutorRouter.put('/update-profile', authTutor, updateTutorProfile);

tutorRouter.post('/forgot-password', forgotPasswordTutor);
tutorRouter.post('/reset-password/:token', resetPasswordTutor);

export default tutorRouter;



