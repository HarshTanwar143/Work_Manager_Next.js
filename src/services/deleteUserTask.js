import { httpAxios } from "@/helper/httpHelper";



export async function deleteUserTask(taskId){
    const response = await httpAxios.delete(`/api/tasks/${taskId}`).then((res) => res.data);
    //console.log('deleted response:', response);
    return response;
}