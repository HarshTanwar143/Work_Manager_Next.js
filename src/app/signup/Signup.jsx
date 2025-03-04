"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import signup from '../../assets/signup.svg'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import { signUp } from '@/services/signupUser';
import { useRouter } from 'next/navigation';


const Signup = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: ""
    });

    const [signingUp, setSigningUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleSignUp = async (e)=>{
        e.preventDefault();

        if(user.name.trim() === "" || user.email.trim() === "" || user.password.trim() === "" || user.about.trim() === "" || user.name == null || user.email == null || user.password == null || user.about == null){
          toast.warning("Fill all fields",{
            position: "top-center",
          });
          return;
        }
        
        setSigningUp(true);
        const loadingToastId = toast.loading("Submitting...", { position: "top-center" });

        try{
          const result = await signUp(user);
          toast.update(loadingToastId, {
            render: "Sign up successful",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            position: "top-center"
          });

          setUser({
              ...user,
              name:"",
              email: "",
              password: "",
              about: "",
          });

          setSigningUp(false);
          router.push('/login');
        }catch(error){
          toast.update(loadingToastId, {
            render: "Sign up error! "+ error.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            position: "top-center"
          });
        }finally{
          setSigningUp(false);
        }
    }

    const handleKeyDown = (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
        }
    }


    return (
      <div className='bg-[#0D0A10] grid grid-cols-12 py-20 px-4 md:px-10'>
      <div className="shadow-lg shadow-violet-800 col-span-12 md:col-start-5 md:col-span-4 p-5 w-full max-w-md mx-auto">
          <Image src={signup} style={{ width: "65%" }} alt='SignUp' className='m-auto mb-8' />
          <h1 className='text-3xl text-center uppercase italic mt-16'>signup here</h1>
          <form action='#!' onSubmit={handleSignUp} onKeyDown={handleKeyDown}>
            <div className='mb-6 mt-6'>
              <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>UserName</label>
              <input 
                type='text' 
                id='username' 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                placeholder='Enter UserName...' 
                required 
                name='username'
                onChange={(event) => setUser({ ...user, name: event.target.value })} 
                value={user.name} 
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
              <input 
                type='email' 
                id='email' 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                placeholder='Enter email' 
                required 
                name='email'
                onChange={(event) => setUser({ ...user, email: event.target.value })} 
                value={user.email} 
              />
            </div>

            <div className='mb-6 relative'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
              <div className='relative'>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id='password' 
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                  placeholder='•••••••••' 
                  required 
                  name='password' 
                  onChange={(e) => setUser({ ...user, password: e.target.value })} 
                  value={user.password} 
                />
                <button 
                  type='button' 
                  className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300' 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            <div className='mb-6'>
              <label htmlFor='about' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>About</label>
              <textarea 
                id='about' 
                rows={5} 
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                placeholder='Write something about yourself...' 
                name='about' 
                onChange={(event) => setUser({ ...user, about: event.target.value })} 
                value={user.about}
              ></textarea>
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-4'>
              <button 
                type='submit' 
                className='focus:outline-none text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900' 
                disabled={signingUp}
              >
                {signingUp ? 'Submitting...' : 'SignUp'}
              </button>
              <button 
                type='button' 
                className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' 
                onClick={() => setUser({ ...user, name: '', email: '', password: '', about: '' })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Signup
