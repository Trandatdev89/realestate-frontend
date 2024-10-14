import { post } from "../Utils/requestAPI";
import { getAttachToken, patchAttachToken, postAttachToken } from "../Utils/requestAPIToken";

export const getAllTransaction=async(token)=>{
    const res=await getAttachToken(`api/transaction`,token);
    return res;
}


export const createTransaction=async(data)=>{
    const res=await post(`api/transaction`,data);
    return res;
}

export const updateTransaction=async(id,data,token)=>{
    const res=await patchAttachToken("api/transaction",id,data,token);
    return res;
}

export const getInfoByCustomerId=async(id,token)=>{
    const res=await getAttachToken(`api/transaction/check/${id}`,token);
    return res;
}