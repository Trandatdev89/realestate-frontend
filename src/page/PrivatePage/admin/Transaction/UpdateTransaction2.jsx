import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, {  useState } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Reloadpage } from "../../../../Action/ReloadPage";
import { updateTransaction } from "../../../../Services/TransactionServices";

export default function UpdateTransaction2(props) {
  const { record } = props;
  console.log(record);
  const token = localStorage.getItem("token");
  const dispatch=useDispatch();
  const reload=useSelector(state=>state.Reload);
  const [isModel, setModel] = useState(false);
  const [messageAPI, contextHolder] = message.useMessage();
 
  const handleFinish = async (values) => {
    const res = await updateTransaction(record,{},token);
    if (res.code === 200) {
      dispatch(Reloadpage(!reload));
      messageAPI.open({
        type: "success",
        content: "Cập nhập sản phẩm thành công",
        duration: 3,
      });
    } else {
      messageAPI.open({
        type: "error",
        content: "Cập nhập sản phẩm thất bại!",
        duration: 3,
      });
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
      <Button className="mr-2"
        onClick={handleOpen}
        type="primary"
        title="Thanh toán tiền mặt"
       >Thanh toán tiền mặt</Button>
      <Modal
        title="Cập nhập giao dịch"
        width={1000}
        open={isModel}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
        >
          <Row gutter={[20]}>
            <Col span={12}>
              <Form.Item label="Trạng thái" name="status">
                <Select>
                  <Option value="true">Đã thanh toán</Option>
                  <Option value="false">Chưa thanh toán</Option>
                </Select>
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
      </Modal>
    </>
  );
}
