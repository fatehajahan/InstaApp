import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { getDatabase, ref, set } from "firebase/database";


const Registration = () => {
  const db = getDatabase()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr('')
  }
  const handleName = (e) => {
    setName(e.target.value);
    setNameErr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr('')
  }



  const handleSubmit = () => {
    if (!email) {
      setEmailErr('Please Enter your Email id')
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr('Please set a Valid Email Id')
      }
    }
    if (!name) {
      setNameErr('Please Enter your Name')
    }
    if (!password) {
      setPasswordErr('Please Enter a Password')
    }


    if (email, name, password) {
      createUserWithEmailAndPassword(auth, email, password, name)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name
          })
            .then(() => {
              console.log(user);
              toast.success("Registration Done SuccessFully !!!")
              setTimeout(() => {
                navigate('/login')
              }, 2000);
            }).then(() => {
              set(ref(db, 'users/' + user.user.uid), {
                username: user.user.displayName,
                email: user.user.email
              })
            })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("This email is Already in use!!")
          }
          else if (errorCode.includes("auth/weak-password")) {
            toast.error("Please use a strong password!!")
          }
        });
    }
  }

  const googleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success("Successfully Registered with Google");
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <div className='bg-white shadow-2xl w-[700px] mx-auto px-[50px] py-[25px] rounded-xl mt-[60px]'>
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
        <p className='font-roboto text-[16px] text-center w-[280px] mx-auto pt-[20px]'>Sign up to see photos and videos from your friends.</p>
      </div>
      <div onClick={googleSignUp} className="SignUpWithGoogle flex items-center justify-center gap-x-[15px] bg-[#ff5acb] w-[300px] mx-auto py-[10px] mt-[20px] rounded-full cursor-pointer">
        <FaGoogle className='text-[25px] text-white' />
        <p className='text-[17px] text-white font-bold'>Sign Up with Google</p>
      </div>
      <div className='bg-[#DBDBDB] w-full h-[3px] mt-[25px] relative'>
        <p className='absolute top-[-12px] left-[47%] bg-white px-[10px] font-roboto text-[18px] text-[#737373]'>OR</p>
      </div>

      <div className="informations">
        <div className="email">
          <div className="email">
            <input onChange={handleEmail} type="email" placeholder='Please Enter your Email id' className='px-[8px] py-[10px] w-full mt-[25px] border bg-[#FAFAFA] rounded-md' />
            <p className='text-red-600 font-roboto font-bold text-[12px] absolute'>{emailErr}</p>
          </div>

          <div className="name">
            <input onChange={handleName} type="text" placeholder='Please Enter Your Name' className='px-[8px] py-[10px] w-full mt-[25px] border bg-[#FAFAFA] rounded-md' />
            <p className='text-red-600 font-roboto font-bold text-[12px] absolute'>{nameErr}</p>
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

          <p className='text-center w-[450px] mx-auto font-roboto pt-[23px] text-[#8587B7]'>By signing up, you agree to our <span className='text-[#00376B]'>Terms , Privacy Policy</span> and <span className='text-[#00376B]'>Cookies Policy .</span></p>
        </div>
      </div>

      <div onClick={handleSubmit} className='bg-[#ff5acb] w-[300px] mx-auto text-center rounded-full py-[10px] mt-[15px] cursor-pointer'>
        <p className=' text-white font-roboto font-bold text-[18px]'>Sign up</p>
      </div>

      <div className="alreadyHaveAcc bg-white border py-[20px] text-center mt-[20px] cursor-pointer">
        <Link to='/login' >
          <p className='font-roboto'>Have an Account? <span className='font-roboto text-[#ff5acb] font-bold'>Log in</span></p>
        </Link>
      </div>
    </div>
  )
}

export default Registration