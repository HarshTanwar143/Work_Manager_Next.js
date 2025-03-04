import { connectionDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { Task } from "@/models/task";
import { startCronJob } from "@/utils/deleteExpiredUsers";


export async function GET(request, {params}){
    const {userId} = params;
    try{
        await connectionDB();
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }
        return NextResponse.json(user);
    }catch(error){
        console.log('error in fetching particular user');
        return NextResponse.json({
            message: "Error fetching user",
            status: 500
        });
    }
}

export async function PUT(request, { params }) {
    const { userId } = params;
    const { name, email, password, about, profileURL } = await request.json();

    try {
        await connectionDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (about) user.about = about;
        if (profileURL) user.profileURL = profileURL;

        // Only hash password if it's provided in request
        if (password) {
            user.password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        }

        const updatedUser = await user.save();

        return NextResponse.json(updatedUser, {
            message: "User details updated!",
            status: 200
        });
    } catch (error) {
        console.log("Error updating user:", error);
        return NextResponse.json({
            message: "Error updating user",
            status: 500
        });
    }
}





export async function DELETE(request, { params }) {
    const { userId } = params;
    try {
        await connectionDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }

        // Mark the user for deletion after 1 minute
        user.markedForDeletion = true;
        user.markedForDeletionAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        await user.save();
        //console.log(`User ${user._id} marked for deletion in 1 minute.`);
        startCronJob();

        return NextResponse.json({
            message: "User scheduled for deletion",
            status: 200
        });
    } catch (error) {
        // console.log('Error in scheduling user deletion:', error);
        return NextResponse.json({
            message: "Error scheduling user deletion",
            status: 500
        });
    }
}
