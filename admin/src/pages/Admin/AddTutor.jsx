

import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddTutor = () => {
  const [wonImg, setWonImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('Chemistry')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!wonImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()
      formData.append('image', wonImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      // formData.append('fees', Number(fees))
      formData.append('fees', fees)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }))

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      })

      // const { data } = await axios.post(backendUrl + '/api/admin/add-tutor', formData, { headers: { aToken } })

      const {data} = await axios.post(
        `${backendUrl}/api/admin/add-tutor`,
         formData ,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message)
        setWonImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="px-4 py-6 md:px-10 lg:px-20 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Tutor</h2>

      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-6">
          <label htmlFor="won-img" className="cursor-pointer">
            <img
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
              src={wonImg ? URL.createObjectURL(wonImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e) => setWonImg(e.target.files[0])} type="file" id="won-img" hidden />
          <p className="text-gray-500">Upload tutor <br />picture</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700">
          
          <div className="space-y-4">
            <div>
              <p className="mb-1">Tutor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className="w-full border border-gray-300 rounded-xl px-4 py-2" type="text" placeholder="Name" required />
            </div>

            <div>
              <p className="mb-1">Tutor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border border-gray-300 rounded-xl px-4 py-2" type="email" placeholder="Email" required />
            </div>

            <div>
              <p className="mb-1">Tutor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full border border-gray-300 rounded-xl px-4 py-2" type="password" placeholder="Password" required />
            </div>

            <div>
              <p className="mb-1">Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full border border-gray-300 rounded-xl px-4 py-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="w-full border border-gray-300 rounded-xl px-4 py-2" type="number" placeholder="Fees" required />
            </div>
          </div>

          
          <div className="space-y-4">
            <div>
              <p className="mb-1">Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full border border-gray-300 rounded-xl px-4 py-2">
                <option value="Chemistry">Chemistry</option>
                <option value="Dancing">Dancing</option>
                <option value="Python">Python</option>
                <option value="Music">Music</option>
                <option value="Maths">Maths</option>
                <option value="Javascript">Javascript</option>
              </select>
            </div>

            <div>
              <p className="mb-1">Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className="w-full border border-gray-300 rounded-xl px-4 py-2" type="text" placeholder="Education" required />
            </div>

            <div>
              <p className="mb-1">Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" type="text" placeholder="Address line 1" required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="w-full border border-gray-300 rounded-xl px-4 py-2" type="text" placeholder="Address line 2" required />
            </div>
          </div>
        </div>

        
        <div>
          <p className="mb-2">About Tutor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full border border-gray-300 rounded-xl px-4 py-3" placeholder="Write about the tutor" rows={5} required />
        </div>

        
        <div className="pt-4">
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-full shadow hover:shadow-md transition-all duration-300">
            Add Tutor
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddTutor
