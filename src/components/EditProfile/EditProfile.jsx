import React, { useEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg'
import { getAuth, updatePassword, updateProfile } from 'firebase/auth'
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginInfo } from '../../Slices/userSlice';

const EditProfile = () => {
  const auth = getAuth();
  const user = useSelector((selector) => selector.userDetails.userInfo)
  const db = getDatabase();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  //get the user's data
  useEffect(() => {
    const userRef = ref(db, `users/${user.uid}`)
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      const editArr = arr.slice(-1);
      setUserData({
        ...editArr[0],
        password: ""
      })
      console.log(editArr);

      if (editArr.length > 0) {
        console.log("latest user data :", editArr[0]);
      }
    })
  }, [user, db]);

  //email email 
  const handleEmail = (e) => {
    setUserData((item) => ({
      ...item, email: e.target.value
    }))
  }
  //email name 
  const handleName = (e) => {
    setUserData((item) => ({
      ...item, name: e.target.value
    }))
  }
  //email password 
  const handlePassword = (e) => {
    setUserData((item) => ({
      ...item, password: e.target.value
    }))
  }

  //in form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser()
  }

  //click the submit to change
  const handleUpdateUser = () => {
    if (user) {
      updateProfile(user, { displayName: userData.name })
    }
    if (userData.password) {
      updatePassword(user, userData.password)
    }
    set(ref(db, `users/${user.uid}`), {
      username: userData.name,
      email: userData.email
    }).then(() => {
      toast.success("Informations Updated!!")
      setTimeout(() => {
        navigate('/homepage')
      }, 2000);
    })
  }
  return (
    <div className='text-center'>
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
      <div className="profileImage">
        <img src={profileImg} alt="" className='rounded-full cursor-pointer mx-auto' />
        <p className='font-roboto text-[30px]'>{user.displayName}</p>
      </div>

      <form onSubmit={handleSubmit} className='inputs'>
        <div className="mt-[30px]">
          <div className="name">
            <label htmlFor="" className='mr-[98px] text-[20px]'>Name: </label>
            <input value={userData.name} onChange={handleName} type="text" placeholder='Edit Your Name' className='font-roboto py-[20px] px-[15px] border border-[#8c8c8c] mt-[20px] w-[600px] rounded-md' />
          </div>

          <div className="email">
            <label htmlFor="" className='mr-[100px] text-[20px]'>Email: </label>
            <input value={userData.email} onChange={handleEmail} type="email" placeholder='Edit your email id' className='font-roboto py-[20px] px-[15px] border border-[#8c8c8c] mt-[20px] w-[600px] rounded-md' />
          </div>

          <div className="password">
            <label htmlFor="" className='mr-[72px] text-[20px]'>Password: </label>
            <input  onChange={handlePassword} type="password" placeholder="Enter new password" className='font-roboto py-[20px] px-[15px] border border-[#8c8c8c] mt-[20px] w-[600px] rounded-md' />
          </div>
        </div>

        <div onClick={handleUpdateUser} className='bg-[#ff5acb] py-[20px] px-[10px] text-[20px] font-semibold font-roboto text-center w-[300px] mt-[20px] rounded-xl cursor-pointer text-white hover:border hover:text-black hover:bg-transparent transition duration-500 mx-auto'>
          <p>SUBMIT</p>
        </div>
      </form>
    </div>
  )
}

export default EditProfile