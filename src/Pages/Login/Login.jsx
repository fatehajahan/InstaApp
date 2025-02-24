import login from '../../assets/login.png'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { userLoginInfo } from '../../Slices/userSlice'

const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr('')
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswordErr('')
    }

    const handleLogIn = () => {
        if (!email) {
            setEmailErr('please enter your mail')
        }
        if (!password) {
            setPasswordErr('Please enter your Password!!')
        }
        if (email, password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log(user.user);
                    dispatch(userLoginInfo(user.user))
                    localStorage.setItem('userLoginInfo', JSON.stringify(user.user));
                    console.log('log in successfully!');
                    toast.success('Loging in Successfully!!')
                    setTimeout(() => {
                        navigate('/homepage')
                    }, 2000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode.includes('auth/invalid-credential')) {
                        toast.error('Please enter your registered email & password!')
                    };
                });

        }
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                toast.success("Successfully Registered with Google");
                setTimeout(() => {
                    navigate('/homepage')
                }, 2000);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    return (
        <div className='flex  justify-between items-center p-[30px]'>
            <div className=' ml-[90px] bg-white shadow-2xl w-[700px] px-[50px] py-[25px] rounded-xl mt-[60px]'>
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
                <div className="title">
                    <p className='font-Pacifico text-[60px] text-center'>InstaApp</p>
                </div>

                <div className="loginInfo">
                    <div className="email">
                        <input onChange={handleEmail} type="email" placeholder='Please Enter your Email id' className='px-[8px] py-[10px] w-full mt-[25px] border bg-[#FAFAFA] rounded-md' />
                        <p className='text-red-600 font-roboto font-bold text-[12px] absolute'>{emailErr}</p>
                    </div>

                    <div onChange={handlePassword} className='password relative'>
                        <input type={`${showPassword ? 'text' : 'password'
                            }`} placeholder='Please Enter a Password' className='px-[8px] py-[10px] w-full mt-[25px] border bg-[#FAFAFA] rounded-md' />
                        {
                            showPassword
                                ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className='absolute top-[55%] right-[4%] cursor-pointer' />
                                : <FaEye onClick={() => setShowPassword(!showPassword)} className='absolute top-[55%] right-[4%] cursor-pointer' />
                        }


                        <p className='text-red-600 font-roboto font-bold text-[12px] absolute'>{passwordErr}</p>
                    </div>
                </div>

                <div onClick={handleLogIn} className='bg-[#ff5acb] w-[300px] mx-auto text-center rounded-full py-[10px] mt-[15px] cursor-pointer'>
                    <p className=' text-white font-roboto font-bold text-[18px]'>Log In</p>
                </div>

                <div className='bg-[#DBDBDB] w-full h-[3px] mt-[30px] relative'>
                    <p className='absolute top-[-12px] left-[47%] bg-white px-[10px] font-roboto text-[18px] text-[#737373]'>OR</p>
                </div>

                <div onClick={handleGoogleLogin} className="loginWithGoogle flex items-center justify-center gap-x-[15px] bg-[#ff5acb] w-[300px] mx-auto py-[10px] mt-[30px] rounded-full cursor-pointer">
                    <FaGoogle className='text-[25px] text-white' />
                    <p className='text-[17px] text-white font-bold'>Log in with Google</p>
                </div>

                <div className='text-center pt-[10px]'>
                    <Link to='/forgotpassword' className='text-[#737373] cursor-pointer text-center pt-[20px] text-[18px]'>Forgot Password?</Link>
                </div>

                <div className="alreadyHaveAcc bg-white border py-[20px] text-center mt-[20px] cursor-pointer">
                    <Link to='/' >
                        <p className='font-roboto'>Don't Have an Account? <span className='font-roboto text-[#ff5acb] font-bold'>Sign Up</span></p>
                    </Link>
                </div>
            </div>

            <div>
                <img src={login} alt="" className='mx-auto mr-[90px] w-[600px] h-[600px]' />
            </div>
        </div>
    )
}

export default Login