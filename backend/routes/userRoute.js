// import express from 'express'
// import { bookAppointment, cancelAppointment, getProfile, listBooking, loginUser, paymentRazorpay, registerUser,updateProfile, verifyRazorpay,forgotPassword,resetPassword } from '../controllers/userController.js'
// import authUser from '../middlewares/authUser.js'
// import upload from '../middlewares/multer.js'

// const userRouter = express.Router()

// userRouter.post('/register',registerUser)
// userRouter.post('/login',loginUser)

// userRouter.get('/get-profile',authUser,getProfile)
// userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
// userRouter.post('/book-appointment',authUser,bookAppointment)
// userRouter.get('/bookings',authUser,listBooking)
// userRouter.post('/cancel-appointment',authUser,cancelAppointment)
// userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
// userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
// userRouter.post('/forgot-password', forgotPassword)
// userRouter.post('/reset-password/:token', resetPassword)

import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listBooking, loginUser, paymentRazorpay, registerUser,updateProfile, verifyRazorpay,forgotPassword,resetPassword, userList } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/bookings',authUser,listBooking)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token', resetPassword)

userRouter.get('/list', userList);






export default userRouter

