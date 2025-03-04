import { httpAxios } from "@/helper/httpHelper";


export async function getUserTasks(userId){
    const response = await httpAxios.get(`/api/users/${userId}/task`).
                    then(res => res.data);
    return response;        
}