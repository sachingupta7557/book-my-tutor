// import React from 'react'
// import Header from '../components/Header'

// const Header = () => {
//   return (
//     <div>
//         <Header/>
//     </div>
//   )
// }

// export default Header

import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
{/* 
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-12 lg:px-24 py-12 md:py-20">    */}
        {/* ------Left Side------- */}
        <div className='md:w-1/2 flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
             <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg-leading-tight'>
                Book Tutors <br/> With Trusted Tutors
             </p>
             <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className = 'w-28' src={assets.groupprofile2} alt=""/>
                <p> Simply browse through our extensive list of tutors, <br className='hidden sm:block'/> schedule your tutor hasle-free</p>
             </div>
             {/* <a href="" className = 'flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'> */}
             <a href="#speciality" 
                   className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm 
                   m-auto md:m-0 mt-4 md:mt-6 hover:scale-105 transition-all duration-300 w-full md:w-auto justify-center">
                Book tutor <img className ='w-3' src = {assets.arrow_icon} alt=""/>
             </a>
        </div>

 
 

        {/* ------Right Side-------- */}

        <div className ='md:w-1/2 relative'>
        {/* <div> */}

            {/* <img src={assets.header_img1} alt=""/> */}

            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img3} alt=""/>

        </div>
        
    </div>
  )
}

export default Header