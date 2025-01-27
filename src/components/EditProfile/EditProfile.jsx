import React from 'react'
import profileImg from '../../assets/profileImg.jpg'

const EditProfile = () => {
  return (
    <div className='p-10'>
      <div className="profileImage">
        <img src={profileImg} alt="" className='rounded-full cursor-pointer' />
      </div>

      <div className="name">
        <label htmlFor="" className='mr-[98px]'>Name: </label>
        <input type="text"  className='font-Pacifico py-[10px] px-[10px] border border-[#8c8c8c] mt-[20px] w-[600px] rounded-md'/>
      </div>

      <div className="email">
        <label htmlFor="" className='mr-[100px]'>Email: </label>
        <input type="email"  className='font-Pacifico py-[10px] px-[10px] border border-[#8c8c8c] mt-[20px] w-[600px] rounded-md'/>
      </div>

      <div className="password">
        <label htmlFor="" className='mr-[75px]'>Password: </label>
        <input type="text"  className='font-Pacifico py-[10px] px-[10px] border border-[#8c8c8c] mt-[20px] w-[600px] rounded-md'/>
      </div>

      <div className=''>
        <p>Submit</p>
      </div>
    </div>
  )
}

export default EditProfile