import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className = 'md:max-10'>
        <div className = 'flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* -----Left Section------ */}

            <div >
                <img className='mb-5 w-40' src={assets.logo9} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'> Whether you're a student seeking guidance or a tutor looking to share your knowledge, BookMyTutor provides the tools you need to succeed. Book sessions, manage your profile, and grow with a community that values learning.
                Trusted by hundreds of students and tutors across the country, BookMyTutor ensures safe, convenient, and effective one-on-one learning experiences. Your growth is our priority.</p>
            </div>

            {/* -----Center Section------ */}

            <div>
                <p className = 'text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* -----Right Section------ */}

            <div>
                <p className = 'text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600' >
                    <li>+1-222-3445-56677</li>
                    <li>abc@gmail.com</li>
                </ul>
                
            </div>

        </div>

        {/* ---------- Copyright Text ------------ */}

        <div>
           <hr/>
           <p className = 'py-5 text-sm text-center'>Copyright 2090@ BookMyTutor - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer