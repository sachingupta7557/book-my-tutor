import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllBookings = () => {
  const { aToken, bookings, getAllBookings, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllBookings();
    }
  }, [aToken, getAllBookings]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Student</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Tutor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {bookings.map((item, index) => (
          <div
            key={item._id || index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full object-cover" src={item?.userData?.image || assets.default_user} alt="Student" />
              <p>{item?.userData?.name || 'Unknown'}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item?.userData?.dob) ?? 'N/A'}</p>

            <p>
              {slotDateFormat(item?.slotDate)}{item?.slotTime ? `, ${item.slotTime}` : ''}
            </p>

            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full bg-gray-200 object-cover" src={item?.wonData?.image || assets.default_user} alt="Tutor" />
              <p>{item?.wonData?.name || 'Unknown'}</p>
            </div>

            <p>{currency} {item?.amount ?? '0'}</p>

            {item?.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item?.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="Cancel"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
