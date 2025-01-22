
import {get, post} from "../Utils/requestAPI"
import { DeleteAttachToken, getAttachToken, postAttachToken, postFormDataAttachToken, putFormDataAttachToken } from "../Utils/requestAPIToken";


export const getDistrict=async()=>{
    const res=await get("api/district");
    return res;
}

export const getTypeCode=async()=>{
    const res=await get("api/typecode");
    return res;
}

 export const getStaffAssignment=async(token)=>{
    const res=await getAttachToken("api/user/staff",token);
    return res;
}

export const searchBuilding=async(data,currentPage,username="")=>{
    const res=await post(`api/building/search?username=${username}&page=${currentPage}&size=${6}`,data);
    return res;
}

export const searchAllBuilding=async(currentPage,username="")=>{ 
    const res=await get(`api/building?username=${username}&page=${currentPage}&size=${6}`);
    return res;
}

export const createBuilding=async(data,token)=>{ 
   const res=await postFormDataAttachToken("api/building",data,token);
   return res;
}

export const getInfoBuilding=async(id,token)=>{ 
    const res=await get(`api/building/info/${id}`,token);
    return res;
 }

 export const getAllBuilding=async(token)=>{ 
    const res=await getAttachToken(`api/building/all`,token);
    return res;
 }


export const updateBuilding=async(id,data,token)=>{ 
    const res=await putFormDataAttachToken("api/building",id,data,token);
    return res;
}

export const deleteBuilding=async(id,token)=>{ 
    const res=await DeleteAttachToken("api/building",id,token);
    return res;
}

export const getInfoUserAssignment=async(buildingId,token)=>{ 
    const res=await getAttachToken(`api/building/${buildingId}/staff`,token);
    return res;
}

export const assignmentBuilding=async(data,token)=>{ 
    const res=await postAttachToken("api/building/assignment",data,token);
    return res;
}

