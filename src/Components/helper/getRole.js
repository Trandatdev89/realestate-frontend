import { jwtDecode } from "jwt-decode";

export const getRoles=()=>{
    const token=localStorage.getItem("token");
    try {
        const tokenDecode=jwtDecode(token);
        return tokenDecode.scope;
    } catch (error) {
       console.log(error); 
    }
}