import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectionDB } from "@/helper/db";



export async function POST(request){
    
    const {email, password} = await request.json();
    
    try{

        await connectionDB();
        const user = await User.findOne({email: email});


        // console.log('user is ', user);
        if(!user){
            return NextResponse.json({
                message: "User email not found!!",
                success: false
            },{
                status: 404
            });
        }

        // If user is marked for deletion, cancel it
        if (user.markedForDeletion) {
            user.markedForDeletion = false;
            user.markedForDeletionAt = null;
            await user.save();
            //console.log(`Deletion cancelled for user ${user._id}`);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return NextResponse.json({
                message: "Invalid Password!!",
                success: false
            },{
                status: 401
            });
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_SECRET);

        const response = NextResponse.json({
            message: "Login Successfull!!",
            success: true,
            user:user
        },{
            status: 200
        });

        response.cookies.set("authToken",token,{
            expiresIn: '1d',
            httpOnly: true
        });

        return response;
    }catch(error){
        return NextResponse.json({
            message: error.message,
            success: false
        },{
            status: 500
        });
    }
}