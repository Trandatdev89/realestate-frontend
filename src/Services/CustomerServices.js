import { post } from "../Utils/requestAPI";
import { DeleteAttachToken, getAttachToken, patchAttachToken, postAttachToken } from "../Utils/requestAPIToken";

export const searchCustomer=async(data,currentPage,token)=>{
    const res=await postAttachToken(`api/customer/search?page=${currentPage}&size=${2}`,data,token);
    return res;
}

export const searchAllCustomer=async(currentPage,token)=>{ 
    const res=await getAttachToken(`api/customer?page=${currentPage}&size=${2}`,token);
    return res;
}

export const createCustomer=async(data,token)=>{
    const res=await post("api/customer",data,token);
    return res;
}

export const getInfoUserAssignment=async(id,data,token)=>{
    const res=await getAttachToken(`api/customer/${id}/staff`,data,token);
    return res;
}

export const getAllCustomers=async(token)=>{
    const res=await getAttachToken(`api/customer/all`,token);
    return res;
}

export const assignmentCustomer=async(data,token)=>{
    const res=await postAttachToken(`api/customer/assignmentcustomer`,data,token);
    return res;
}

export const deleteCustomer=async(id,token)=>{
    const res=await DeleteAttachToken(`api/customer`,id,token);
    return res;
}


export const getInfoCustomer=async(id,token)=>{ 
    const res=await getAttachToken(`api/customer/${id}`,token);
    return res;
 }

export const updateCustomer=async(id,data,token)=>{ 
    const res=await patchAttachToken(`api/customer`,id,data,token);
    return res;
}

export const searchByStaff=async(currentPage,token)=>{ 
    const res=await getAttachToken(`api/customer/searchstaff?page=${currentPage}&size=${2}`,token);
    return res;
}


