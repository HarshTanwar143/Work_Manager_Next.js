import { connectionDB } from "@/helper/db";
import { Task } from "@/models/task";
import { connection, NextResponse } from "next/server";


export async function GET(request,{params}){
    const {taskId} = params;
    // console.log(taskId);
    try{
        await connectionDB();
        const task = await Task.findById(taskId);
        if(!task){
            return NextResponse.json({
                message: "Task not found",
                status: 404
            });
        }

        return NextResponse.json(task,{
            message: "fetched task successfully",
            status: 200
        });
    }catch(error){
        console.log('error in fetching task');
        return NextResponse.json({
            message: "Error fetching task",
            status: 500
        });
    }
}

export async function PUT(request,{params}){
    const {taskId} = params;
    const {title,content,status,userId} = await request.json();
    try{
        await connectionDB();
        const task = await Task.findByIdAndUpdate(taskId,{title,content,status,userId},{new:true}).exec();

        return NextResponse.json(task,{
            message: "Task updated successfully",
            status: 200
        });
    }catch(error){
        console.log('error in updating task');
        return NextResponse.json({
            message: "Error updating task",
            status: 500
        });
    }
}

export async function DELETE(request,{params}){
    const {taskId} = params;
    try{
        await connectionDB();
        const task = await Task.findByIdAndDelete(taskId);
        return NextResponse.json(task,{
            message: "Task deleted successfully",
            status: 200
        });
    }catch(error){
        console.log('error in deleting task');
        return NextResponse.json({
            message: "Error deleting task",
            status: 500
        });
    }
}