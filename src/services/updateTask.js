import { httpAxios } from "@/helper/httpHelper";


export async function updateTaskStatus(status, taskId){
    const response = await httpAxios.put(`/api/tasks/${taskId}`,{
        status
    }).then(res => res.data);

    return response;
}