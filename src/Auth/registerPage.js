import React from "react";
import { Button, DatePicker, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/AuthServices";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [spining, setSpining] = useState(false);
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values) => {
    setSpining(true);
    const res = await register(values);

    if (res.data) {
      setSpining(false);
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công",
      });
      form.resetFields();
      navigate("/auth/login");
    } else {
      setSpining(false);
      messageApi.open({
        type: "error",
        content: `${res.message}`,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="register" style={{marginTop:"50px"}}>
        <div className="container">
          <div className="register__box">
            <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản</h2>
            <Spin spinning={spining} tip="Đang đăng ký">
              <Form onFinish={handleFinish} layout="vertical" form={form}>
                <Form.Item label="Tên tài khoản" name="username" rules={rules}>
                  <Input placeholder="Nhap Tên dang nhap..." />
                </Form.Item>
                <Form.Item
                  label="Nhập ten day du"
                  name="fullname"
                  rules={rules}
                >
                  <Input placeholder="Nhập ten day du..." />
                </Form.Item>
                <Form.Item label="Nhập Email" name="email" rules={rules}>
                  <Input placeholder="Nhập Email..." />
                </Form.Item>
                <Form.Item label="Nhập DC" name="address" rules={rules}>
                  <Input placeholder="Nhập DC..." />
                </Form.Item>
                <Form.Item label="Nhập mật khẩu" name="password" rules={rules}>
                  <Input.Password placeholder="Nhập mật khẩu..." />
                </Form.Item>
                <Form.Item label="Nhập ngày sinh" name="birth" rules={rules}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    placeholder="DD/MM/YYYY"
                    allowClear={false}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: "100%" }}
                    htmlType="submit"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
}
