import { Button, Col, Form, Input, Pagination, Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import TableCustomer from "./TableCustomer";
import { useSelector } from "react-redux";
import { getStaffAssignment } from "../../../../Services/BuildingServices";
import {
  searchAllCustomer,
  searchCustomer,
} from "../../../../Services/CustomerServices";
import { getRoles } from "../../../../Components/helper/getRole";


export default function Customer() {
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [value, setValue] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [staff, setStaff] = useState([]);
  const token = localStorage.getItem("token");
  const reload = useSelector((state) => state.Reload);
  const role = getRoles();
  const [spining, setSpining] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setSpining(true);
      const res2 = await getStaffAssignment(token);
      setStaff(res2);
      if (isSearch) {
        const res4 = await searchAllCustomer(pageCurrent, token);
        setData(res4.data);
      } else {
        const res = await searchCustomer(value, pageCurrent, token);
        setData(res.data);
      }
      setSpining(false);
    };
    fetchAPI();
  }, [pageCurrent, isSearch, reload, value]);

  const handleFinish = async (values) => {
    setValue(values);
    setIsSearch(false);
    setPageCurrent(0);
  };

  const handleChange = (e, f) => {
    setPageCurrent(e - 1);
  };
  return (
    <>
      <div className="title">Tìm kiếm khách hàng</div>
      <Spin spinning={spining} tip="Đang tải">

      <div>
        <Form layout="vertical" onFinish={handleFinish}>
          <Row gutter={[20]}>
            <Col span={12}>
              <Form.Item label="Tên khách hàng" name="fullname">
                <Input placeholder="Tên tòa nhà..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SDT" name="phone">
                <Input placeholder="SDT..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not a valid email!",
                  },
                ]}
              >
                <Input placeholder="email..." />
              </Form.Item>
            </Col>
            {role === "ADMIN" && (
              <Col span={12}>
                <Form.Item label="Chọn nhân viên phụ trách" name="staffid">
                  <Select placeholder="Nhân viên..." options={staff} />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" size="large" type="primary">
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <TableCustomer data={data} />
        <Pagination
          defaultCurrent={pageCurrent}
          pageSize={2}
          total={data?.totalItem}
          onChange={handleChange}
          align="center"
        />
      </div>
      </Spin>
    </>
  );
}
