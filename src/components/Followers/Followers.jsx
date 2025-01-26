import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Friends = () => {
    const data = useSelector((selector) => selector.userDetails.userInfo)
    const db = getDatabase()
    const [follower, setFollower] = useState([])

    useEffect(() => {
        const followerRef = ref(db, 'followers/')
        onValue(followerRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val().receiverid, 'rec');
                console.log(item.val().senderid, 'sen');
                
                if(data.uid == item.val().receiverid || data.uid == item.val().senderid){
                    arr.push(item.val());
                }
            })
            setFollower(arr)
        })
    }, [])
    console.log(follower);

    return (
        <div className='mt-[30px] py-[20px] px-[25px] bg-white shadow-2xl rounded-2xl'>
            <div>
                <p className='font-roboto pb-[18px] font-semibold text-[18px]'>My Followers: </p>
                {
                    follower.map((item) => (
                        <div className="id1 flex items-center justify-between">
                            <div className='flex items-center gap-x-[15px]'>
                                <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                                <div>
                                    <p className='font-roboto text-[18px] font-medium'>{
                                        item.receiverid == data.uid 
                                        ? item.sendername
                                        : item.receivername
                                        }</p>
                                    <p>Followed By Hastag_lala</p>
                                </div>
                            </div>

                            <Link to='/message' className="btn flex items-center gap-x-[8px]"> <p className='cursor-pointer text-[#ff5acb] font-handlee font-bold hover:bg-[#ff5acb] hover:text-white transition duration-300 text-[18px] px-[15px] py-[10px] rounded-md'>Message</p>
                            </Link>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Friends