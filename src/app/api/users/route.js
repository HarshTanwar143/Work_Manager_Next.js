import { connectionDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request){
    const {name, email, password, about, profileURL=null} = await request.json();
    // console.log({name,email,password,about,profileURL});
    try{
        // when user singing up, then it will hit this connectionDB function to connect to the database
        await connectionDB();
    
        if(email && password && name && about){
            const isUserThere = await User.findOne({email:email});
            if(isUserThere){
                return NextResponse.json({
                    message: "User already exists",
                    success:false
                },{
                    status: 400
                });
            }else{
                const user = new User({name,email,password,about,profileURL});
                user.password = await bcrypt.hash(user.password,parseInt(process.env.BCRYPT_SALT));
                const userCreated = await user.save();
                
                return NextResponse.json(userCreated,{
                    message: "user created successfully",
                    status: 200
                });
            }

        }else{
            return NextResponse.json({
                message: "Please fill all the fields",
                status: 400
            });
        }  
    }catch(error){
        console.log('error in creating user');
        return NextResponse.json({
            message: "error creating user",
            success: false
        },{
            status:500
        }); 
    }
}

export async function GET(request){
    let users = [];
    try{
        await connectionDB();
        users = await User.find().select("-password");
        if(users.length === 0){
            return NextResponse.json({
                message: "No users found",
                status: 404
            });
        }

        return NextResponse.json(users,{
            status: 200
        });
    }catch(error){
        console.log('error in fetching users');
        return NextResponse.json({
            message: "error fetching users",
            status: 500
        });
    }
}