import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import logo1 from './logo (1).png'
import logo2 from './logo2.png'
import logo3 from './logo3.png'
import logo4 from './logo4.png'
import logo5 from './logo5.png'
import header from './header.jpg'
import header_img1 from './header_img1.png'
import groupprofile from './groupprofile.jpg'
import groupprofile1 from './groupprofile1.jpg'
import groupprofile2 from './groupprofile2.jpg'
import logo9 from './logo9.png'
import header_img3 from './header_img3.png'
import groupprofile5 from './groupprofile5.png'
import Chemistry from './Chemistry.jpg'
import Python from './Python.png'
import Music from './Music.jpg'
import Maths from './Maths.jpg'
import Javascript from './Javascript.jpg'
import Dancing from './Dancing.png'
import header_img10 from './header_img10.jpg'
import won8 from './won8.jpg'
import won9 from './won9.jpg'
import won10 from './won10.jpg'
import won11 from './won11.jpg'
import won13 from './won13.jpg'
import won12 from './won12.jpg'
import won15 from './won15.png'
import booking from './booking.png'
import booking_img from './booking_img.png'
import book_img from './book_img.png'
import booked_img from './booked_img.png'
import contact_img from './contact_img.jpg'
import about_imaage from './about_imaage.jpg'

export const assets = {
    appointment_img,
     booking,
     booking_img,
     book_img,
     booked_img,
    header_img,
    header,
    header_img1,
    header_img3,
    header_img10,
    group_profiles,
    groupprofile,
    groupprofile1,
    groupprofile2,
    groupprofile5,
    logo,
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo9,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    contact_img,
    about_image,
    about_imaage,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
   
    stripe_logo,
    razorpay_logo
}


export const specialityData = [
    {
        speciality: 'Chemistry',
        image: Chemistry
    },
    {
        speciality: 'Dancing',
        image: Dancing
    },
    {
        speciality: 'Python',
        image: Python
    },
    {
        speciality: 'Music',
        image: Music
    },
    {
        speciality: 'Maths',
        image: Maths
    },
    {
        speciality: 'Javascript',
        image: Javascript
    },
]
export const tutors = [
    {
        _id: 'won8',
        name: 'Arijit Singh',
        image: won8,
        speciality: 'Music',
        degree: 'Bachelor in Music',
        experience: ' 9 Years',
        about: 'Mr. Arijit Singh is a skilled pianist and music teacher who guides students in developing their musical talents, from reading notes to performing compositions.',
        fees: 500000,
        address: {
            line1: '8 Greenway Lane',
            line2: 'Cardiff, UK',
        }
    },
    {
        _id: 'won9',
        name: 'Prof.Yogesh',
        image: won9,
        speciality: 'Maths',
        degree: 'PhD in Mathematics',
        experience: '8 Years',
        about: 'Prof. Yogesh is a passionate math educator with years of experience in advanced calculus, algebra, and geometry. He believes in interactive teaching methods to make learning fun and engaging.',
        fees: 1500,
        address: {
            line1: '45 Oxford Street',
            line2: 'London, UK',
        }
    },
    {
        _id: 'won10',
        name: 'Code With Harry',
        image: won10,
        speciality: 'Python',
        degree: 'Phd in Python',
        experience: '6 Years',
        about: 'Mr. Harry is a coding expert specializing in Python. He helps students develop strong programming skills through hands-on projects.',
        fees: 5000,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'won11',
        name: 'Prabhu Deva',
        image: won11,
        speciality: 'Dancing',
        degree: 'Phd in Dancing',
        experience: '22 Years',
        about: 'Prabhu Deva  is an Indian dance choreographer, film director, producer and actor who has worked predominantly in Tamil, Hindi and Telugu language film',
        
        fees: 80000,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },

    {
        _id: 'won13',
        name: 'Mr. Michael Brown',
        image: won13,
        speciality: 'Chemistry',
        degree: 'MSc in Organic Chemistry',
        experience: '7 Years',
        about: 'Mr. Brown is an expert in organic and inorganic chemistry. His unique teaching style and practical experiments make chemistry enjoyable for students.',
        fees: 50,
        address: {
            line1: '78 Elm Street',
            line2: 'Birmingham, UK',
        }
    },

    {
        _id: 'won12',
        name: 'KushalSingh',
        image: won12,
        speciality: 'Javascript',
        degree: 'phd in Javascript',
        experience: '7 Years',
        about: 'Mr.Kushal has great knowledge in javascript and always supportive to solve problem',
        fees: 50,
        address: {
            line1: 'Navrangpura Street',
            line2: 'Birmingham, UK',
        }
    },
    {
        _id: 'won15',
        name: 'Prof.Williams',
        image: won15,
        speciality: 'Javascript',
        degree: 'phd in Javascript',
        experience: '7 Years',
        about: 'Prof.Williams has great knowledge in javascript and always supportive to solve problem',
        fees: 50,
        address: {
            line1: 'Navrangpura Street',
            line2: 'Birmingham, UK',
        }
    }

]