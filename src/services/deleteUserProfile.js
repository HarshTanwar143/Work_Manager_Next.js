import { httpAxios } from "@/helper/httpHelper";




export async function deleteUserProfile(userId){
    const response = await httpAxios.delete(`/api/users/${userId}`)
                    .then((res) => res.data);
    
    return response;
}