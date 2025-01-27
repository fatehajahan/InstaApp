import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { RiSendPlaneFill } from 'react-icons/ri'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'
const Feed = () => {
    const data = useSelector((selector)=> selector.userDetails.userInfo)
    console.log(data);
    
    const db = getDatabase()
    const [postPublish, setPostPublish] = useState([])
    useEffect(() => {
        const postRef = ref(db, 'posts/')
        onValue(postRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val());
                console.log(item.key);
                arr.push(item.val())
            })
            setPostPublish(arr)
        })
    }, [])
    console.log(postPublish);

    return (
        <div>
            {
                postPublish.map((item, index) => (
                    <div key={index} className='bg-white shadow-2xl py-[20px] px-[20px] mt-[40px]'>
                        <div>
                            <div className="profileDetails">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-x-5">
                                        <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                                        <div> <p className='font-Pacifico text-[20px]'>{item.postername}</p>
                                            <p>{item.datetime}</p></div>
                                    </div>
                                    <HiOutlineDotsHorizontal className='text-[30px] text-[#ff5acb] cursor-pointer' />
                                </div>
                            </div>

                            <div className='pt-[30px]'>
                                <p>{item.post} </p>
                            </div>

                            <div className="reactions pt-[30px] flex gap-x-[25px]">
                                <FaRegHeart className='text-[35px] cursor-pointer' />
                                <FaRegComment className='text-[35px] cursor-pointer' />
                                <RiSendPlaneFill className='text-[35px] cursor-pointer' />
                            </div>
                            <div>
                                <p className='font-roboto text-[20px] pt-[30px]'>10,000 likes</p>
                                <p className='font-roboto text-[20px] pt-[10px] font-bold'>Travel Is Life !!! by @{item.postername} </p>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>

    )
}

export default Feed