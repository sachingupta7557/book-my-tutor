import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Tutor = () => {

  const { speciality } = useParams()
  const [filterWon, setFilterWon] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const { tutors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterWon(tutors.filter(won => won.speciality === speciality))
    } else {
      setFilterWon(tutors)
    }
  }

  useEffect(() => {
    applyFilter()

  }, [tutors, speciality])


  return (
    <div>
      <p className='text-gray-600'>Browse through the tutors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Chemistry' ? navigate('/tutors') : navigate('/tutor/Chemistry')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Chemistry" ? "bg-indigo-100 text-black" : ""}`}>Chemistry</p>
          <p onClick={() => speciality === 'Dancing' ? navigate('/tutors') : navigate('/tutor/Dancing')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dancing" ? "bg-indigo-100 text-black" : ""}`}>Dancing</p>
          <p onClick={() => speciality === 'Python' ? navigate('/tutors') : navigate('/tutor/Python')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Python" ? "bg-indigo-100 text-black" : ""}`}>Python</p>
          <p onClick={() => speciality === 'Music' ? navigate('/tutors') : navigate('/tutor/Music')} className={`w-[94vw] sm:w-auto pl-3  py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Music" ? "bg-indigo-100 text-black" : ""}`}>Music</p>
          <p onClick={() => speciality === 'Maths' ? navigate('/tutors') : navigate('/tutor/Maths')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Maths" ? "bg-indigo-100 text-black" : ""}`}>Maths</p>
          <p onClick={() => speciality === 'Javascript' ? navigate('/tutors') : navigate('/tutor/Javascript')} className={`w-[94vw] sm:w-auto pl-3  py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Javascript" ? "bg-indigo-100 text-black" : ""}`}>Javascript</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterWon.map((item, index) => (

              <div onClick={() => navigate(`/booking/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                    <p className={`w-2 h-2 ${item.available ? ' bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>

                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>

            ))

          }
        </div>
      </div>
    </div>
  )
}
export default Tutor;


