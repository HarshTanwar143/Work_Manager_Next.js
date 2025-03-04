"use client";
import React, { useContext, useEffect, useState } from 'react'
import noTasks from '../../../assets/noTasks.svg'
import UserContext from '@/context/userContext'
import { updateProfile } from '@/services/updateProfile';
import { toast } from 'react-toastify';
import Spinner from '@/app/show-tasks/Spinner';
import Swal from 'sweetalert2';
import { deleteUserProfile } from '@/services/deleteUserProfile';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/logoutUser';
import UploadImage from '@/components/UploadImage';
import { HiTrash } from 'react-icons/hi';



const UserDashboard = () => {
    const {user, setUser} = useContext(UserContext);
    // console.log(' user', user);
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [saving,setSaving] = useState(false);
    const [editData, setEditData] = useState({
        name: user?.name,
        email: user?.email,
        password: '',
        about: user?.about,
        profileURL: ''
    });

    // FOR PRINTING UPDATED/LATEST USER AND EDIT AFTER EDITING SUCCESSFULLY
    // useEffect(()=>{
    //     console.log('inside useEffect user is : ', user);
    // }, [user]);

    // useEffect(()=>{
    //     console.log('inside useEffect edit status : ',edit);
    // }, [edit]);

    useEffect(()=>{
        setUser(user);
    },[user]);


    const deleteProfile = async() => {
        Swal.fire({
            title: "Are you sure?",
            text: "User will be permanently deleted in 1 hour unless they log in!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log('task deleting called');
                const userId = user._id;
                const loadingToastId = toast.loading("Deleting...", {position: "top-center"});
                try{
                    const res = await deleteUserProfile(userId);
                    toast.update(loadingToastId, {
                        render: "Profile will be deleted in 1 hours. Log in to cancel.",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                        position: "top-center"
                    });
                    // console.log('after delteUserProfile');
                    // console.log('res is : ', res);
                    const logoutUserFromProfile = await logoutUser();
                    // console.log('after logout');
                    setUser(undefined);
                    router.push('/')
                }catch(error){
                    // console.log('error in deleting user profile and tasks');
                    toast.update(loadingToastId,{
                        render: "Error deleting profile!!",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                        position: "top-center"
                    })
                }
                
            }
        });
    }

    const handleEdit = async(e)=> {
        e.preventDefault();
        
        const userId = user._id;
        //console.log('this is edited data : ', editData);

        setSaving(true);
        const loadingToastId = toast.loading("Saving...", { position: "top-center" });
        try{
            // console.log('editData in dashboard : ', editData);
            const result = await updateProfile(editData.name, editData.email, editData.password, editData.about, userId, editData.profileURL);
            toast.update(loadingToastId, {
                render: "Updation successful!!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                position: "top-center"
            });

            //console.log('this is result: ', result);
            const {password, ...updatedUserData} = result;
            setUser(updatedUserData);
            setEditData(result);
            setEdit((prev) => !prev);
        }catch(error) {
            console.log('Error in updating profile');
            // console.log(' Error : ', error);
            toast.update(loadingToastId, {
                render: "Updation error! "+ error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                position: "top-center"
            });
        }finally{
            setSaving(false);
        }
    }

    async function handlePictureRemove(){
        try{
            editData.profileURL = null;
            const userId = user._id;
            const result = await updateProfile(editData.name, editData.email, editData.password, editData.about, userId, editData.profileURL);
            setUser(result);
        }catch(error){
            console.log('error in deleting user profile picture');
            // console.log(' error : ',error);
        }
    }
    
        
    return (
        <>
        {!user ? (
            <Spinner />
        ) : (
            <div className="container mx-auto my-28 px-4 py-10">
            <div className="rounded-md shadow-md shadow-violet-800 max-w-3xl mx-auto p-6 sm:p-8 md:p-10">
                <h1 className="italic text-xl sm:text-2xl md:text-3xl mb-10 font-bold uppercase text-center">
                User Dashboard
                </h1>
                {!edit && (
                <div className="relative flex justify-center">
                    <img
                    src={user?.profileURL || noTasks.src}
                    alt="user picture"
                    className={`shadow-[0px_5px_20px_2px_rgba(128,0,255,0.4)] object-cover mx-auto my-10
                    ${user?.profileURL ? "w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full" : "w-48 sm:w-64 rounded-2xl"}`}
                    />
                    {user?.profileURL && (
                    <HiTrash
                        className="text-violet-700 absolute cursor-pointer right-1/3 hover:text-violet-900"
                        onClick={handlePictureRemove}
                    />
                    )}
                </div>
                )}

                <div className="my-16 flex flex-col gap-4 sm:gap-6 items-center italic">
                {edit ? (
                    <>
                    <UploadImage editData={editData} setEditData={setEditData}  />
                    <form className="w-full flex flex-col gap-8" onSubmit={handleEdit}>
                        {[
                        { label: "Name", type: "text", name: "name" },
                        { label: "Email", type: "email", name: "email" },
                        { label: "Password", type: "password", name: "password" },
                        ].map(({ label, type, name }) => (
                        <div key={name} className="flex flex-col sm:flex-row gap-4 items-center w-full">
                            <label htmlFor={name} className="text-sm font-medium w-full sm:w-1/3 text-center">
                            {label}:
                            </label>
                            <input
                            type={type}
                            id={name}
                            name={name}
                            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg p-2.5 w-full sm:w-2/3 focus:ring-violet-500 focus:border-violet-500"
                            onChange={(e) => setEditData({ ...editData, [name]: e.target.value })}
                            value={editData[name]}
                            placeholder={`Edit ${label}`}
                            />
                        </div>
                        ))}

                        <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                        <label htmlFor="about" className="text-sm font-medium w-full sm:w-1/3 text-center">
                            About:
                        </label>
                        <textarea
                            id="about"
                            rows="4"
                            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg p-2.5 w-full sm:w-2/3 focus:ring-violet-500 focus:border-violet-500"
                            name="about"
                            onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                            value={editData.about}
                            placeholder="Write something about you..."
                        />
                        </div>

                        <div className="flex flex-wrap justify-center mt-6 gap-4">
                        <button
                            type="submit"
                            className="rounded-lg px-6 py-3 bg-violet-900 text-white hover:bg-violet-800 transition-all duration-200"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            className="rounded-lg px-6 py-3 bg-gray-600 text-white hover:bg-gray-500 transition-all duration-200"
                            onClick={() => setEdit((prev) => !prev)}
                        >
                            Cancel
                        </button>
                        </div>
                    </form>
                    </>
                ) : (
                    [
                    { label: "Name", value: user?.name },
                    { label: "Email", value: user?.email },
                    { label: "About", value: user?.about },
                    { label: "Password", value: "*************" },
                    ].map(({ label, value }, index) => (
                    <div key={index} className="w-full flex justify-between gap-4 p-4 rounded-lg shadow-md shadow-violet-800 min-h-[100px] text-white">
                        <p>{label}:</p>
                        <p>{value}</p>
                    </div>
                    ))
                )}
                </div>

                {!edit && (
                <div className="flex flex-wrap justify-center gap-4 p-2">
                    <button
                    className="rounded-lg px-6 py-3 bg-violet-900 text-white hover:bg-violet-800 transition-all duration-200"
                    onClick={() => setEdit((prev) => !prev)}
                    >
                    Edit Profile
                    </button>
                    <button
                    className="rounded-lg px-6 py-3 bg-red-600 text-white hover:bg-red-800 transition-all duration-200"
                    onClick={deleteProfile}
                    >
                    Remove Profile
                    </button>
                </div>
                )}
            </div>
            </div>
        )}
        </>
    )
}

export default UserDashboard
