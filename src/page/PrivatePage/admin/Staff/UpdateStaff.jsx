import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Spin, message } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { getUser, updateUser } from "../../../../Services/UserServices";
import { Option } from "antd/es/mentions";
import { useDispatch } from "react-redux";
import { Reloadpage } from "../../../../Action/ReloadPage";

export default function UpdateStaff(props) {
  const { record } = props;
  const [info, setInfo] = useState({});
  const [isModel, setModel] = useState(false);
  const [messageAPI, contextHolder] = message.useMessage();
  const reload=false;
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");
  const [spining, setSpining] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setSpining(true);
      const res = await getUser(record.id,token);
      setInfo(res.data);
      setSpining(false);
    };
    fetchAPI();
  }, []);

  const handleFinish = async (values) => {
     setSpining(true);
     values.role=Array.of(values.role);
     const res=await updateUser(record.id,values,token)
     if(res.code===200){
        dispatch(Reloadpage(!reload));
        messageAPI.open({
          type: "success",
          content: "Cập nhập sản phẩm thành công",
          duration: 3,
        });
        setSpining(false);
      }
      else{
        messageAPI.open({
          type: "error",
          content: "Cập nhập sản phẩm thất bại!",
          duration: 3,
        });
        setSpining(false);
      }
  };

  const handleCancel = () => {
    setModel(false);
  };

  const handleOpen = () => {
    setModel(true);
  };

  return (
    <>
      <>
        {contextHolder}
        <Button
          className="ms-1"
          onClick={handleOpen}
          icon={<AppstoreAddOutlined />}
        />
        <Modal
          title="Cập nhập sản phẩm"
          width={1000}
          open={isModel}
          footer={null}
          onCancel={handleCancel}
        >
          <Spin spinning={spining} tip="Đang tải">

          <Form
            layout="horizontal"
            onFinish={handleFinish}
            initialValues={info}
          >

            <Row gutter={[20]}>
              <Col span={24}>
                <Form.Item label="Tên đăng nhập" name="username">
                  <Input placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Vai trò" name="role">
                  <Select placeholder="roles...">
                    <Option value="1">ADMIN</Option>
                    <Option value="2">STAFF</Option>
                    <Option value="3">USER</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button htmlType="submit" size="middle" type="primary">
                    Cập nhập
                  </Button>
                  <Button
                    onClick={handleCancel}
                    size="middle"
                    type="primary"
                    danger
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          </Spin>
        </Modal>
      </>
    </>
  );
}
