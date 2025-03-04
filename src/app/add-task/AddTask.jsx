"use client";
import React, { useContext, useState } from 'react'
import add_task from '../../assets/add_task.svg'
import Image from 'next/image';
import { addTask } from '@/services/addTask';
import { toast } from 'react-toastify';
import UserContext from '@/context/userContext';


const AddTask = () => {
  const {user} = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [task, setTask] = useState({
    title:"",
    content:"",
    status:"pending",
    userId:user?._id
    });

  const handleAddTask = async(e)=>{
    e.preventDefault();
    if(!task.title || !task.content || !user?._id){
      toast.error('fill all details',{
        position: 'top-center'
      });
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Submitting...", { position: "top-center" });


    try{
      const result = await addTask(task);
      toast.update(loadingToastId, {
        render: "Task added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-center"
      });
      setTask({...task,title:"",content:"",status:"pending"});
    }catch(error){
      console.log('error in add task');
      toast.update(loadingToastId, {
        render: "Task not added!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        position: "top-center"
      });
    }finally{
      setIsSubmitting(false);
    }
  }

  const handleKeyDown = (e)=>{
    if(e.key === "Enter"){
      e.preventDefault();
    }
  }


  return (
<div className="pb-20 bg-[#0D0A10] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-12 pt-20 px-4">
  <div className="shadow-lg shadow-violet-800 col-span-1 sm:col-span-1 md:col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4 p-5 w-full max-w-[600px] mx-auto">
    <Image src={add_task} style={{ width: "65%" }} alt="add task" className="m-auto mb-8" />
    <h1 className="text-3xl text-center uppercase italic mt-8 sm:mt-6">Add your Task</h1>
    
    <form action="#!" onSubmit={handleAddTask} onKeyDown={handleKeyDown}>
      <div className="mb-6 mt-6">
        <label htmlFor="task_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          type="text"
          id="task_title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter task..."
          required
          name="task_title"
          onChange={(event) => setTask({ ...task, title: event.target.value })}
          value={task.title}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="task_content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Content
        </label>
        <textarea
          id="task_content"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add your task content here..."
          name="task_content"
          onChange={(event) => setTask({ ...task, content: event.target.value })}
          value={task.content}
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="task_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Task Status
        </label>
        <select
          id="task_status"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="task_status"
          onChange={(event) => setTask({ ...task, status: event.target.value })}
          value={task.status}
        >
          <option disabled>Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto text-white bg-violet-700 hover:bg-violet-800 rounded-lg text-sm px-5 py-2.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"
          className="w-full sm:w-auto text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5"
          onClick={() => setTask({ ...task, title: "", content: "", status: "pending" })}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default AddTask;
