import { User } from "@/models/user";
import mongoose, { connection } from "mongoose";

const config = {
    isConnected : 0
}

export const connectionDB = async () => {
    if(!config.isConnected){
        try{
            const {connecton} = await mongoose.connect(process.env.MONGO_URL, {dbName: "work_manager"});
            console.log("Database connected successfully....");
            // console.log(connection.readyState);
            config.isConnected = connection.readyState;
        }catch(error){
            console.log("Database connection failed!");
            console.log('Database Error: ', error);
        }
    }
}