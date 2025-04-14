// -----------------   IMPORTANT NOTE ---------------------- //

// ABHI YEH JO MEIN BANA RAHA HUN MyBookings page isme abhi toh normal page jo hard coded bana raha hun( 01 April 2025 --> 2:50 P:M ) par
// ek baar backend tyar ho jaye toh ache yeh page work karne lagega. 

//    TIME DURATION  04:04:00 TO 04:18:00 

// import React, { useContext, useEffect, useState } from 'react'
// import {AppContext} from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const MyBookings = () => {

//   // const {tutors} = useContext(AppContext)
//   const {backendUrl , token} = useContext(AppContext)   // NEW

//   const[bookings,setBookings] = useState([])    //NEW
//   const months = ["","Jan", "Feb", "Mar", "Apr" , "May", "Jun","Jul", "Aug", "Sep","Oct","Nov","Dec"]
//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split('_')
//     return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//   }
//   const getUserBookings = async()=>{                                 // NEW
//     try {
//       const {data} = await axios.get(backendUrl + '/api/user/bookings',{headers:{token}})

//       if(data.success){
//         setBookings(data.bookings.reverse())
//         console.log(data.bookings);

//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)

//     }
//   }

//   // Function to cancel appointment Using API

//    const cancelAppointment = async (appointmentId) => {

//           try {

//               const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

//               if (data.success) {
//                   toast.success(data.message)
//                   getUserBookings()
//               } else {
//                   toast.error(data.message)
//               }

//           } catch (error) {
//               console.log(error)
//               toast.error(error.message)
//           }

//       }

//   useEffect(()=>{            //NEW
//      if(token) {
//       getUserBookings()
//      }  
//   },[token])


//   return (
//     <div>
//       <p className = 'pb-3 mt-12 font-medium text-zinc-700 border-b'>My Bookings </p>
//       <div>
//         {/* {tutors.slice(0,3).map((item,index)=>( */}
//           {bookings.map((item,index)=>(       //NEW
//           <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}> 
//           <div>
//             {/* <img className='w-32 bg-indigo-50' src={item.image} alt="" /> */}
//             <img className='w-32 bg-indigo-50' src={item.wonData.image} alt="" />           
//           </div>
//           <div className='flex-1 text-sm text-zinc-600'>
//             {/* <p className='text-neutral-800 font-semibold'>{item.name}</p> */}
//             <p className='text-neutral-800 font-semibold'>{item.wonData.name}</p>
//             {/* <p>{item.speciality}</p> */}
//             <p>{item.wonData.speciality}</p>
//             <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//             {/* <p className='text-xs'>{item.address.line1}</p> */}
//             <p className='text-xs'>{item.wonData.address.line1}</p>
//             {/* <p className='text-xs'>{item.address.line2}</p> */}
//             <p className='text-xs'>{item.wonData.address.line2}</p>
//             {/* <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 01,April,2025 | 8:30 PM</p> */}
//             <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
//           </div>
//           <div></div>    
//           <div className='flex flex-col gap-2 justify-end'>
//             <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
//             <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel booking</button>
//             {/* {item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel booking</button>} */}
//           </div>


//           </div>
//         ))}
//       </div>




//     </div>
//   )
// }

// export default MyBookings 

// ---------   UPDATED VERSION BELOW CODE WITH PROPER WORKING ---------------------  //

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {
  const { backendUrl, token, getTutorsData } = useContext(AppContext)

  const [bookings, setBookings] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  const navigate = useNavigate()

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } })
      if (data.success) {
        setBookings(data.bookings.reverse())
        console.log(data.bookings)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserBookings()
        getTutorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserBookings()
            navigate('/mybookings')


          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)

        }

      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {

    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        // console.log(data.order)
        initPay(data.order)

      }
    } catch (error) {

    }

  }

  useEffect(() => {
    if (token) getUserBookings()
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Bookings</p>
      <div>
        {bookings.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img
                className='w-32 bg-indigo-50'
                src={item.wonData.image || '/default-avatar.png'}
                alt='Tutor'
              />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.wonData.name}</p>
              <p>{item.wonData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.wonData.address?.line1 || 'N/A'}</p>
              <p className='text-xs'>{item.wonData.address?.line2 || ''}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{' '}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* <div className='flex flex-col gap-2 justify-end'>

              {item.cancelled ? (<span className='text-sm text-red-500 text-center'> Appointment Cancelled</span>)
                : (
                  <>

                    {item.payment && (<button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-green-100 cursor-not-allowed'>Paid</button>)}


                    {!item.payment && (<button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'> Pay Online </button>
                    )}

                    <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'> Cancel booking</button>
                  </>
                )}


            </div> */}

            <div className='flex flex-col gap-2 justify-end'>

              {item.cancelled ? (
                <span className='text-sm text-red-500 text-center'>Appointment Cancelled</span>
              ) : item.isCompleted ? (
                <span className='text-sm text-green-600 text-center'>Appointment Completed</span>
              ) : (
                <>
                  {item.payment ? (
                    <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-green-100 cursor-not-allowed'>
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                    >
                      Pay Online
                    </button>
                  )}

                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                  >
                    Cancel Booking
                  </button>
                </>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
