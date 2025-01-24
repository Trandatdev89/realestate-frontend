import React, { useEffect, useState } from "react";
import { myInfo } from "../../Services/UserServices";
import { getRoles } from "../../Components/helper/getRole";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function DropdownUser() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const role = getRoles();
  useEffect(() => {
    const fetchAPI = async () => {
      const User = await myInfo(token);
      setData(User.data);
    };
    fetchAPI();
  }, []);

  console.log(data)
  const items = [
    {
      key: "1",
      label: (
        <>
          {(role === "ADMIN" || role === "STAFF") && (
            <div className="dropdownUser__hover">
              <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                Trang quản lý
              </Link>
            </div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="dropdownUser__hover">
            <Link to="/info" style={{ textDecoration: "none" }}>
              Thông tin tài khoản
            </Link>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="dropdownUser__hover">
            <Link to="/auth/logout" style={{ textDecoration: "none" }}>
              Đăng xuất
            </Link>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="dropdownUser">
        <Dropdown
          arrow
          menu={{ items }}
          dropdownRender={(menu) => (
            <>
              <div className="dropdownUser__body">{menu}</div>
            </>
          )}
        >
          <div
            className="dropdownUser__render"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {data?.thumnail ? (<img src={data?.thumnail} alt="avatar" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>):( <UserOutlined />)}
            </div>
            <div style={{ marginLeft: "10px" }}>{data.fullname}</div>
          </div>
        </Dropdown>
      </div>
    </>
  );
}
