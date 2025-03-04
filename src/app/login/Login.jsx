"use client";
import React, { useContext, useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import loginSvg from '../../assets/login.svg'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { loginUser } from '@/services/loginUser';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/userContext';



const Login = () => {

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  // console.log('this is user : ', user);
  // console.log('this is setUser : ', setUser);
  const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loginNow, setLoginNow] = useState(false);
    
    const handleLogin = async(e) => {
        e.preventDefault();

        if(loginData.email.trim() === "" || loginData.password.trim() === "" || !loginData.email || !loginData.password) {
            toast.warning('please fill all credentials!',{
                position: "top-center",
            });
            return;
        }
        
        setLoginNow(true);
        const loadingToastId = toast.loading("Submitting...", { position: "top-center" });
        
        try{
          const result = await loginUser(loginData);
          toast.update(loadingToastId, {
            render: "Login successful",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            position: "top-center"
          });

          // context.setUser(result.user);
          setUser(result.user);

          setLoginData({email: "", password: ""});
          router.push('/profile/user')
        }catch(error){
          // console.log('error in login', error);
          toast.update(loadingToastId, {
            render: "Login error! "+ error.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            position: "top-center"
          });
        }finally{
          setLoginNow(false);
        }
    }


    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
        }
    }

  return (
    <div className='bg-[#0D0A10] grid grid-cols-12 py-20 px-4'>
      <div className='shadow-lg shadow-violet-800 col-span-12 sm:col-start-3 sm:col-span-8 md:col-start-5 md:col-span-4 p-5 w-full max-w-md mx-auto '>
        <Image src={loginSvg} style={{ width: "65%" }} alt='Login image' className='m-auto mb-8' />
        <h1 className='text-3xl text-center uppercase italic mt-[4rem]'>Login Here</h1>
        <form action="#!" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
          <div className='mb-6'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required
              name='email'
              onChange={(event) => {
                setLoginData({ ...loginData, email: event.target.value });
              }}
              value={loginData.email}
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                name="password"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                value={loginData.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <div className='flex justify-center gap-4'>
            <button type="submit" className="focus:outline-none text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900" disabled={loginNow}>
              {loginNow ? "Submitting..." : "Login"}
            </button>

            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => { setLoginData({ email: "", password: "" }) }}
            >Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
