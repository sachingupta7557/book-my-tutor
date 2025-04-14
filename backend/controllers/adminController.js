import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import tutorModel from "../models/tutorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"


const addTutor = async (req, res) => {
   try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
      const imageFile = req.file;

     

      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
         return res.json({ success: false, message: "Missing Details" })

      }


      if (!validator.isEmail(email)) {
         return res.json({ success: false, message: "Please enter a valid email" })
      }




      if (password.length < 8) {
         return res.json({ success: false, message: "Please enter a strong password" })

      }






      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)




      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: ('image') })

      const imageUrl = imageUpload.secure_url

      const tutorData = {
         name,
         email,
         image: imageUrl,
         password: hashedPassword,
         speciality,
         degree,
         experience,
         about,
         fees,
         address: JSON.parse(address),
         
         date: Date.now()
      }

      const newTutor = new tutorModel(tutorData)
      await newTutor.save()

      res.json({ success: true, message: " Tutor Added" })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })

   }

}


const loginAdmin = async (req, res) => {
   try {

      const { email, password } = req.body

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

         const token = jwt.sign(email + password, process.env.JWT_SECRET)
         res.json({ success: true, token })


      } else {
         res.json({ success: false, message: "Invalid credentials" })
      }

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// API to get all tutors list for admin panel

const allTutors = async (req, res) => {
   try {

      const tutors = await tutorModel.find({}).select('-password')
      res.json({ success: true, tutors })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })

   }
}




const appointmentsAdmin = async (req, res) => {
   try {
      const bookings = await appointmentModel.find({})             
      res.json({ success: true, bookings })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })

   }
}

// API FOR APPOINTMENT CANCELLATION

const appointmentCancel = async (req, res) => {
   try {

     const { appointmentId } = req.body;
 
     const appointmentData = await appointmentModel.findById(appointmentId);
 
     if (!appointmentData) {
       return res.json({ success: false, message: 'Appointment not found' });
     }
 
 
 
     await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
 
     const { wonId, slotDate, slotTime } = appointmentData;
 
     const tutorData = await tutorModel.findById(wonId);
     let slots_booked = tutorData.slots_booked;
 
     if (slots_booked[slotDate]) {
       slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
       if (slots_booked[slotDate].length === 0) {
         delete slots_booked[slotDate];
       }
     }
 
     await tutorModel.findByIdAndUpdate(wonId, { slots_booked });
 
     res.json({ success: true, message: 'Appointment Cancelled' });
   } catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
   }
 }

 // API TO GET DASHBOARD DATA FOR ADMIN PANEL 
 const adminDashboard = async (req,res) => {
   try {

      const tutors = await tutorModel.find({})
      const users = await userModel.find({})
      const bookings = await appointmentModel.find({})

      const dashData = {
         tutors:tutors.length,
         bookings:bookings.length,
         students:users.length,
         latestBookings:bookings.reverse().slice(0,5)
      }

      res.json({success:true,dashData})
      
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });

      
   }
 }
export { addTutor, loginAdmin, allTutors, appointmentsAdmin,appointmentCancel,adminDashboard }

