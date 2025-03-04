import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { updateTaskStatus } from "@/services/updateTask";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Task = ({ task, deleteTask }) => {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);

    function handleClick(taskId) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(taskId);
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
            }
        });
    }

    async function handleStatusChange(status, taskId) {

        const loadingToastId = toast.loading("Updating...", { position: "top-center" });
        try{
            const result = await updateTaskStatus(status, taskId);
            toast.update(loadingToastId, {
                render: "Status updated!!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                position: "top-center"
            });
            //console.log(result);
            task.status = status;
        }catch(error){
            console.log('error in updating task status');
            toast.update(loadingToastId, {
                render: "Error updating status!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                position: "top-center"
            });
        }
        setShowOptions(false);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        if (showOptions) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptions]);

    return (
<div 
  className={`flex flex-col justify-between gap-6 p-4 my-6 shadow shadow-violet-600 rounded-xl text-violet-100 
  ${task.status === 'completed' && 'bg-violet-800'} min-h-[200px] w-full`}
>

  <div>
    <div className="flex flex-wrap justify-between items-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{task.title}</h2>
      <span 
        className={`shadow-md rounded-md transition-all duration-200 w-8 h-8 flex justify-center items-center cursor-pointer 
        ${task.status === 'completed' ? "bg-violet-100 shadow-black hover:bg-violet-300" : "hover:bg-violet-800 shadow-violet-800"}`}
        onClick={() => handleClick(task._id)}
      >   
        <RxCross1 className={`${task.status === 'completed' ? "text-violet-800" : "text-white"}`} />
      </span>
    </div>
    <p className="text-xs sm:text-sm text-violet-200 italic mt-2">{task.content}</p>
  </div>

  <div className="italic flex flex-wrap gap-3" ref={dropdownRef}>
    <p>Status: {task.status} {' '}</p>
    <span className="cursor-pointer flex items-center relative">
      <button 
        onClick={() => setShowOptions(!showOptions)} 
        className={`p-1 rounded-md shadow-md transition-all duration-200 
        ${task.status === 'completed' ? "bg-white text-violet-800 shadow-black hover:bg-black hover:text-white" : 
        "shadow-violet-800 text-violet-100 hover:bg-white hover:text-violet-800"}`}
      >
        <IoIosArrowDown />
      </button>

      {showOptions && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-violet-300 rounded shadow-md p-2 w-max min-w-[100px]">
          {task.status === 'completed' ? (
            <button 
              className="block px-4 py-2 text-violet-800 hover:bg-violet-100 w-full text-left"
              onClick={() => handleStatusChange("pending", task._id)}
            >
              Pending
            </button>
          ) : (
            <button 
              className="block px-4 py-2 text-violet-800 hover:bg-violet-100 w-full text-left"
              onClick={() => handleStatusChange("completed", task._id)}
            >
              Completed
            </button>
          )}
        </div>
      )}
    </span>
  </div>
</div>

    );
};

export default Task;
