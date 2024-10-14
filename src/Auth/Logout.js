import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutServices } from "../Services/AuthServices";
import { ReloadLayout } from "../Action/ReloadLayout";
import { isValidToken } from "./isValidToken";
import { Spin, message } from "antd";
import { Reloadpage } from "../Action/ReloadPage";


export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.Reload);


  useEffect(() => {
  
    const isvalid=isValidToken();

    if (isvalid) {
      const fetchAPI = async () => {
        const token=localStorage.getItem("token");
        const res = await logoutServices(token);
        localStorage.removeItem("token");
        sessionStorage.removeItem("hasReloaded");
        dispatch(ReloadLayout(!reload));
        navigate("/auth/login");
      };
      fetchAPI();
    }
  }, []);

  return<></>;
}
