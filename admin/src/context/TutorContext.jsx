import { useState, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'; 

export const TutorContext = createContext();

const TutorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [bookings, setBookings] = useState([]);
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)

    const getBookings = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/tutor/bookings`, {
                headers: {
                    dtoken: dToken
                }
            });

            if (data.success) {
                setBookings(data.bookings);
                console.log(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch bookings");
        }
    };

   

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/tutor/complete-appointment`,
                { appointmentId }, // body
                {
                    headers: {
                        dtoken: dToken
                    }
                }
            );
            if (data.success) {
                toast.success(data.message);
                getBookings();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to complete appointment");
        }
    };

  
    

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/tutor/cancel-appointment`,
                { appointmentId }, 
                {
                    headers: {
                        dtoken: dToken
                    }
                }
            );
            if (data.success) {
                toast.success(data.message);
                getBookings();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel appointment");
        }
    };

    const getDashData = async () => {

        try {

            const {data} = await axios.get(backendUrl + '/api/tutor/dashboard',{headers:{dToken}})
            if (data.success) {

                setDashData(data.dashData)
                console.log(data.dashData)
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {

            console.error(error);
            toast.error("Failed to cancel appointment");
            
        }
    }

    const getProfileData = async() =>{
        try {

            const {data} = await axios.get(backendUrl + '/api/tutor/profile',{headers:{dToken}})
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
                
            }
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel appointment");
        }
    }
    
    

    return (
        <TutorContext.Provider value={{ dToken, setDToken, backendUrl, bookings, setBookings, getBookings,cancelAppointment,dashData,
            setDashData,getDashData,profileData,setProfileData,getProfileData,completeAppointment
         }}>
            {children}
        </TutorContext.Provider>
    );
};

export default TutorContextProvider;


