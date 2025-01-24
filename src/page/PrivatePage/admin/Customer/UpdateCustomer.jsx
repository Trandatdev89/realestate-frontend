import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getInfoCustomer, updateCustomer } from '../../../../Services/CustomerServices';
import { Button, Col, Form, Input, message, Modal, Row, Spin } from 'antd';
import { Reloadpage } from '../../../../Action/ReloadPage';
import { AppstoreAddOutlined } from "@ant-design/icons";
import { myInfo } from '../../../../Services/UserServices';


export default function UpdateCustomer(props) {
  const { record } = props;
  const [result, setResult] = useState({});
  const token=localStorage.getItem("token");
  const reload=false;
  const dispatch=useDispatch();
  const [spining, setSpining] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setSpining(true);
      const res = await getInfoCustomer(record.id,token);
      setResult(res.data);
      setSpining(false);
    };
    fetchAPI();
  }, []);

  const [isModel, setModel] = useState(false);
  const [messageAPI, contextHolder] = message.useMessage();
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];

  const handleFinish = async (values) => {
    setSpining(true);
    const res=await updateCustomer(result.id,values,token);
    if(res.code===200){
      dispatch(Reloadpage(!reload));
      messageAPI.open({
        type: "success",
        content: "Cập nhập sản phẩm thành công",
        duration: 3,
      });
    }
    else{
      messageAPI.open({
        type: "error",
        content: "Cập nhập sản phẩm thất bại!",
        duration: 3,
      });
    }
    setSpining(false);
  };

  const handleCancel = () => {
    setModel(false);
  };

  const handleOpen = () => {
    setModel(true);
  };
  return (
    <>
      {contextHolder}
      <Button
        className="ms-1"
        onClick={handleOpen}
        icon={<AppstoreAddOutlined />}
        style={{backgroundColor:"#BF40BF"}}
      />
      <Modal title="Cập nhập sản phẩm" width={1000} open={isModel} footer={null} onCancel={handleCancel}>
      <Spin spinning={spining} tip="Đang tải">

        <Form
          layout="vertical"
          onFinish={handleFinish}
          encType="multipart/form-data"
          initialValues={result}
        >
          <Row gutter={[20]}>
            <Col span={12}>
              <Form.Item label="Tên đầy đủ" name="fullname">
                <Input placeholder="Tên đầy đủ..." rules={rules} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SDT" name="phone">
                <Input placeholder="SDT..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="email" name="email">
                <Input placeholder="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="nhu cầu" name="demand">
                <Input placeholder="demand" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" size="large" type="primary">
                  Cập nhập
                </Button>
                <Button
                  onClick={handleCancel}
                  size="large"
                  type="primary"
                  danger
                >
                  Hủy
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
      </Modal>
    </>
  );
}
