import { httpAxios } from "@/helper/httpHelper";


export async function signUp(user){
    const response = await httpAxios.
    post('/api/users', user).
    then((response)=>response.data);

    // console.log('this is resonse : ', response);

    return response;
}