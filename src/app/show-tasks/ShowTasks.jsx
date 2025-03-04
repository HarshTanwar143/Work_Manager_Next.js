"use client";
import { useState, useEffect } from 'react';
import UserContext from '@/context/userContext';
import { getUserTasks } from '@/services/getUserTasks';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import noTasks from '@/assets/noTasks.svg';
import Image from 'next/image';
import Task from './Task';
import { deleteUserTask } from '@/services/deleteUserTask';
import Spinner from './Spinner';


const ShowTasks = () => {
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    async function deleteTask(taskId){
        const loadingToastId = toast.loading("removing...",{position: "top-center"});
        try{
            const result = await deleteUserTask(taskId);
            //console.log('result:', result);
            toast.update(loadingToastId, {
                render: "Task removed!!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                position: "top-center"
            });
            const newTasks = tasks.filter((task) => task._id !== taskId);
            setTasks(newTasks);
        }catch(error){
            console.log('error in deleting task');
            toast.update(loadingToastId, {
                render: "Task Not removed!!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                position: "top-center"
            });
        }
    }

    async function fetchTasks() {
        // console.log('user : ', user);
        if (!user || !user._id) return;
        setLoading(true);
        try {
            const result = await getUserTasks(user._id);
            //console.log("result:", result);
            setTasks([...result]); 
            toast.success("Tasks fetched successfully");
        } catch (error) {
            console.log("error in fetching tasks");
            // toast.error("Error in fetching tasks");
        } 
        setLoading(false);
    }

    useEffect(() => {
        if(user?._id){
            fetchTasks();
        }
    }, [user]);

    if (!user) {
        return <Spinner />
    }

    // useEffect(() => {
    //     console.log("Updated tasks after re-render:", tasks);
    // }, [tasks]); 

  return (
<>
  {loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-12 px-4 my-20">
      <div
        className={`col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-6 lg:col-start-4 mb-16 mt-8 p-4 
        ${tasks.length !== 0 && "shadow shadow-violet-600 rounded-xl p-6"}`}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center p-6 gap-4 shadow-[0px_5px_20px_2px_rgba(128,0,255,0.4)]">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-center">No Tasks</h1>
            <Image src={noTasks} height={300} alt="No tasks" className="w-full max-w-xs sm:max-w-sm md:max-w-md" />
          </div>
        ) : (
          <div>
            <h1 className="text-lg sm:text-xl md:text-3xl font-bold uppercase italic rounded-xl p-2 shadow shadow-violet-600 text-center">
              {user.name} Tasks : {tasks.length}
            </h1>

            <div className="mt-5">
              {tasks.map((task) => (
                <Task key={task._id} task={task} deleteTask={deleteTask} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )}
</>


  )
}

export default ShowTasks
