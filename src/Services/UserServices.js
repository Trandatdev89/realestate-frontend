import { getAttachToken, patchAttachToken } from "../Utils/requestAPIToken";

export const getUsers=async(token)=>{
   const res=await getAttachToken("api/user",token);
   return res;
}

export const getUser=async(id,token)=>{
    const res=await getAttachToken(`api/user/${id}`,token);
    return res;
}

export const searchUser=async(username,token)=>{
    const res=await getAttachToken(`api/user/search?username=${username}`,token);
    return res;
}


export const updateUser=async(id,data,token)=>{
    const res=await patchAttachToken("api/user",id,data,token);
    return res;
}

export const myInfo=async(token)=>{
    const res=await getAttachToken("api/user/my-info",token);
    return res;
}

