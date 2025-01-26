import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';
import { CiCirclePlus, CiLogout } from 'react-icons/ci';
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { MdOutlineExplore, MdOutlineSlowMotionVideo } from "react-icons/md";
import { PiMessengerLogo } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Sidebar = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const data = useSelector((selector) => selector.userDetails.userInfo)
    const db = getDatabase()
    const [notification, setNotification] = useState(true)

    const [sentFollowRequest, setSentFollowRequest] = useState([])
    useEffect(() => {
        const sentFollowRequestRef = ref(db, 'sentfollow/');
        onValue(sentFollowRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().receiverid) {
                    arr.push({ ...item.val(), userid: item.key })
                }
            })
            setSentFollowRequest(arr)
        })
    }, [])
    useEffect(() => {
        localStorage.setItem('notification', JSON.stringify(notification))
    })

    const handleLogOut = () => {
        signOut(auth).then(() => {
            setTimeout(() => {
                toast.success("Logged out Sucessfully!!")
                navigate('/')
            }, 2000);
            alert('Sure to sign out??');
        })
    }

    return (
        <div className='px-[40px] h-screen'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="leftCornLogo">
                <p className='font-Pacifico text-[25px]'>InstaApp</p>
            </div>

            <div className="sideOptions flex flex-col justify-between h-full pt-[38px]">
                <div className='flex flex-col gap-y-[40px]'>
                    <Link to='/homepage'>
                        <div className="home flex items-center gap-x-[20px] cursor-pointer">
                            <AiFillHome className='text-[29px] ' />
                            <p className='text-[18px] font-bold font-roboto'>Home</p>
                        </div>
                    </Link>

                    <div className="search flex items-center gap-x-[20px] cursor-pointer">
                        <FaSearch className='text-[29px]' />
                        <p className='text-[18px] font-bold font-roboto'>Search</p>
                    </div>

                    <div className="explore flex items-center gap-x-[20px] cursor-pointer">
                        <MdOutlineExplore className='text-[29px] ' />
                        <p className='text-[18px] font-bold font-roboto'>Explore</p>
                    </div>

                    <div className="reels flex items-center gap-x-[20px] cursor-pointer">
                        <MdOutlineSlowMotionVideo className='text-[29px] ' />
                        <p className='text-[18px] font-bold font-roboto'>Reels</p>
                    </div>

                    <Link to='/message'>
                        <div className="msg flex items-center gap-x-[20px] cursor-pointer">
                            <PiMessengerLogo className='text-[29px] ' />
                            <p className='text-[18px] font-bold font-roboto'>Messages</p>
                        </div>
                    </Link>

                    <div className="noti flex items-center gap-x-[20px] cursor-pointer">
                        <div className='relative'>
                            <FaRegHeart className='text-[29px] ' />
                            {
                                notification &&
                                    sentFollowRequest.length > 0 ? <div onClick={() => setNotification(false)} className='bg-red-600 w-[10px] h-[10px] rounded-full absolute top-0 right-0'></div> : <div></div>
                            }
                            {/* <div className='bg-red-600 w-[10px] h-[10px] rounded-full absolute top-0 right-0'></div> */}
                        </div>
                        <p className='text-[18px] font-bold font-roboto'>Notification</p>
                    </div>

                    <div className="create flex items-center gap-x-[20px] cursor-pointer">
                        <CiCirclePlus className='text-[29px] ' />
                        <p className='text-[18px] font-bold font-roboto'>Create</p>
                    </div>

                    <Link to="/profilepage" className="profile flex items-center gap-x-[20px] cursor-pointer">
                        <CgProfile className='text-[29px] ' />
                        <p className='text-[18px] font-bold font-roboto'>Profile</p>
                    </Link>
                </div>

                <div onClick={handleLogOut} className="logout flex items-center gap-x-[20px] cursor-pointer">
                    <CiLogout className='text-[29px] ' />
                    <p className='text-[18px] font-bold font-roboto'>LogOut</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar