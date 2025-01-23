const API_DOMAIN="https://realestate-backend-jdo0.onrender.com/";


export const get=async(path)=>{
    const response=await fetch(API_DOMAIN+path,{
      method: "GET",
      headers: {
        Accept:"application/json",
        "Content-Type": "application/json", 
      }
    });
    const data=await response.json();
    return data;
}

export const post=async(path,dataObj)=>{
    const result = await fetch(API_DOMAIN+path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      const data = await result.json();
      return data;
}

export const Delete=async (path,id)=>{
    const res=await fetch(`${API_DOMAIN}${path}/${id}`, {
        method: "DELETE",
    })
    const data=res.json();
    return data;
}

export const patch=async (path,id,dataObj)=>{
    const result = await fetch(`${API_DOMAIN}${path}/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      const data = await result.json();
      return data;
}


export const postFormData=async(path,dataObj)=>{
  const formData = new FormData(); 
  Object.keys(dataObj).forEach(key => {
        if(dataObj[key]!==undefined){
           formData.append(key,dataObj[key])
        }
  });
  const result = await fetch(API_DOMAIN+path, {
    method: 'POST',
    body: formData,  
  });
    const data = await result.json();
    return data;
}

export const putFormData=async(path,id,dataObj)=>{
  const formData = new FormData(); 
  Object.keys(dataObj).forEach(key => {
        if(dataObj[key]!==undefined){
           formData.append(key,dataObj[key])
        }
  });
  const result = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: 'PUT',
    body: formData,  
  });
    const data = await result.json();
    return data;
}