import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { CiBookmarkCheck } from 'react-icons/ci';


const SuggestedUser = () => {
  const data = useSelector((selector) => selector.userDetails.userInfo)
  console.log(data);

  const db = getDatabase();

  //suggested user
  const [suggestedUser, setSuggestedUser] = useState([])
  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      console.log(snapshot.val());
      let arr = []
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          arr.push({ ...item.val(), userid: item.key })
        }
      })
      setSuggestedUser(arr)
    });
  }, [])

  //FollowRequests
  const [sentFollowRequest, setSentFollowRequest] = useState([])
  const handleFollow = (item) => {
    set(push(ref(db, 'sentfollow/')), {
      senderid: data.uid,
      sendername: data.displayName,
      receivername: item.username,
      receiverid: item.userid,
    })
  }

  useEffect(() => {
    const followRef = ref(db, 'sentfollow/');
    onValue(followRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().senderid + item.val().receiverid);
      })
      setSentFollowRequest(arr)
    });
  }, [])

  //FollowAccept
  const [followingAccept, setFollowingAccept] = useState([])
  useEffect(() => {
    const followingRef = ref(db, 'followers/');
    onValue(followingRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid)
      })
      setFollowingAccept(arr)
    })
  }, [])
  console.log(followingAccept);

  return (
    <div className='py-[20px] px-[25px] bg-white shadow-2xl mt-[30px] rounded-2xl  '>
      <div className="sugTitle ">
        <div className=' '>
          <div className="flex justify-between items-center">
            <p className='font-roboto text-[18px] font-semibold '>Suggested for you</p>
            <p className='cursor-pointer font-roboto text-[18px] '>See All</p>
          </div>
          <input type="text" placeholder='Search an user' className='border py-[8px] px-[20px] rounded-full bg-[#FAFAFA] mt-[20px] w-full' />
        </div>
      </div>


      <div className="suggestedUser pt-[20px] flex flex-col gap-y-[20px] h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#ff5acb] scrollbar-track-gray-200 overflow-x-hidden pr-[30px]">
        {
          suggestedUser.map((item, index) => (
            <div key={suggestedUser.id || index} className="id1 flex items-center justify-between">
              <div className='flex items-center gap-x-[15px]'>
                <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                <div>
                  <p className='font-roboto text-[18px] font-medium'>{item.username}</p>
                  <p className='flex flex-col'><span>{item.email}</span><span>Followed By Hastag_lala</span></p>
                </div>
              </div>

              <div className="btn">
                {
                  followingAccept.includes(data.uid + item.userid) || followingAccept.includes(item.userid + data.uid)
                    ? <div className='flex items-center gap-x-[9px]'>
                      <CiBookmarkCheck className='text-[#ff5acb] text-[25px] font-bold' />
                      <p className='cursor-pointer text-[#ff5acb] font-handlee font-bold text-[18px] '>Friends</p>
                    </div>
                    :
                    sentFollowRequest.includes(data.uid + item.userid) || sentFollowRequest.includes(item.userid + data.uid)
                      ? <p className='cursor-pointer text-[#ff5acb] font-handlee font-bold hover:bg-[#ff5acb] hover:text-white transition duration-300 text-[18px] px-[15px] py-[10px] rounded-md'>Pendign</p>
                      : <p onClick={() => handleFollow(item)} className='cursor-pointer text-[#ff5acb] font-handlee font-bold hover:bg-[#ff5acb] hover:text-white transition duration-300 text-[18px] px-[15px] py-[10px] rounded-md'>Follow</p>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SuggestedUser