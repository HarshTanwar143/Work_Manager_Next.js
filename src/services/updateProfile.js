import { httpAxios } from "@/helper/httpHelper";



export async function updateProfile(name, email, password, about, userId, profileURL){

    const response = await httpAxios.put(`/api/users/${userId}`, {name, email, password, about, profileURL}).
                    then((res)=>res.data);

    return response;
}