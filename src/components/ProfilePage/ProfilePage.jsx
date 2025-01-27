import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import profileImg from '../../assets/profileImg.jpg'
import Post from '../Post/Post'
import Feed from '../Feed/Feed'
import { Link } from 'react-router-dom'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ProfilePage = () => {
    const data = useSelector((selector) => selector.userDetails.userInfo)
    const db = getDatabase();
    const [bio, setBio] = useState(false)
    const [editbio, setEditbio] = useState("")
    const [bioArr, setBioArr] = useState([])
    const [postCount, setPostCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);

    //bios
    const handleBio = () => {
        setBio(true)
    }
    const handleSubmit = () => {
        if (!editbio) {
            toast.error("please write something to post!!")
            return
        }
        setEditbio("")
        set(push(ref(db, 'editbio/')), {
            bio: editbio,
            whosebioid: data.uid,
            whosebioname: data.displayName
        });
        setBio(false)
    }

    useEffect(() => {
        const bioRef = ref(db, 'editbio/');
        onValue(bioRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val());
                arr.push(item.val())
            })

            const filteredArr = arr.slice(-1);
            setBioArr(filteredArr);
            if (filteredArr.length > 0) {
                console.log("Index 2 information:", filteredArr[0]);
            }
        })
    }, [])
    console.log(bioArr);

    //followers, posts, following
    //1. count posts: 
    useEffect(() => {
        const postsRef = ref(db, 'posts/');
        onValue(postsRef, (snapshot) => {
            let count = 0;
            snapshot.forEach((item) => {
                const postData = item.val();
                if (postData.posterid === data.uid) {
                    count++;
                }
            });
            setPostCount(count);
        });
    }, [db, data.uid]);

    //2.followers :
    useEffect(() => {
        const followerRef = ref(db, 'followers/')
        onValue(followerRef, (snapshot) => {
            let count = 0;
            snapshot.forEach((item) => {
                const followerCount = item.val()
                console.log(followerCount);

                // if (followerCount.senderid === data.uid) {
                //     count ++
                // }
            })
            setFollowerCount(arr)
        })
    }, [db, data.uid])
    console.log(followerCount);

    return (
        <div className='p-6 flex gap-x-[250px]'>
            <div className='sidebar w-[250px]'>
                <Sidebar />
            </div>

            <div className='w-[1000px] '>
                <div className='mt-[30px] flex justify-between'>
                    <div>
                        <img src={profileImg} alt="" className='rounded-full' />
                    </div>
                    <div>
                        <p className='font-roboto text-[30px]'>Fateha Jahan</p>
                        {
                            bioArr.length > 0 && (
                                <div><p className='font-Pacifico text-[18px] pb-[30px]'>{bioArr[0].bio}</p></div>
                            )
                        }
                        <div className='flex gap-x-[30px] cursor-pointer font-roboto text-[15px] '>
                            <p className='hover:underline transition duration-500'>{postCount} {postCount == 1 ? 'post' : 'posts'}</p>
                            <p className='hover:underline transition duration-500'>{followerCount} {followerCount == 1 ? 'follower' : 'followers'}</p>
                            <p className='hover:underline transition duration-500'>1 following</p>
                        </div>
                        <div className='pt-[30px]'>
                            <p className='font-roboto text-[23px]'>Fateha Jahan</p>
                            {
                                bio
                                    ? <div>
                                        <input onChange={(e) => setEditbio(e.target.value)} type="text" placeholder='Edit your Bio !!' className='mt-[10px] py-[10px] border px-[20px]' />

                                        <div onClick={handleSubmit} className='bg-[#ff5acb] text-center mt-[10px] rounded-2xl py-[10px] text-white font-roboto text-[16px] cursor-pointer'>Submit</div>
                                    </div>
                                    : <p onClick={handleBio} className='font-roboto text-[20px] cursor-pointer bg-[#ff5acb] w-[220px] px-[10px] py-[10px] text-center mt-[20px] text-white font-semibold rounded-2xl transition duration-300 hover:bg-transparent hover:underline hover:text-black'>Create Bio</p>
                            }
                        </div>
                    </div>
                    <Link to="/editprofile">
                        <p className='bg-[#ff5acb] font-roboto text-white py-[10px] px-[15px] hover:bg-[#fff] hover:text-black cursor-pointer transition duration-500 hover:underline text-[20px] rounded-xl'>Edit profile</p>
                    </Link>
                </div>

                <div className='mt-[30px]'>
                    <Post />
                    <Feed />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage