import axios from 'axios';
export const commonAPI = async(httpMethod,url,requestBody,reqHeader)=>{
    let reqConfig = {
        method:httpMethod,
        url,
        headers:reqHeader?reqHeader:{
            "Content-Type":"application/json"
        },
        data:requestBody
    }
    return await axios(reqConfig).then((result)=>{
        return result;
    }).catch((error)=>{
        return error
    })
}