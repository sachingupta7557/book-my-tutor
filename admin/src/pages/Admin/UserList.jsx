import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const UserList = () => {

  const { users, aToken, getAllUsers } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllUsers()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Users</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          users.map((user, index) => (
            <div className='border border-green-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <div className='bg-green-50 p-6 flex items-center justify-center group-hover:bg-green-100 transition-all duration-500'>
                <p className='text-4xl font-bold text-green-600'>
                  {user.name?.charAt(0).toUpperCase()}
                </p>
              </div>
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{user.name}</p>
                <p className='text-zinc-600 text-sm'>{user.email}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserList
