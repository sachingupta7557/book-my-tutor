// import React, { useContext, useEffect } from 'react';
// import { TutorContext } from '../../context/TutorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets'


// const TutorAppointments = () => {
//   const { dToken, bookings, getBookings, completeAppointment, cancelAppointment } = useContext(TutorContext);

//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) {
//       getBookings()
//     }
//   }, [dToken]);
//   return (
//     <div className='w-full max-w-6xl m-5 '>
//       <p className='mb-3 text-lg font-medium'>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
//         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Student</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {
//           bookings.reverse().map((item, index) => (
//             <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//               <p className='max-sm:hidden'>{index + 1}</p>
//               <div className='flex items-center gap-2'>
//                 <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
//               </div>
//               <div>
//                 <p className='text-xs inline border border-primary px-2 rounded-full'>
//                   {item.payment ? 'Online' : 'CASH'}
//                 </p>
//               </div>
//               <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//               <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
//               <p>{currency} {item.amount}</p>
//               {
//                 item.cancelled
//                   ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                   : item.isCompleted
//                     ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
//                     : <div className='flex'>
//                       <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                       <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                     </div>

//               }
//               {/* <div className='flex'>
//                 <img onClick={()=>cancelAppointment(item._id)}className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                 <img onClick={()=>completeAppointment(item._id)}className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//               </div> */}

//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default TutorAppointments

import React, { useContext, useEffect } from 'react';
import { TutorContext } from '../../context/TutorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const TutorAppointments = () => {
  const { dToken, bookings, getBookings, completeAppointment, cancelAppointment } = useContext(TutorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getBookings();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">All Appointments</h2>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 bg-gray-100 text-gray-700 px-6 py-3 text-sm font-medium border-b">
          <p>#</p>
          <p>Student</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {bookings
          .slice() // clone the array
          .reverse()
          .map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center text-gray-600 px-6 py-4 border-b hover:bg-gray-50 transition"
            >
              <p className="hidden sm:block">{index + 1}</p>

              {/* Student Info */}
              <div className="flex items-center gap-3">
                <img src={item.userData.image} alt="" className="w-10 h-10 rounded-full object-cover border" />
                <p className="text-sm font-medium">{item.userData.name}</p>
              </div>

              {/* Payment Type */}
              <div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border 
                  ${item.payment ? 'text-green-600 border-green-200 bg-green-50' : 'text-yellow-600 border-yellow-200 bg-yellow-50'}`}>
                  {item.payment ? 'Online' : 'Cash'}
                </span>
              </div>

              {/* Age */}
              <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

              {/* Date and Time */}
              <p className="text-sm text-gray-700">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Fees */}
              <p className="font-medium">
                {currency} {item.amount}
              </p>

              {/* Status or Actions */}
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-600 text-xs font-semibold">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer hover:scale-105 transition"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer hover:scale-105 transition"
                    src={assets.tick_icon}
                    alt="Complete"
                    title="Mark as Completed"
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TutorAppointments;





