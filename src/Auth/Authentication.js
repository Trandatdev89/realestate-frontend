import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginGoogle } from "../Services/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { ReloadLayout } from "../Action/ReloadLayout";
import LoadingPage from "../Animation/LoadingPage";

export default function Authentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Reload);

  useEffect(() => {
    const fetchAPI = async (authCode) => {
      try {
        const res = await loginGoogle(authCode);
        return res;
      } catch (error) {
        console.error("Error logging in with Google:", error);
        return null;
      }
    };
  
    const handleLogin = async () => {
      const authCodeRegex = /code=([^&]+)/;
      const isMatch = window.location.href.match(authCodeRegex);
  
      if (isMatch) {
        const authCode = isMatch[1];
        const res = await fetchAPI(authCode); // Đặt `await` ở đây để đợi kết quả từ `fetchAPI`.
        console.log(res);
        if (res && res.data?.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isLogin", true);
          dispatch(ReloadLayout(!data));
          navigate("/");
        }
      }
    };
  
    handleLogin(); 
  }, [dispatch, data]);

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",maxHeight:"100vh"}}>
      <div style={{textAlign:"center",marginTop:"50px"}}>
        <h2>Authentication...</h2>
        <LoadingPage />
      </div>
    </div>
  );
}
