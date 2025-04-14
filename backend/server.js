import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import tutorRouter from './routes/tutorRoute.js'
import userRouter from './routes/userRoute.js'
// import path from 'path'


// app config
const app = express()
const port = process.env.PORT || 4000 
connectDB()
connectCloudinary()

// middlewares 
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({ extended: true }));

// api endpoints 
app.use('/api/admin',adminRouter)
app.use('/api/tutor',tutorRouter)
app.use('/api/user',userRouter)

// localhost:4000/api/admin/add-tutor

app.get('/' , (req,res)=>{
    res.send('API WORKING START ok ok')

})

app.listen(port, ()=> console.log("Server Started",port))