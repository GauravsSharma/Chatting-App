import React, { useEffect } from 'react';
import bgVideo from './bg.mp4'; // Import the video file using ES6 module syntax
import { AiFillGoogleCircle } from "react-icons/ai";
import { useFirebase } from '../../providers/Firebase';
// import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { signInWithGoogle, user, isLoggedIn } = useFirebase();
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      console.log(user);
      setTimeout(() => {
        navigate("/chat");
      }, 2000);
    }
  }, [isLoggedIn,user])


  const handelSignIn = async () => {
    const promise = await signInWithGoogle()
  
  }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-full w-full fixed top-0 left-0 bg-black/50 -z-5'></div>
      <video src={bgVideo} autoPlay loop muted className='w-full -z-10  h-full object-cover fixed top-0 left-0'></video>
      <div className='cursor-pointer z-0 border-white border-2 py-4 px-5 rounded-lg flex justify-center items-center gap-1 text-white' onClick={handelSignIn}>
        <AiFillGoogleCircle className='text-3xl' />
        <div className='font-bold'>LOGIN WITH GOOGLE</div>
      </div>
      {/* <Toaster/> */}
    </div>
  );
};

export default Login;
