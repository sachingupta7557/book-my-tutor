import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedTutors from '../components/RelatedTutors';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Booking = () => {

  const {wonId} = useParams()
  const {tutors,currencySymbol,backendUrl,token,getTutorsData} = useContext(AppContext) 
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [wonInfo,setWonInfo] = useState(null)
  const [wonSlots,setWonSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')




  const fetchWonInfo = async () => {
    const wonInfo = tutors.find(won => won._id === wonId)
    setWonInfo(wonInfo)
    // console.log(docInfo)
  }

  const getAvailableSlots = async ()=>{
  setWonSlots([])

  // getting current date
  let today = new Date()

  for(let i=0 ; i<7 ; i++ ){

    //getting date with index 
    let currentDate = new Date(today)
    currentDate.setDate(today.getDate()+i)

    // seting end time of the date with index 
    let endTime = new Date()
    endTime.setDate(today.getDate() + i)
    endTime.setHours(21,0,0,0)

    // seting hours
    if(today.getDate() === currentDate.getDate()){
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10) 
      currentDate.setMinutes(currentDate.getMinutes() >30 ? 30 : 0)

    } else {
      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }

    let timeSlots = []
    while(currentDate < endTime) {
      let formattedTime = currentDate.toLocaleDateString([], { hour: '2-digit' , minute: '2-digit'})

      let day = currentDate.getDate()
      let month = currentDate.getMonth() + 1 
      let year = currentDate.getFullYear() 

      const slotDate = day + "_" + month + "_" + year
      const slotTime = formattedTime

      const isSlotAvailable = wonInfo.slots_booked[slotDate] && wonInfo.slots_booked[slotDate].includes(slotTime) ? false : true



      if(isSlotAvailable){
        //  add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
  

      }

 
      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    setWonSlots(prev => ([...prev , timeSlots]) )
  }
  }

  const bookAppointment = async () => {
  
          if (!token) {
              toast.warning('Login to book appointment')
              return navigate('/login')
          }
         try{
          const date = wonSlots[slotIndex][0].datetime
  
          let day = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
  
          const slotDate = day + "_" + month + "_" + year
  
          

               
  
              const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {  wonId, slotDate, slotTime }, { headers: { token } })
              if (data.success) {
                  toast.success(data.message)
                  getTutorsData()
                  navigate('/mybookings')
              } else {
                  toast.error(data.message)
              }
  
            }catch (error) {
              console.log(error)
              toast.error(error.message)
          }
  
      }

 
  

  useEffect(()=>{
   fetchWonInfo()
  },[tutors,wonId])

  useEffect(()=> {
  getAvailableSlots();
  },[wonInfo]) 

 

  useEffect(()=>{
    console.log(wonSlots)
  },[wonSlots])

  return wonInfo &&  (
    <div>

      {/* ---------TUTORS  Details------------- */}
      <div className = 'flex flex-col sm:flex-row gap-4'>
         <div>
          <img className = 'bg-primary w-full sm:max-w-72 rounded-lg' src={wonInfo.image} alt="" />
         </div>
         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ---------   Tut Info: name,degree,experience----------- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'> {wonInfo.name} <img className = 'w-5' src={assets.verified_icon} alt="" /></p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p> {wonInfo.degree} - {wonInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'> {wonInfo.experience}</button>
          </div>

          {/* -------Tutors About--------- */}

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{wonInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Booking fee: <span className='text-gray-600'> {currencySymbol}{wonInfo.fees}</span>
          </p>
         </div>
      </div>

      {/* ----- Booking Slots ------ */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p> Booking slots</p>
        <div className = 'flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            wonSlots.length && wonSlots.map((item,index) => (
              <div onClick = {() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{ item[0] && item[0].datetime.getDate()}</p>
                </div>
            ))
          }
        </div>
        <div className = 'flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {wonSlots.length && wonSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
               {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'> Book an appointment </button>

      </div>

      {/* Listing Realted Tutors */}

      <RelatedTutors wonId={wonId} speciality={wonInfo.speciality}/>
     
           
    </div>
  )
}
export default Booking; 

          // ------  BELOW CODE CHATGPT 10:55:36 WHEN I TOUCH THIS TIME THEN BELOW CODE COPY HERE FROM CHATGPT
          // ------  SO WHEN I GO IN WEBPAGE SO IN CONSOLE NO ERROR I MET THERE BUT I NOT USE THIS NOW
          //---------  ABOVE CODE RUN PROPERLY BUT I FOUND SOME ERROR BUT THIS ERROR NOT AFFECTED MY CODE 
          // ---------  SO DONT TOUCH ANYTHING 

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import RelatedTutors from '../components/RelatedTutors';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// export const Booking = () => {
//   const { wonId } = useParams();
//   const { tutors, currencySymbol, backendUrl, token, getTutorsData } = useContext(AppContext);
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//   const navigate = useNavigate();

//   const [wonInfo, setWonInfo] = useState(null);
//   const [wonSlots, setWonSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState('');

//   const fetchWonInfo = async () => {
//     const found = tutors.find(won => won._id === wonId);
//     if (found) {
//       setWonInfo(found);
//     }
//   };

//   const getAvailableSlots = async () => {
//     setWonSlots([]);

//     if (!wonInfo) return;

//     let today = new Date();

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0);

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = `${day}_${month}_${year}`;
//         const isSlotAvailable =
//           !wonInfo.slots_booked ||
//           !wonInfo.slots_booked[slotDate] ||
//           !wonInfo.slots_booked[slotDate].includes(formattedTime);

//         if (isSlotAvailable) {
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       setWonSlots(prev => [...prev, timeSlots]);
//     }
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warning('Login to book appointment');
//       return navigate('/login');
//     }

//     if (!slotTime) {
//       toast.warning('Please select a time slot');
//       return;
//     }

//     try {
//       const date = wonSlots[slotIndex][0].datetime;

//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();
//       const slotDate = `${day}_${month}_${year}`;

//       const { data } = await axios.post(
//         `${backendUrl}/api/user/book-appointment`,
//         { wonId, slotDate, slotTime },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getTutorsData();
//         navigate('/mybookings');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Fetch wonInfo
//   useEffect(() => {
//     const init = async () => {
//       await fetchWonInfo();
//     };
//     init();
//   }, [tutors, wonId]);

//   // Generate slots after wonInfo is set
//   useEffect(() => {
//     if (wonInfo) {
//       getAvailableSlots();
//     }
//   }, [wonInfo]);

//   return (
//     wonInfo && (
//       <div>
//         {/* Tutor Details */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={wonInfo.image} alt="" />
//           </div>
//           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {wonInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
//             </p>
//             <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//               <p>
//                 {wonInfo.degree} - {wonInfo.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">{wonInfo.experience}</button>
//             </div>
//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                 About <img src={assets.info_icon} alt="" />
//               </p>
//               <p className="text-sm text-gray-500 max-w-[700px] mt-1">{wonInfo.about}</p>
//             </div>
//             <p className="text-gray-500 font-medium mt-4">
//               Booking fee: <span className="text-gray-600">{currencySymbol}{wonInfo.fees}</span>
//             </p>
//           </div>
//         </div>

//         {/* Booking Slots */}
//         <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//           <p>Booking slots</p>
//           <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//             {wonSlots.length > 0 &&
//               wonSlots.map((item, index) => (
//                 <div
//                   onClick={() => setSlotIndex(index)}
//                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                     slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
//                   }`}
//                   key={index}
//                 >
//                   <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                   <p>{item[0] && item[0].datetime.getDate()}</p>
//                 </div>
//               ))}
//           </div>

//           <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//             {wonSlots.length > 0 &&
//               wonSlots[slotIndex]?.map((item, index) => (
//                 <p
//                   onClick={() => setSlotTime(item.time)}
//                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                     item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
//                   }`}
//                   key={index}
//                 >
//                   {item.time.toLowerCase()}
//                 </p>
//               ))}
//           </div>

//           <button
//             onClick={bookAppointment}
//             className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
//           >
//             Book an appointment
//           </button>
//         </div>

//         {/* Related Tutors */}
//         <RelatedTutors wonId={wonId} speciality={wonInfo.speciality} />
//       </div>
//     )
//   );
// };

// export default Booking;

