import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Card, Spin, Table, Tooltip } from "antd";
import UpdateStaff from "./UpdateStaff";
import { getUsers, searchUser } from "../../../../Services/UserServices";

export default function Staff() {
  const [spining, setSpining] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullname",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth",
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <>
            {record.role?.includes("ADMIN") ? (
              "không thao tác được"
            ) : (
              <div>
                <Tooltip title="Sửa sản phẩm">
                  <UpdateStaff record={record} />
                </Tooltip>
              </div>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAPI = async () => {
      setSpining(true);
      const res = await getUsers(token);
      setData(res.data);
      setSpining(false);
    };
    fetchAPI();
  }, []);

  const onSearch = async (value, index) => {
    if (value !== "" && value !== undefined && value !== null) {
      setSpining(true);
      const res = await searchUser(value, token);
      if (res.code === 200) {
        const resList = Array.of(res.data);
        setData(resList);
        setSpining(false);
      } else {
        setSpining(false);
        alert(res.message);
      }
    } else {
      alert("Hay nhap gia tri tim kiem!");
    }
  };

  return (
    <div className="Staff">
      <h3 style={{ textAlign: "center" }}>Tìm kiếm nhân viên</h3>
      <Search
        placeholder="Tìm kiếm nhân viên theo username hoặc tên đầy đủ "
        allowClear
        enterButton="Search"
        size="middle"
        prefix={<UserOutlined />}
        onSearch={onSearch}
        style={{
          width: 300,
        }}
      />
      <Card
        style={{ overflowX: "scroll", height: "100vh" }}
        title="Danh sách các sản phẩm"
      >
        <Spin spinning={spining} tip="Đang tải">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </Spin>
      </Card>
    </div>
  );
}
