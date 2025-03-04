import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectionDB } from "@/helper/db";


export async function GET(){
    try{
        await connectionDB();
        const tasks = await Task.find();
        if(tasks.length === 0){
            return NextResponse.json({
                message: "No tasks found",
                status: 404
            });
        }

        return NextResponse.json(tasks,{
            status: 200
        });
    }catch(error){
        console.log('error in fetching tasks');
        return NextResponse.json({
            message: "Error fetching tasks",
            status: 500
        });
    }
}

export async function POST(request) {
    const {title, content,status, userId} = await request.json();
    try{
        const authToken = request.cookies.get('authToken')?.value;
        const data = jwt.verify(authToken, process.env.JWT_SECRET);
        // console.log('this is data',data);
        await connectionDB();
        const task = new Task({
            title,
            content,
            status,
            userId:data._id
        });
        
        const newTask = await task.save();
        return NextResponse.json(newTask,{
            message: "Task created successfully",
            status: 201
        });
    }catch(error){
        console.log('error in creating task');
        return NextResponse.json({
            message: "Error creating task",
            status: 500
        });
    }
}