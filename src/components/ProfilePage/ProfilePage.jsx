import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import profileImg from '../../assets/profileImg.jpg'

const ProfilePage = () => {
    return (
        <div className='p-6 flex justify-between'>
            <div className='sidebar w-[250px]'>
                <Sidebar />
            </div>

            <div className='w-1/2'>
                <img src={profileImg} alt="" className='rounded-full' />
            </div>

            <div className='w-1/2'>
                zdc
            </div>
        </div>
    )
}

export default ProfilePage