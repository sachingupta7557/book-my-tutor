import tutorModel from "../models/tutorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import crypto from 'crypto';
import nodemailer from 'nodemailer';


const changeAvailablity = async (req, res) => {
    try {

        const { wonId } = req.body

        const wonData = await tutorModel.findById(wonId)
        await tutorModel.findByIdAndUpdate(wonId, { available: !wonData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

const tutorList = async (req, res) => {
    try {
        const tutors = await tutorModel.find({}).select(['-password', '-email'])

        res.json({ success: true, tutors })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })


    }
}



const loginTutor = async (req, res) => {
    try {

        const { email, password } = req.body
        const tutor = await tutorModel.findOne({ email })

        if (!tutor) {
            return res.json({ success: false, message: 'Invalid credentials' })

        }

        const isMatch = await bcrypt.compare(password, tutor.password)

        if (isMatch) {

            const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: 'Invalid credentials' })

        }

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}



const appointmentsTutor = async (req, res) => {
    try {
        const wonId = req.wonId;

        const bookings = await appointmentModel.find({ wonId });

        res.json({ success: true, bookings });
    } catch (error) {
        console.log("Appointment Error:", error);
        res.json({ success: false, message: error.message });
    }
};


const appointmentComplete = async (req, res) => {
  try {
    const wonId = req.wonId; 
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.wonId === wonId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: 'Appointment Completed' });
    } else {
      return res.json({ success: false, message: 'Unauthorized or invalid appointment' });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

  



const appointmentCancel = async (req, res) => {
    try {
      const wonId = req.wonId; 
      const { appointmentId } = req.body;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (appointmentData && appointmentData.wonId === wonId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true});    
        return res.json({ success: true, message: 'Appointment Cancelled' });
      } else {
        return res.json({ success: false, message: 'Unauthorized or invalid appointment' });
      }
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

 

  const tutorDashboard = async (req, res) => {
    try {
      const wonId = req.wonId; 
  
      const bookings = await appointmentModel.find({ wonId });
  
      let earnings = 0;
      const students = new Set(); 
  
      bookings.forEach((item) => {
        if (item.isCompleted && item.payment) {
          earnings += item.amount;
        }
        students.add(item.userId.toString()); 
      });
  
      const dashData = {
        earnings,
        bookings: bookings.length,
        students: students.size,
        latestBookings: bookings.slice().reverse().slice(0, 5), 
      };
  
      res.json({ success: true, dashData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  

  const tutorProfile = async (req, res) => {
    try {
      const wonId = req.wonId;
  
      const profileData = await tutorModel.findById(wonId).select('-password');
  
      if (!profileData) {
        return res.json({ success: false, message: 'Tutor not found' });
      }
  
      res.json({ success: true, profileData });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

  

  const updateTutorProfile = async (req, res) => {
    try {
      const wonId = req.wonId; 
      const { fees, address, available } = req.body;
  
     
      const tutor = await tutorModel.findById(wonId);
      if (!tutor) {
        return res.json({ success: false, message: 'Tutor not found' });
      }
  
      
      await tutorModel.findByIdAndUpdate(wonId, {
        fees,
        address,
        available
      });
  
      res.json({ success: true, message: 'Profile Updated' });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

   

// const forgotPasswordTutor = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const tutor = await tutorModel.findOne({ email });
//     if (!tutor) return res.json({ success: false, message: 'Tutor not found' });

   
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     tutor.resetToken = resetToken;
//     tutor.resetTokenExpiry = Date.now() + 3600000;  
//     await tutor.save();

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const resetLink = `${process.env.FRONTEND_URL2}/reset-password-tutor/${resetToken}`;

    
//     await transporter.sendMail({
//       to: tutor.email,
//       subject: 'Tutor Password Reset - BookMyTutor',
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your tutor account password. Valid for 1 hour.</p>`,
//     });

//     res.json({ success: true, message: 'Reset link sent to email' });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// const resetPasswordTutor = async (req, res) => {
//   try {
//     const { token } = req.params;  
//     const { newPassword } = req.body; 

    
//     const tutor = await tutorModel.findOne({
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() },  
//     });

//     if (!tutor) return res.json({ success: false, message: 'Invalid or expired token' });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     tutor.password = hashed;
//     tutor.resetToken = undefined;  
//     tutor.resetTokenExpiry = undefined;  
//     await tutor.save();

//     res.json({ success: true, message: 'Password reset successful' });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

 const forgotPasswordTutor = async (req, res) => {
  try {
    const { email } = req.body
    const tutor = await tutorModel.findOne({ email })

    if (!tutor) return res.status(404).json({ message: 'Tutor not found' })

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    tutor.resetToken = hashedToken
    tutor.resetTokenExpiry = Date.now() + 15 * 60 * 1000 // 15 mins
    await tutor.save()

    const resetURL = `${process.env.FRONTEND_URL2}/reset-password-tutor/${resetToken}`
    const message = `Reset your password using this link:\n\n${resetURL}\n\nThis link is valid for 15 minutes.`

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: `"BookMyTutor" <${process.env.EMAIL_USER}>`,
      to: tutor.email,
      subject: 'Reset Password - BookMyTutor',
      text: message
    })

    res.status(200).json({ message: 'Reset link sent to email' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

 const resetPasswordTutor = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const tutor = await tutorModel.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }
    })

    if (!tutor) return res.status(400).json({ message: 'Token is invalid or expired' })

    tutor.password = password
    tutor.resetToken = undefined
    tutor.resetTokenExpiry = undefined
    await tutor.save()

    res.status(200).json({ message: 'Password has been reset successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}



  
  
export { changeAvailablity, tutorList, loginTutor, appointmentsTutor,appointmentCancel,appointmentComplete,tutorDashboard,
  tutorProfile,updateTutorProfile,forgotPasswordTutor,resetPasswordTutor
 }