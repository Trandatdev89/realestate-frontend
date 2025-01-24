import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutServices } from "../Services/AuthServices";
import { ReloadLayout } from "../Action/ReloadLayout";
import { isValidToken } from "./isValidToken";
import { Spin, message } from "antd";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.Reload);
  const [spining, setSpining] = useState(false);

  useEffect(() => {
  
    const isvalid=isValidToken();

    if (isvalid) {
      const fetchAPI = async () => {
        setSpining(true);
        const token=localStorage.getItem("token");
        const res = await logoutServices(token);
        localStorage.removeItem("token");
        dispatch(ReloadLayout(!reload));
        navigate("/auth/login");
        setSpining(false);
      };
      fetchAPI();
    }
  }, []);

  return<Spin spinning={spining} tip="Đang đăng xuất">
    <div style={{maxHeight:"100vh"}}></div>
  </Spin>;
}
