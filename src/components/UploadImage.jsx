
import { useState,useEffect } from "react";
import axios from "axios";

const ProfileImageUploader = ({editData,setEditData}) => {
  const [image, setImage] = useState(null);
  const [publicId, setPublicId] = useState(null); // if i want to delete previous image (before redirecting), then need to store this publicId in schema and then initialze this publicId with that publicId instead of null.
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log("Updated editData:", editData); // Now logs the latest state
  // }, [editData]); // Runs whenever editData changes

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "work_manager"); // Cloudinary preset

    try {
      setLoading(true);

      if (publicId) {
        // Delete previous image before uploading a new one
        await axios.post("/api/delete-image", { publicId });
      }

      // 🔹 Upload the new image
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyofqc5qt/image/upload",
        formData
      );
      // console.log('response : ', response);

      // 🔹 Save new image and publicId
      setEditData((prev) => ({
        ...prev,
        profileURL: response.data.secure_url,
      }));
      setImage(response.data.secure_url);
      setPublicId(response.data.public_id);
    } catch (error) {
      console.error("Error in Upload Image");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex flex-col sm:flex-row my-10 items-center sm:justify-center sm:space-x-6 w-full">
  {image ? (
    <img
      src={image}
      alt="Profile"
      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-300"
    />
  ) : (
    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-300 flex justify-center items-center">
      <span className="text-gray-500 text-sm sm:text-base">No Image</span>
    </div>
  )}

  {loading ? (
    <p className="text-violet-500 mt-4 sm:mt-2 text-center">Uploading...</p>
  ) : (
    <input
      type="file"
      accept="image/*"
      className="mt-4 sm:mt-0 p-2 rounded-lg shadow-md shadow-violet-800 cursor-pointer hover:shadow-[0px_5px_20px_2px_rgba(128,0,255,0.4)] transition duration-300 hover:scale-105 text-center"
      onChange={(e) => {
        if (e.target.files[0]) {
          uploadImage(e.target.files[0]);
        }
      }}
    />
  )}
</div>


  );
};

export default ProfileImageUploader;

