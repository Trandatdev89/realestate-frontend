import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getDistrict,
  getStaffAssignment,
  getTypeCode,
  searchAllBuilding,
  searchBuilding,
} from "../../../Services/BuildingServices";
import TableAdmin from "./TableAdmin";
import { useSelector } from "react-redux";
import { getRoles } from "../../../Components/helper/getRole";
import { myInfo } from "../../../Services/UserServices";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
  const [district, setDistrict] = useState([]);
  const [typeCode, setTypeCode] = useState([]);
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [value, setValue] = useState([]);
  const reload = useSelector((state) => state.Reload);
  const [pageCurrent, setPageCurrent] = useState(0);
  

  const token=localStorage.getItem("token");
  const username=jwtDecode(token).sub;
  const role = getRoles();

  const rules = [
    {
      required: true,
      message: "Please input your field!",
    },
  ];

  
  useEffect(() => {
    const fetchAPI = async () => {
      const res1 = await getDistrict();
      const res2 = await getStaffAssignment(token);
      const res3 = await getTypeCode();

      if (isSearch) {
        const res4 = await searchAllBuilding(pageCurrent,username);
        setData(res4.data);
      } else {
          const res = await searchBuilding(value, pageCurrent,username);
          setData(res.data);
        }
     

      setDistrict(res1);
      setStaff(res2);
      setTypeCode(res3);
    };
    fetchAPI();
  }, [pageCurrent, isSearch, reload,value]);

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
      <div className="title">Tìm kiếm tòa nhà</div>
      {data ? (
        <>
          <div>
            <Form layout="vertical" onFinish={handleFinish}>
              <Row gutter={[20]}>
                <Col span={12}>
                  <Form.Item label="Tên tòa nhà" name="name">
                    <Input placeholder="Tên tòa nhà..." rules={rules} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Diện tích sàn" name="floorArea">
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
                  <Form.Item label="Số tầng hầm" name="numberOfBasement">
                    <Input placeholder="Số tầng hầm..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Hướng" name="direction">
                    <Input placeholder="Hướng..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Hạng" name="level">
                    <Input placeholder="Hạng..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Diện tích thuê từ" name="areaFrom">
                    <Input placeholder="Diện tích thuê từ..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Diện tích thuê đến" name="areaTo">
                    <Input placeholder="Diện tích thuê đến..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Giá thuê từ" name="rentPriceFrom">
                    <Input placeholder="Giá thuê từ..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Giá thuê đến" name="rentPriceTo">
                    <Input placeholder="Giá thuê đến..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên quản lý" name="managerName">
                    <Input placeholder="Tên quản lý..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="SĐT" name="managerPhone">
                    <Input placeholder="SDT" />
                  </Form.Item>
                </Col>
                {role === "ADMIN" && (
                  <Col span={12}>
                    <Form.Item label="Chọn nhân viên phụ trách" name="staffId">
                      <Select placeholder="Nhân viên..." options={staff} />
                    </Form.Item>
                  </Col>
                )}
                <Col span={12}>
                  <Form.Item label="Loại tòa nhà" name="typeCode">
                    <Checkbox.Group options={typeCode} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button htmlType="submit" size="large" type="primary">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>

          <div>
            <TableAdmin data={data} />
            <Pagination
              align="center"
              defaultCurrent={pageCurrent}
              pageSize={6}
              total={data?.totalItem}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <h1>Loading data</h1>
      )}
    </>
  );
}
