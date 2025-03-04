import mongoose, { Schema } from "mongoose";


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type:String,
        required:true
    },
    addedDate:{
        type: Date,
        default: Date.now(),
        required: true
    },
    status:{
        type:String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    userId:{
        type: mongoose.ObjectId,
        required:true
    }
});

export const Task = mongoose.models.task || mongoose.model('task',taskSchema);