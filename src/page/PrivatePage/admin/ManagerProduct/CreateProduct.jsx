import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";

import {
  createBuilding,
  getDistrict,
  getTypeCode,
} from "../../../../Services/BuildingServices";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";

export default function CreateProduct() {
  const [district, setDistrict] = useState([]);
  const [typeCode, setTypeCode] = useState([]);
  const token=localStorage.getItem("token");
  const rules = [
    {
      required: true,
      message: "Please input your field!",
    },
  ];

  const [form] = Form.useForm();
  const [messageAPI, contextHolder] = message.useMessage();

  const handleFinish = async (values) => {
    values.uploadfile = document.getElementById("uploadfile").files[0];
    const res = await createBuilding(values,token);
    console.log(res);
    if (res.code === 200) {
      form.resetFields();
      messageAPI.open({
        type: "success",
        content: "Tạo mới sản phẩm thành công",
        duration: 3,
      });
    } else {
      messageAPI.open({
        type: "error",
        content: "Tạo mới sản phẩm thất bại!",
        duration: 3,
      });
    }
  };

  const handleClick = () => {
    form.resetFields();
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const res1 = await getDistrict();
      const res3 = await getTypeCode();
      setDistrict(res1);
      setTypeCode(res3);
    };
    fetchAPI();
  }, []);

  return (
    <>
      {contextHolder}
      <h2 style={{textAlign:"center",margin:"30px 0"}}>Tạo mới tòa nhà</h2>
      <div>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          encType="multipart/form-data"
          form={form}
        >
          <Row gutter={[20]}>
            <Col span={12}>
              <Form.Item label="Tên tòa nhà" name="name">
                <Input placeholder="Tên tòa nhà..." rules={rules} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Diện tích sàn" name="floorarea">
                <Input placeholder="diện tích sàn..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Quận" name="district">
                <Select options={district} placeholder="Quận..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đường" name="street">
                <Input placeholder="Đường" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phường" name="ward">
                <Input placeholder="Phường..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số tầng hầm" name="numberofbasement">
                <Input placeholder="Số tầng hầm..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hướng" name="direction">
                <Input placeholder="Hướng..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Kết cấu" name="structure">
                <Input placeholder="Phí môi giới..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hạng" name="level">
                <Input placeholder="Hạng..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Diện tích thuê" name="rentAreaString">
                <Input placeholder="Diện tích thuê..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá thuê" name="rentprice">
                <Input placeholder="Giá thuê ..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phí dịch vụ" name="servicefee">
                <Input placeholder="Phí dịch vụ..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phí môi giới" name="brokeragefee">
                <Input placeholder="Phí môi giới..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nhu cầu" name="demand">
                <Select>
                  <Option value="mua">Mua</Option>
                  <Option value="thue">Thuê</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên quản lý" name="managername">
                <Input placeholder="Tên quản lý..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SĐT" name="managerphone">
                <Input placeholder="SDT" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Loại tòa nhà" name="typeCode">
                <Checkbox.Group options={typeCode} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tải avatar" name="uploadfile">
                <input type="file" id="uploadfile" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ghi chú" name="note">
                <TextArea placeholder="Ghi chú..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" size="large" type="primary">
                  Submit
                </Button>
                <Button
                  onClick={handleClick}
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
      </div>
    </>
  );
}
