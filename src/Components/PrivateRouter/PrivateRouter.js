import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RefreshToken from "../../Auth/RefreshToken";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { ReloadLayout } from "../../Action/ReloadLayout";
import Fobiden from "../../page/error/Fobiden";

export default function PrivateRouter({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const data = useSelector((state) => state.Reload);
  const dispatch = useDispatch();

  setInterval(() => {
    dispatch(ReloadLayout(!data));
  }, 259200000);

  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  try {
    const tokenDecode = jwtDecode(token);
    const expiryTimeSeconds = tokenDecode.exp;
    const currentTimeSeconds = Math.floor(new Date().getTime() / 1000);

    if (currentTimeSeconds > expiryTimeSeconds) {
      localStorage.removeItem("token");
      return <Navigate to="/auth/login" />;
    } else {
      if(!allowedRoles.includes(tokenDecode.scope)){
         return <Navigate to="/fobiden"/>
      }
      else{
        if (currentTimeSeconds > expiryTimeSeconds - 120) {
          RefreshToken(token);
        }
        return <Outlet/>
      }
    }
  } catch (error) {
    <Navigate to="/auth/login" />;
  }
}
