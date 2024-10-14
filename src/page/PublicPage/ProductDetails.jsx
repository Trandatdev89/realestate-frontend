import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInfoBuilding } from "../../Services/BuildingServices";
import { createCustomer } from "../../Services/CustomerServices";
import { notification } from "antd";
import { createTransaction } from "../../Services/TransactionServices";

export default function ProductDetails() {
  const param = useParams();
  const [data, setData] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  const token=localStorage.getItem("token");
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getInfoBuilding(param.id,token);
      setData(res.data);
    };
    fetchAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      fullname: e.target.elements.fullname.value,
      phone: e.target.elements.phone.value,
      email: e.target.elements.email.value,
    };
    const res = await createCustomer(obj);

    const obj2={
      buildingid:parseInt(param.id),
      customerid:parseInt(res.data.id)
    }
    const result=await createTransaction(obj2);
    if(res.code===200){
      api.open({
        message: 'Thông báo',
        description:
          'Liên hệ thành công chúng tôi sẽ gửi mail cho bạn sớm nhất có thể.',
        type:"success"
      });
    }
    else{
      api.open({
        message: 'Thông báo',
        description:
          'Liên hệ thất bại.',
        type:"error"
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="ProductDetails">
        <h3 style={{ textAlign: "center", margin: "50px 0" }}>
          Chi tiết sản phẩm
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="ProductDetails__box">
                <div className="ProductDetails__img">
                  <img src={data?.uploadfileString} alt="loading..." />
                </div>
                <div className="ProductDetails__content">
                  <div className="ProductDetails__subtitle">
                    Tên : {data?.name}
                  </div>
                  <div className="ProductDetails__desc">
                    Địa chỉ : {data?.address}
                  </div>
                  <div className="ProductDetails__desc">
                    Loại BDS : Chung cư
                  </div>
                  <div className="ProductDetails__desc">
                    Diện tích sàn : {data?.floorArea}m2
                  </div>
                  <div className="ProductDetails__desc">
                    Tên Quản lý : {data?.managername}
                  </div>
                  <div className="ProductDetails__desc">
                    SDT Quản lý : {data?.managerphone}
                  </div>
                  <div className="ProductDetails__desc">
                    Số tầng hầm : {data?.numberofbasement}
                  </div>
                  <div className="ProductDetails__desc">
                    Diện tích thuê : {data?.rentAreaString}m2
                  </div>
                  <div className="ProductDetails__desc">
                    Giá thuê : {data?.rentprice} triệu
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="ProductDetails__contact">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                      <div className="bg-info text-white text-center py-2">
                        <h3>
                          <i className="fa fa-envelope" /> Contactanos
                        </h3>
                        <p className="m-0">Con gusto te ayudaremos</p>
                      </div>
                    </div>
                    <div className="card-body p-3">
                      <div className="form-group">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div
                              className="input-group-text"
                              style={{ height: "100%" }}
                            >
                              <i className="fa fa-user text-info" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            name="fullname"
                            placeholder="fullname"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div
                              className="input-group-text"
                              style={{ height: "100%" }}
                            >
                              <i className="fa fa-envelope text-info" />
                            </div>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="ejemplo@gmail.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div
                              className="input-group-text"
                              style={{ height: "100%" }}
                            >
                              <i className="fa fa-comment text-info" />
                            </div>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Phone"
                            id="phone"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <input
                          type="submit"
                          defaultValue="Enviar"
                          className="btn btn-info btn-block rounded-0 py-2"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
