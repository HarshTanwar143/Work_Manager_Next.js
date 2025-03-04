import { httpAxios } from "@/helper/httpHelper";


export async function loginUser(loginData){
    const response = await httpAxios.post('/api/login', loginData).
    then((response)=>response.data);

    return response;
}