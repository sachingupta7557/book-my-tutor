// import React, { useEffect, useState } from 'react'
// import { useContext } from 'react'
// import { TutorContext } from '../../context/TutorContext'
// import { AppContext } from '../../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const TutorProfile = () => {

//   const { dToken, profileData, setProfileData, getProfileData,backendUrl } = useContext(TutorContext)
//   const { currency } = useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false)

 

//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available
//       };
  
//       const { data } = await axios.put(
//         backendUrl + '/api/tutor/update-profile',
//         updateData,
//         { headers: { dToken } }
//       );
  
//       if (data.success) {
//         toast.success(data.message);
//         setIsEdit(false);
//         getProfileData(); // Refresh profile
//       } else {
//         toast.error(data.message);
//       }
  
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
//     }
//   };
  

//   useEffect(() => {

//     if (dToken) {
//       getProfileData()

//     }

//   }, [dToken])
//   return profileData && (
//     <div>
//       <div className='flex flex-col gap-4 m-5'>
//         <div>
//           <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
//         </div>
//         <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
//           {/* ------------   tut Info : name,degreee,experience ----------   */}

//           <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//           <div className='flex items-center gap-2 mt-1 text-gray-600'>
//             <p>{profileData.degree} - {profileData.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//           </div>
//           {/* ------------- tut about----------------- */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About:</p>
//             <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//               {profileData.about}
//             </p>
//           </div>
//           <p className='text-gray-600 font-medium mt-4'>
//             Booking fees: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
//           </p>

//           <div className='flex gap-2 py-2'>
//             <p>Address:</p>
//             <p className='text-sm'>
//               {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
//               <br />
//               {/* {profileData.address.line2} */}
//               {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
//             </p>
//           </div>

//           <div className='flex gap-1 pt-2'>
//             <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" name="" id="" />
//             <label htmlFor="">Available</label>
//           </div>

//           {
//             isEdit
//               ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
//               : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
//           }

//         </div>
//       </div>
//     </div>
//   )
// }

// export default TutorProfile

import React, { useEffect, useState, useContext } from 'react';
import { TutorContext } from '../../context/TutorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const TutorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(TutorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.put(
        backendUrl + '/api/tutor/update-profile',
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              className="rounded-xl w-full max-w-xs border border-gray-300 shadow-md object-cover"
              src={profileData.image}
              alt="Tutor"
            />
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{profileData.degree} - {profileData.speciality}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                {profileData.experience} Experience
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 text-sm">About</h3>
              <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Booking Fees:{' '}
                <span className="text-gray-900">
                  {currency}{' '}
                  {isEdit ? (
                    <input
                      type="number"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                      }
                      className="ml-1 px-2 py-1 border rounded-md w-24 text-sm"
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>

              <div className="text-sm text-gray-700">
                <p className="font-medium">Address:</p>
                <div className="space-y-1 mt-1">
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        value={profileData.address.line1}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1 border rounded-md text-sm"
                      />
                      <input
                        type="text"
                        value={profileData.address.line2}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1 border rounded-md text-sm"
                      />
                    </>
                  ) : (
                    <>
                      <p>{profileData.address.line1}</p>
                      <p>{profileData.address.line2}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  checked={profileData.available}
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  className="accent-indigo-600"
                />
                <label className="text-sm text-gray-700">Available</label>
              </div>
            </div>

            <div>
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="mt-4 px-5 py-2 border border-indigo-600 text-indigo-600 rounded-md text-sm hover:bg-indigo-50 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TutorProfile;
