// import React, { useContext, useEffect } from 'react'
// import { TutorContext } from '../../context/TutorContext'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'

// const TutorDashboard = () => {

//   const { dToken, dashData, setDashData, getDashData,completeAppointment,cancelAppointment } = useContext(TutorContext)
//   const {currency,slotDateFormat} = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) {
//       getDashData()

//     }
//   }, [dToken])
//   return dashData && (
//     <div className='m-5'>

//       <div className='flex flex-wrap gap-3'>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.earning_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
//             <p className='text-gray-400'>Earnings</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.bookings}</p>
//             <p className='text-gray-400'>Bookings</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.students}</p>
//             <p className='text-gray-400'>Students</p>
//           </div>
//         </div>
//       </div>

//        <div className='bg-white'>
//               <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//                 <img src={assets.list_icon} alt="" />
//                 <p className='font-semibold'>Latest Bookings</p>
//               </div>
      
//               <div className='pt-4 border border-t-0'>
//                  {dashData.latestBookings.slice(0, 5).map((item, index) => (
//                             <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//                               <img className='rounded-full w-10' src={item.userData.image} alt="" />
//                               <div className='flex-1 text-sm'>
//                                 <p className='text-gray-800 font-medium'>{item.userData.name}</p>
//                                 <p className='text-gray-600 '> {slotDateFormat(item.slotDate)}</p>
//                               </div>
//                               {/* {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />} */}
//                            {/* {
//                                       item.cancelled
//                                       ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                                     :  <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                                      }  */}

//                                      {
//                                                      item.cancelled
//                                                        ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                                                        : item.isCompleted
//                                                          ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
//                                                          : <div className='flex'>
//                                                            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                                                            <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                                                          </div>
                                     
//                                                    }
//                             </div>
      
      
//                           ))}
      
//               </div>
//             </div>



//     </div>
//   )
// }

// export default TutorDashboard

import React, { useContext, useEffect } from 'react';
import { TutorContext } from '../../context/TutorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const TutorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } = useContext(TutorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]">
            <img className="w-14" src={assets.earning_icon} alt="Earnings" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">{currency} {dashData.earnings}</p>
              <p className="text-sm text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]">
            <img className="w-14" src={assets.appointments_icon} alt="Bookings" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">{dashData.bookings}</p>
              <p className="text-sm text-gray-400">Bookings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]">
            <img className="w-14" src={assets.patients_icon} alt="Students" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">{dashData.students}</p>
              <p className="text-sm text-gray-400">Students</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-50">
            <img className="w-5 h-5" src={assets.list_icon} alt="List Icon" />
            <p className="text-lg font-medium text-gray-700">Latest Bookings</p>
          </div>

          <div>
            {dashData.latestBookings.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 border-b last:border-0">
                <img className="w-10 h-10 rounded-full object-cover border" src={item.userData.image} alt="Student" />

                <div className="flex-1 text-sm">
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                  <p className="text-gray-500 text-xs">{slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-xs font-semibold">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
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
      </div>
    )
  );
};

export default TutorDashboard;
