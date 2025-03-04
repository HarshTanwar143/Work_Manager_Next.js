import { httpAxios } from "@/helper/httpHelper";


export async function logoutUser(){
    const response = await httpAxios.post('/api/logout').
                        then(res => res.data);

    return response;
}