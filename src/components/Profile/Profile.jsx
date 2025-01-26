import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';
const Profile = () => {
    const data = useSelector((selector) => selector.userDetails.userInfo)
    const db = getDatabase()
    const [profileName, setProfileName] = useState([])
    useEffect(() => {
        const profileRef = ref(db, 'users/');
        onValue(profileRef, (snapshot) => {
            console.log(snapshot.val());
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.key);
                if (data.uid == item.key) {
                    arr.push(item.val())
                }
            })
            setProfileName(arr)
        });
    }, [])
    console.log(profileName);
    return (
        <div className='px-[20px]'>
            <div className="flex items-center gap-x-5">
                <img src={profileImg} alt="" className='rounded-full w-[60px]' />
                <div>
                    {
                        profileName.map((item) => (
                            <div>
                                <p className='font-Pacifico text-[20px]'>{item.username} (you)</p>
                                <p className='font-roboto'>{item.email}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile