import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import EmojiPicker from 'emoji-picker-react';
import { FaRegSmile } from 'react-icons/fa';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Post = () => {
    const data = useSelector((selector) => selector.userDetails.userInfo)

    const db = getDatabase()

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const emojiPick = () => {
        console.log('dd');
        setShowEmojiPicker((emoji) => !emoji)
    }
    const handleGetEmoji = (e) => {
        console.log(e);
        setPost((getEmoji) => getEmoji + e.emoji)
    }

    const [post, setPost] = useState("")
    const handlePost = () => {
        console.log('ll');
        if(!post){
            toast.error("please write something to post!!")
            return
        }
        setPost('')
        set(push(ref(db, 'posts/')), {
            post: post,
            datetime: moment().format('MMMM Do YYYY, h:mm:ss a'),
            posterid: data.uid,
            postername: data.displayName
        })
        setShowEmojiPicker((emoji) => !emoji)
    }
    return (
        <div className='w-full'>
            <div className='bg-white shadow-2xl px-[30px] py-[20px] rounded-2xl'>
                <div className='flex items-center gap-x-[20px]'>
                    <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                    <input value={post} onChange={(e) => setPost(e.target.value)} type="text"
                        placeholder="what's on Your Mind?" className='rounded-full border bg-[#F0F2F5] cursor-pointer w-full py-[12px] px-[19px]' />
                </div>
                <div>
                    <div className='flex relative'>
                        <div onClick={handlePost} className='bg-[#ff5acb] inline-block py-[8px] px-[20px] rounded-full mt-[10px] cursor-pointer'>
                            <p className='font-Pacifico'>Post</p>
                        </div>
                        <FaRegSmile onClick={emojiPick} className='absolute top-[40%] left-[10%] text-[20px] text-[#ff5acb] cursor-pointer' />
                    </div>

                    <div className='block relative'>
                        {
                            showEmojiPicker &&
                            <EmojiPicker onEmojiClick={handleGetEmoji} className=' absolute top-[15px] right-0' />
                        }
                    </div>
                </div>
                <div className='bg-[#e6e5e5] w-full h-[3px] mt-[30px] rounded-full'></div>
            </div>
        </div>
    )
}

export default Post