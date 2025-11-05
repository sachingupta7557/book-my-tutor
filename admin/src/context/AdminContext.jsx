import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [tutors, setTutors] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const backendUrl = "https://book-my-tutor-2vfu.onrender.com"

  
  const authHeaders = {
    Authorization: `Bearer ${aToken}`,
  };

  const getAllTutors = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/all-tutors`, {}, { headers: authHeaders });
      if (data.success) {
        setTutors(data.tutors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, { headers: authHeaders });
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteUserById = async (userId) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
        headers: authHeaders,
      });
      if (res.data.success) {
        toast.success('User deleted successfully');
        getAllUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };
  
  const deleteTutorById = async (wonId) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/admin/delete-tutor/${wonId}`, {
        headers: authHeaders,
      });
      if (res.data.success) {
        toast.success('Tutor deleted successfully');
        getAllTutors();
      } else {
        toast.error('Failed to delete tutor');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting tutor");
    }
  };

  const changeAvailablity = async (wonId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/change-availablity`, { wonId }, { headers: authHeaders });
      if (data.success) {
        toast.success(data.message);
        getAllTutors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/bookings`, { headers: authHeaders });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: authHeaders });
      if (data.success) {
        toast.success(data.message);
        getAllBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: authHeaders });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken, setAToken,
    backendUrl, tutors, getAllTutors, changeAvailablity,
    bookings, setBookings, getAllBookings, cancelAppointment,
    dashData, getDashData,
    users, getAllUsers, deleteUserById,
    deleteTutorById
    

    

  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;






