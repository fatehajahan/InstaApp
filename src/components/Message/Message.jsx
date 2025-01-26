import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import profileImg from '../../assets/profileImg.jpg'
import { BsSendFill } from 'react-icons/bs'
import { CgAttachment } from 'react-icons/cg'
import { FaRegSmile } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import { chatInfo } from '../../Slices/chatSlice'
import moment from 'moment'
import EmojiPicker from 'emoji-picker-react'


const Message = () => {
    const data = useSelector((selector) => selector.userDetails.userInfo)
    const chat = useSelector((state) => state.chatDetails.value)
    console.log(chat);


    //to get the followers
    const dispatch = useDispatch()
    const db = getDatabase()
    const [follower, setFollower] = useState([])

    useEffect(() => {
        const followerRef = ref(db, 'followers/')
        onValue(followerRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val().receiverid, 'rec');
                console.log(item.val().senderid, 'sen');

                if (data.uid == item.val().receiverid || data.uid == item.val().senderid) {
                    arr.push(item.val());
                }
            })
            setFollower(arr)
        })
    }, [])

    // to start a new chat
    const [chatCome, setChatCome] = useState(null)
    const handlechat = (item) => {
        setChatCome(item);
        setMsgSent('');

        const chatID = data.uid < chat.id ? `${data.uid}_${chat.id}` : `${chat.id}_${data.uid}`;

        if (data.uid == item.senderid) {
            dispatch(chatInfo(
                {
                    statues: 'single',
                    id: item.receiverid,
                    name: item.receivername,
                    chatID
                }
            ))
        } else {
            dispatch(chatInfo(
                {
                    statues: 'single',
                    id: item.senderid,
                    name: item.sendername,
                    chatID
                }
            ))
        }
        localStorage.setItem('chatInfo', JSON.stringify({ exampleKey: 'exampleValue' }));
    }

    //to chat
    const [msg, setMsg] = useState("")
    const handleSendMsg = () => {
        if (!msg.trim()) return;
        setMsg('');
        const chatID = data.uid < chat.id ? `${data.uid}_${chat.id}` : `${chat.id}_${data.uid}`;
        if (chat.statues === "single") {
            set(push(ref(db, 'messages/')), {
                chatID,
                message: msg,
                whosenderid: data.uid,
                whosendername: data.displayName,
                whoreceiverid: chat.id,
                whoreceivername: chat.name,
                datetime: moment().format('LTS')
            })
        } else {
            console.log('group');
        }
        setShowEmojiPicker((emoji) => !emoji)
    }

    const [msgSent, setMsgSent] = useState([])
    useEffect(() => {
        if (!chat.id) return;
        const chatID = data.uid < chat.id ? `${data.uid}_${chat.id}` : `${chat.id}_${data.uid}`;
        const msgRef = ref(db, 'messages/')
        const removing = onValue(msgRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val());
                if (
                    // (item.val().whosenderid === data.uid && item.val().whoreceiverid === chat.id)
                    // ||
                    // (item.val().whoreceiverid === data.uid && item.val().whosenderid === chat.id)
                    item.val().chatID === chatID
                ) {
                    arr.push(item.val())
                }
            })
            setMsgSent(arr)
        })
        return () => removing()
    }, [chat.id])
    console.log(msgSent);


    //emoji
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const emojiPick = () => {
        console.log('dd');
        setShowEmojiPicker((emoji) => !emoji)
    }

    const handleGetEmoji = (e) => {
        console.log(e);
        setMsg((getEmoji) => getEmoji + e.emoji)
    }

    const handleEnter = (e) => {
        console.log(e);
        const chatID = data.uid < chat.id ? `${data.uid}_${chat.id}` : `${chat.id}_${data.uid}`;
        if (e.key == 'Enter') {
            if (chat.statues === "single") {
                set(push(ref(db, 'messages/')), {
                    chatID,
                    message: msg,
                    whosenderid: data.uid,
                    whosendername: data.displayName,
                    whoreceiverid: chat.id,
                    whoreceivername: chat.name,
                    datetime: moment().format('LTS')
                })
            } else {
                console.log('group');
            }
        }
    }
    return (
        <div className='p-6 flex justify-between'>

            <div className='sidebar w-[250px]'>
                <Sidebar />
            </div>

            <div className="leftFollowers w-1/4">
                <div className="flex flex-col gap-y-[20px]">
                    <p className='font-Pacifico text-[20px]'>{data.displayName}</p>
                    <img src={profileImg} alt="" className='rounded-full w-[80px] cursor-pointer' />
                </div>

                <div className="messages mt-[50px]">
                    <p className='font-roboto text-[25px] pb-[18px]'>Followers to message</p>
                    {
                        follower.map((item, index) => (
                            <div key={index} onClick={() => handlechat(item)} className="id1 flex items-center justify-between">
                                <div className='flex items-center gap-x-[15px] cursor-pointer mt-[15px]'>
                                    <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                                    <div>
                                        <p className='font-roboto text-[18px] font-medium'>{
                                            item.receiverid == data.uid
                                                ? item.sendername
                                                : item.receivername
                                        }</p>
                                        <p>Dinner?</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            {
                chatCome ? <div className='w-1/2 chatBox h-[800px]'>
                    <div className='flex items-center gap-x-[15px]'>
                        <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                        <div>
                            <p className='font-roboto text-[18px] font-medium'>{chat.name}</p>
                        </div>
                    </div>


                    <div className='flex flex-col h-[600px] overflow-y-scroll'>
                        <div className=' mt-[30px]'>
                            {/* receiver*/}
                            {
                                Array.isArray(msgSent) && msgSent.map((item, index) => (
                                    item.whosenderid == data.uid
                                        ?
                                        <div key={index} className='text-right'>
                                            <p className='bg-[#ff5acb] py-[15px] px-[50px] w-[300px] mt-[30px] rounded-l-[30px] text-white text-[20px] text-justify inline-block'>{item.message}</p>
                                            <p>{item.datetime}</p>
                                        </div>
                                        : <div className='w-[300px] '>
                                            <p className='bg-[#EFEFEF] py-[15px] pr-[25px] pl-[25px]  rounded-r-[30px] text-black text-[20px] text-justify mt-[15px] '>{item.message} </p>
                                            <p>{item.datetime}</p>
                                        </div>
                                ))
                            }


                            {/* sender*/}

                        </div>
                    </div>


                    <div className='flex items-center gap-x-[15px] mr-[35px]'>
                        <div className='w-full flex relative'>
                            <input onKeyDown={handleEnter} type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='write your massegs' className='border border-[#c3c3c3] w-full rounded-2xl py-[10px] pl-[20px] pr-[90px]' />
                            <CgAttachment className='absolute top-[30%] right-[5%] text-[20px] text-[#ff5acb] cursor-pointer' />
                            <FaRegSmile onClick={emojiPick} className='absolute top-[30%] right-[10%] text-[20px] text-[#ff5acb] cursor-pointer' />

                        </div>
                        <BsSendFill onClick={handleSendMsg} className='text-[30px] text-[#ff5acb] cursor-pointer' />
                    </div>

                    <div className='block relative'>
                        {
                            showEmojiPicker &&
                            <EmojiPicker onEmojiClick={handleGetEmoji} className=' absolute top-[15px] right-0 mx-auto' />
                        }
                    </div>
                </div>
                    : <div className='w-1/2 bg-[#ff5acb] h-screen p-8'>
                        <h1 className=' font-Pacifico mx-auto text-center text-[50px] w-[450px] mt-[220px] px-[10px] py-[20px] border-separate border'>
                            Click On any Followers to start a Chat !!!
                        </h1>
                    </div>
            }
        </div>
    )
}

export default Message