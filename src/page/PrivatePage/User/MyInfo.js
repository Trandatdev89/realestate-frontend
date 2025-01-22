import React from "react";
import LoadingPage from "../../../Animation/LoadingPage.jsx";
import { useEffect, useState } from "react";
import { Col, Row, message } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { Button, Form, Input } from "antd";
import GoBack from "../../../GoBack/Goback.jsx";
import { myInfo, updateUserForm } from "../../../Services/UserServices.js";

export default function MyInfo() {
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [Edit, IsEdit] = useState(true);
  const [form] = Form.useForm();
  const [reload, setReload] = useState([]);
  const token = localStorage.getItem("token");
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const handleClick = () => {
    IsEdit(false);
  };
  const handleCancel = () => {
    IsEdit(true);
  };

  const fetchAPI = async () => {
    const user = await myInfo(token);
    setData(user.data);
  };
  useEffect(() => {
    fetchAPI();
  }, [reload]);

  const handleFinish = async (value) => {
    value.thumnail = document.getElementById("uploadfile").files[0];
    const res = await updateUserForm(data.id, value, token);
    if (res.code === 200) {
      IsEdit(true);
      messageApi.open({
        type: "success",
        content: "Cập nhập thành công",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhập thất bại",
      });
    }
  };
  useEffect(() => {
    form.resetFields(); //đoạn này là để giúp initialValue hoạt động
  }, [data]);
  return (
    <>
      {contextHolder}
      <GoBack />
      {data ? (
        <div className="container">
          <div className="infoUser">
            <Row gutter={[15, 15]}>
              <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
                <div className="infoUser__nav">
                  <div className="infoUser__img">
                    {data.thumnail?(<img src={data.thumnail} alt="avatar"/>):( <UserOutlined />)}
                    <h5>{data.fullName}</h5>
                  </div>
                  <hr />
                  <div className="infoUser__me">
                    <span>
                      <UserOutlined />{" "}
                    </span>
                    Tài khoản của tôi
                  </div>
                </div>
              </Col>
              <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
                <div className="infoUser__main">
                  <div
                    className="infoUser__wrap"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3>Hồ sơ của tôi</h3>
                      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </div>
                    <div>
                      {Edit ? (
                        <Button type="primary" onClick={handleClick}>
                          Chỉnh sửa
                        </Button>
                      ) : (
                        <Button danger onClick={handleCancel}>
                          Hủy
                        </Button>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="infoUser__form">
                    <Form
                      initialValues={data}
                      size="large"
                      layout="vertical"
                      disabled={Edit}
                      form={form}
                      onFinish={handleFinish}
                      encType="multipart/form-data"
                    >
                      <Form.Item
                        label="Tên đầy đủ"
                        name="fullname"
                        rules={rules}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="Địa chỉ" name="address">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Avatar" rules={rules}>
                        <input type="file" id="uploadfile" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" size="middle">
                          Cập nhập
                        </Button>
                        <Button
                          className="ms-2"
                          size="middle"
                          onClick={handleCancel}
                          type="primary"
                          htmlType="submit"
                        >
                          Cancel
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
