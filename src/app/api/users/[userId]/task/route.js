import { connectionDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


export async function GET(request,{params}){
    const {userId} = params;
    try{
        await connectionDB();
        const allTasks = await Task.find({userId: userId}).exec();
        if(allTasks.length === 0){
            return NextResponse.json({
                message: "No tasks found",
                status: 404
            });
        }
        return NextResponse.json(allTasks);
    }catch(error){
        console.log('error in fetching particular user tasks');
        return NextResponse.json({
            message: "Error fetching tasks",
            status: 500
        });
    }
}