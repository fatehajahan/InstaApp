import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'

const ForgotPassword = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("")

    const handleEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value)
    }
    const handleResetPassword = () => {
        console.log('df');
        setEmail("")
        if (!email) {
            toast.error("Please Give Your Registred email id!!")
        }
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success("Please Check Your Email!!")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }
    return (
        <div className='bg-[#ff5acb] h-screen py-[200px] overflow-hidden'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='bg-white w-[700px] mx-auto py-[30px] px-[30px] rounded-2xl'>
                <h2 className='font-roboto text-[30px] underline text-center'>Forgot Password</h2>

                <input onChange={handleEmail} type="email" value={email} placeholder='Give Your Registered Email' className='border-b-2 w-full  border-[#989898] py-[10px] px-[15px] rounded-2xl shadow-none' />

                <div className='flex gap-x-[15px] mt-[20px]'>
                    <div onClick={handleResetPassword} className='bg-[#ff5acb] text-white py-[15px] px-[10px] rounded-lg font-roboto font-semibold hover:bg-transparent hover:text-black cursor-pointer transition duration-300'>Reset Password</div>
                    <Link to="/login" className='bg-[#ff5acb] text-white py-[15px] px-[10px] rounded-lg font-roboto font-semibold hover:bg-transparent hover:text-black cursor-pointer transition duration-300'>Back</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword