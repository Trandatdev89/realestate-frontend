import { Col, Form, Pagination, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import {
  getDistrict,
  searchAllBuilding,
  searchBuilding,
} from "../../Services/BuildingServices";
import { Link } from "react-router-dom";


export default function Building() {
  const [district, setDistrict] = useState([]);
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [value, setValue] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(0);
  


  useEffect(() => {
    const fetchAPI = async () => {
      const res1 = await getDistrict();
      if (isSearch) {
        const res4 = await searchAllBuilding(pageCurrent);
        setData(res4.data);
      } else {
        const res = await searchBuilding(value, pageCurrent);
        setData(res.data);
      }
      setDistrict(res1);
    };
    fetchAPI();
  }, [pageCurrent, isSearch,value]);

  const handleFinish = async (values) => {
    const data = {
      district: values.district,
      demand: values.demand,
    };
    setValue(data);
    setIsSearch(false);
    setPageCurrent(0);
  };

  const handleChange = (e, f) => {
    setPageCurrent(e - 1);
  };


  return (
    <>
      <div className="search">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="search__title">Tìm kiếm nhanh tòa nhà</h1>
              <div className="search__form">
                <Form layout="vertical" onFinish={handleFinish}>
                  <Row gutter={[20]}>
                    <Col span={6}>
                      <Form.Item label="Chọn tỉnh/thành phố" name="city">
                        <Select placeholder="Select a city">
                          <Option value="HA_NOI">Hà Nội</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Chọn quận/huyện" name="district">
                        <Select placeholder="Select a district" options={district} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="Chọn nhu cầu" name="demand">
                        <Select placeholder="Select a demand">
                          <Option value="mua">Mua</Option>
                          <Option value="thue">Thuê</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <button className="btn btn-primary search__btn">
                          Search
                        </button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modelSearch">
        <div className="container">
          <div className="row">
          {(data?.data || []).map((item) => (
            <div className="col-4" key={item.id} style={{marginBottom:"20px"}}>
               <Link to={`/product/${item.id}`} style={{"textDecoration":'none',color:"#000"}}>
                <div className="search__box" style={{marginBottom:"20px"}}>
                  <div className="search__img">
                    <img src={item.uploadfile} alt="loading" />
                  </div>
                  <div className="search__content">
                    <div className="search__subtitle">{item.name}</div>
                    <div className="search__desc">{item.address}</div>
                    <div className="search__desc">Loại BDS : Chung cư</div>
                    <div className="search__desc">
                      Diện tích : {item.floorArea}m2
                    </div>
                  </div>
                </div>
            </Link>
              </div>
             
          ))}
          </div>
          <Pagination
            defaultCurrent={pageCurrent}
            pageSize={6}
            total={data?.totalItem}
            onChange={handleChange}
            align="center"
            style={{margin:"30px"}}
          />
        </div>
      </div>
    </>
  );
}
