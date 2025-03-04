import { httpAxios } from "@/helper/httpHelper";

export async function currentUser() {
    const response = await httpAxios.get('/api/current').then((res)=>res.data);
    return response;
}