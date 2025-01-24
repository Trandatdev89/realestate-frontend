import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  getDistrict,
  getInfoBuilding,
  getTypeCode,
  updateBuilding,
} from "../../../../Services/BuildingServices";
import { useDispatch } from "react-redux";
import { Reloadpage } from "../../../../Action/ReloadPage";
import { Option } from "antd/es/mentions";

export default function UpdateProduct(props) {
  const { record } = props;

  const [result, setResult] = useState({});
  const [district, setDistrict] = useState([]);
  const [typeCode, setTypeCode] = useState([]);
  const inputRef = useRef(null);
  const token = localStorage.getItem("token");
  const reload = false;
  const dispatch = useDispatch();
  const [spining, setSpining] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setSpining(true);
      const res = await getInfoBuilding(record.id, token);
      const res1 = await getDistrict();
      const res3 = await getTypeCode();
      setDistrict(res1);
      setTypeCode(res3);
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
    values.uploadfile = inputRef.current.files[0];
    const res = await updateBuilding(result.id, values, token);
    if (res.code === 200) {
      dispatch(Reloadpage(!reload));
      messageAPI.open({
        type: "success",
        content: "Cập nhập sản phẩm thành công",
        duration: 3,
      });
      setSpining(false);
    } else {
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
      {contextHolder}
      <Button
        className="ms-1"
        onClick={handleOpen}
        icon={<AppstoreAddOutlined />}
        style={{ backgroundColor: "#BF40BF" }}
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
            layout="vertical"
            onFinish={handleFinish}
            encType="multipart/form-data"
            initialValues={result}
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
                <Form.Item label="Tải avatar">
                  <input type="file" id="uploadfile" ref={inputRef} required />
                </Form.Item>
                {result?.uploadfileString && (
                  <div>
                    <Image
                      src={result?.uploadfileString}
                      alt="loading..."
                      width={100}
                      height={100}
                    />
                  </div>
                )}
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
