"use client";
import UserContext from '@/context/userContext';
import { logoutUser } from '@/services/logoutUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      const result = await logoutUser();
      context.setUser(undefined);
      router.push('/');
      toast.success(result.message, {
        position: 'top-center',
      });
    } catch (error) {
      console.log('error in logout');
      toast.error('Something went wrong!', {
        position: 'top-center',
      });
    }
  }

  return (
    <nav className='flex justify-between items-center shadow-[0px_5px_20px_2px_rgba(128,0,255,0.4)] px-10 py-5 mb-5 relative'>
      <h1 className='font-bold text-3xl'>
        <Link href='/'>Work Manager</Link>
      </h1>
      
      {/* Centered Nav Links (Only for logged-in users & md+) */}
      {context.user && (
        <ul className='hidden md:flex space-x-5 font-semibold'>
          <li className='cursor-pointer hover:scale-95 transition duration-200'><Link href='/'>Home</Link></li>
          <li className='cursor-pointer hover:scale-95 transition duration-200'><Link href='/add-task'>Add Task</Link></li>
          <li className='cursor-pointer hover:scale-95 transition duration-200'><Link href='/show-tasks'>Show Tasks</Link></li>
        </ul>
      )}

      {/* Right Side Buttons */}
      <div className='hidden md:flex space-x-4 font-semibold'>
        {context.user ? (
          <>
            <Link href='/profile/user'>
              <button className='border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
                {context.user.name.length > 15 ? context.user.name.split(' ')[0] : context.user.name}
              </button>
            </Link>
            <button onClick={handleLogout} className='border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href='/login'>
              <button className='border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>Login</button>
            </Link>
            <Link href='/signup'>
              <button className='border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>SignUp</button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-16 right-10 bg-white p-5 shadow-md rounded-md flex flex-col items-center space-y-3 text-violet-800 font-semibold md:hidden'>
          {context.user ? (
            <>
              <Link href='/' className='w-full flex justify-center'>
                  <span className='w-full text-center border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
                    Home
                  </span>
              </Link>
              <Link href='/add-task' className='w-full flex justify-center'>
                  <span className='w-full text-center border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
                    Add Task
                  </span>
              </Link>
              <Link href='/show-tasks' className='w-full flex justify-center'>
                  <span className='w-full text-center border border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
                    Show Tasks
                  </span>
              </Link>


              <Link href='/profile/user' className='w-full flex justify-center'>
                <button className='border border-white w-full rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
                  {context.user.name.length > 15 ? context.user.name.split(' ')[0] : context.user.name}
                </button>
              </Link>
              <button onClick={handleLogout} className='border w-full border-white rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href='/login' className='w-full flex justify-center'>
                <button className='border border-white w-full rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>Login</button>
              </Link>
              <Link href='/signup'  className='w-full flex justify-center'>
                <button className='border border-white w-full rounded px-4 py-1 cursor-pointer hover:text-white text-violet-800 hover:bg-violet-800 bg-white transition-all duration-200'>SignUp</button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
