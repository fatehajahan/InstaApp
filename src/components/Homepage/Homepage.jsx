import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Post from '../Post/Post'
import Feed from '../Feed/Feed'
import Profile from '../Profile/Profile'
import SuggestedUser from '../SuggestedUser/SuggestedUser'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FriendRequest from '../FriendRequest/FriendRequest'
import Friends from '../Friends/Friends'

const Homepage = () => {
    const data = useSelector((state) => state.userDetails.userInfo)
    console.log(data);
    const navigate = useNavigate()
    useEffect(() => {
        if (!data) {
            navigate('/login')
        }
    })
    return (
        <div>
            <div className='p-6'>
                <div className='md:flex justify-between gap-x-8'>
                    <div className='md:w-1/5'>
                        <Sidebar />
                    </div>

                    <div className='md:w-1/2'>
                        <Post />
                        <Feed />
                    </div>

                    <div className='md:w-1/3'>
                        <div className='md:block hidden'>
                            <Profile />
                        </div>
                        <SuggestedUser />
                        <FriendRequest />
                        <Friends />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage