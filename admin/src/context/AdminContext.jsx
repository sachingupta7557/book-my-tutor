// import { createContext, useEffect, useState } from "react";
// import axios from 'axios'
// import { toast } from 'react-toastify'

// export const AdminContext = createContext()

// const AdminContextProvider = (props) => {

//     const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
//     const [tutors, setTutors] = useState([])



//     const [bookings, setBookings] = useState([])
//     const [dashData, setDashData] = useState(false)


//     const backendUrl = import.meta.env.VITE_BACKEND_URL


//     const getAllTutors = async () => {

//         try {

//             const { data } = await axios.post(backendUrl + '/api/admin/all-tutors', {}, { headers: { aToken } })

//             if (data.success) {
//                 setTutors(data.tutors)
//                 console.log(data.tutors);
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)

//         }

//     }

//     const changeAvailablity = async (wonId) => {

//         try {
//             const { data } = await axios.post(backendUrl + '/api/admin/change-availablity', { wonId }, { headers: { aToken } })

//             if (data.success) {
//                 toast.success(data.message)
//                 getAllTutors()

//             } else {
//                 toast.error(data.message)

//             }


//         } catch (error) {
//             toast.error(error.message)

//         }

//     }


//     const getAllBookings = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })
//             if (data.success) {
//                 setBookings(data.bookings)
//                 console.log(data.bookings)

//             } else {
//                 toast.error(data.message)
//             }


//         } catch (error) {
//             toast.error(error.message)

//         }
//     }

//     const cancelAppointment = async (appointmentId) => {

//         try {

//             const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
//             if (data.success) {
//                 toast.success(data.message)
//                 getAllBookings()

//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)

//         }

//     }

//     const getDashData = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })
//             if (data.success) {
//                 setDashData(data.dashData)
//                 console.log(data.dashData)

//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const value = {

//         aToken, setAToken,
//         backendUrl, tutors,
//         getAllTutors, changeAvailablity,
//         bookings, setBookings,
//         getAllBookings,
//         cancelAppointment,
//         dashData, getDashData
//     }

//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     )

// }
// export default AdminContextProvider


import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [tutors, setTutors] = useState([])
    const [users, setUsers] = useState([])



    const [bookings, setBookings] = useState([])
    const [dashData, setDashData] = useState(false)


    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const getAllTutors = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/all-tutors', {}, { headers: { aToken } })

            if (data.success) {
                setTutors(data.tutors)
                console.log(data.tutors);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }

    }

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-users', { headers: { aToken } })
            if (data.success) {
                setUsers(data.users)
                console.log(data.users)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailablity = async (wonId) => {

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availablity', { wonId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllTutors()

            } else {
                toast.error(data.message)

            }


        } catch (error) {
            toast.error(error.message)

        }

    }


    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })
            if (data.success) {
                setBookings(data.bookings)
                console.log(data.bookings)

            } else {
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)

        }
    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllBookings()

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }

    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {

        aToken, setAToken,
        backendUrl, tutors,
        getAllTutors, changeAvailablity,
        bookings, setBookings,
        getAllBookings,
        cancelAppointment,
        dashData, getDashData,
        users,getAllUsers 
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}
export default AdminContextProvider