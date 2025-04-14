import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_imaage} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to BookMyTutor, your go-to platform for finding the best tutors to help you achieve academic success. We connect students with experienced tutors across various subjects, ensuring personalized learning tailored to your needs.</p>
          <p>At BookMyTutor, we are dedicated to making education more accessible and efficient. Whether you need help with school subjects, test preparation, or skill development, we provide a seamless experience to match you with the right tutor.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at BookMyTutor is to revolutionize learning by bridging the gap between students and expert tutors. We strive to create a platform where every student can receive quality education, anytime, anywhere.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EXPERT TUTORS:</b>
          <p>Connect with highly qualified tutors specializing in various subjects.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>FLEXIBLE SCHEDULING:</b>
          <p>Book tutoring sessions at your convenience with real-time availability.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZED LEARNING:</b>
          <p>Receive customized lesson plans and guidance based on your learning style.</p>
        </div>
      </div>
    </div>
  );
};

export default About;


