import { commonAPI } from "./commonAPI";

export const LoginApi = async(username,password)=>{
    const headers = {username:username,password:password}
    return await commonAPI("POST","http://localhost:3000/login",{},headers)
}