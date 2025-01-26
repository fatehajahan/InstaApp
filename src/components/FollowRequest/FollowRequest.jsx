import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const sentFollowRequest = () => {
    const data = useSelector((selector) => selector.userDetails.userInfo)
    const db = getDatabase()
    //sentFollowRequest
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

    //followAccept

    const handleAccept = (item) => {
        set(push(ref(db, 'followers')), {
            ...item
        }).then(() => {
            remove(ref(db, 'sentfollow/' + item.userid))
        })
    }
    return (
        <div className='mt-[30px] py-[20px] px-[25px] bg-white shadow-2xl rounded-2xl'>
            <p className='font-roboto pb-[18px] font-semibold text-[18px]'>Follow Requests</p>
            {
                sentFollowRequest.map((item, index) => (
                    <div key={sentFollowRequest.id || index}>
                        <div className="id1 flex items-center justify-between">
                            <div className='flex items-center gap-x-[15px]'>
                                <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                                <div>
                                    <p className='font-roboto text-[18px] font-medium'>{item.sendername}</p>
                                    <p>Followed By Hastag_lala</p>
                                </div>
                            </div>

                            <div className="btn flex items-center gap-x-[8px]">
                                <p onClick={() => handleAccept(item)} className='cursor-pointer text-[#ff5acb] font-handlee font-bold hover:bg-[#ff5acb] hover:text-white transition duration-300 text-[18px] px-[15px] py-[10px] rounded-md'>Accept</p>

                                <p className='cursor-pointer text-[#ff5acb] font-handlee font-bold hover:bg-[#ff5acb] hover:text-white transition duration-300 text-[18px] px-[15px] py-[10px] rounded-md'>Reject</p>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default sentFollowRequest