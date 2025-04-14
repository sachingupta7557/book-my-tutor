

import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import tutorModel from '../models/tutorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import nodemailer from 'nodemailer'
import crypto from 'crypto'




// API to register user
const registerUser = async (req, res) => {

  try {
    const { name, email, password } = req.body

    if (!name || !password || !email) {

      return res.json({ success: false, message: "Missing Details" })

    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" })


    }

    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" })
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword
    }

    const newUser = new userModel(userData)

    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })





  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }
}

// API for user login 
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' })

    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })

    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // <-- fixed
    const userData = await userModel.findById(userId).select('-password');
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    const userId = req.userId; // ✅ Get from auth middleware

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    let updateData = {
      name,
      phone,
      dob,
      gender,
    };

    if (address) {
      try {
        updateData.address = typeof address === 'string' ? JSON.parse(address) : address;
      } catch (err) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const bookAppointment = async (req, res) => {
  try {
    const { wonId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    const wonData = await tutorModel.findById(wonId).select("-password");

    if (!wonData.available) {
      return res.json({ success: false, message: 'Tutor Not Available' });
    }

    let slots_booked = wonData.slots_booked;

    // Check for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot Not Available' });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");
    delete wonData.slots_booked;

    const appointmentData = {
      userId,
      wonId,
      userData,
      wonData,
      amount: wonData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save updated slot info
    await tutorModel.findByIdAndUpdate(wonId, { slots_booked });

    res.json({ success: true, message: 'Appointment Booked' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to get user appointments for frontend mybookings page

const listBooking = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Use the one from auth middleware

    const bookings = await appointmentModel.find({ userId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}



const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {

  try {

    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment Cancelled or not found" })

    }

    //  creating options for razorpay payment

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    }

    // creation of an order 
    const order = await razorpayInstance.orders.create(options)

    res.json({ success: true, order })


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }

}

// API TO VERIFY PAYMENT OF RAZORPAY

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)


    // console.log(orderInfo)
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      res.json({ success: true, message: "Payment Successfull" })


    } else {
      res.json({ success: false, message: "Payment Failed" })

    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }
} 

// api for forget password


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your preferred email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`


    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset - BookMyTutor",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    res.json({ success: true, message: "Reset link sent to your email" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api for reset password

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "Password should be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listBooking, cancelAppointment, paymentRazorpay, verifyRazorpay,forgotPassword,resetPassword}


