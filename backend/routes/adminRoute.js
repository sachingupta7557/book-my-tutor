import express from 'express'
import { addTutor , adminDashboard, allTutors, appointmentCancel, appointmentsAdmin, loginAdmin,allUsers,deleteUser, deleteTutor} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/tutorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-tutor',authAdmin,upload.single('image'),addTutor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-tutors',authAdmin,allTutors)
adminRouter.post('/change-availablity',authAdmin,changeAvailablity)
adminRouter.get('/bookings',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.get('/all-users', authAdmin, allUsers)

adminRouter.delete('/delete-user/:userId', authAdmin, deleteUser);

adminRouter.delete('/delete-tutor/:wonId', authAdmin, deleteTutor);

export default adminRouter;

