import React, { useEffect, useState } from "react";
import { Button, Card, Table, Tag, Tooltip } from "antd";
import { getRoles } from "../../../../Components/helper/getRole";
import { getAllTransaction } from "../../../../Services/TransactionServices";
import { getAllBuilding } from "../../../../Services/BuildingServices";
import { getAllCustomers } from "../../../../Services/CustomerServices";
import { getUsers } from "../../../../Services/UserServices";
import { DeliveredProcedureOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";


export default function TableTransaction() {
  const role = getRoles();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getAllTransaction(token);
      const getAllBuildings = await getAllBuilding(token);
      const getAllCustomer = await getAllCustomers(token);
      const getAllStaffs = await getUsers(token);
      const resultFinal = res.map((item) => {
        item.buidling = getAllBuildings.data.find(
          (item1) => item1.id === item.buildingid
        );
        item.customer = getAllCustomer.data.find(
          (item1) => item1.id === item.customerid
        );
        if (item.staffid) {
          item.staff = getAllStaffs.data.find(
            (item1) => item1.id === item.staffid
          );
        }
        return item;
      });

      setData(resultFinal);
    };
    fetchAPI();
  }, []);

  console.log(data);

  const columns = [
    {
      title: "Tên tòa nhà",
      dataIndex: "buidling",
      render: (record) => {
        return <>{record.name}</>;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
      render: (record) => {
        return <>{record.fullname}</>;
      },
    },
    {
      title: "Nhu cầu",
      dataIndex: "customer",
      render: (record) => {
        return <>{record.demand}</>;
      },
    },
    {
      title: "Phone",
      dataIndex: "customer",
      render: (record) => {
        return <>{record.phone}</>;
      },
    },
    {
      title: "email",
      dataIndex: "customer",
      render: (record) => {
        return <>{record.email}</>;
      },
    },
    {
      title: "Ngày tao",
      dataIndex: "createddate",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <>
            {record.status ? (
              <Tag color="success">Đã thanh toán</Tag>
            ) : (
              <Tag color="error">Chưa thanh toán</Tag>
            )}
          </>
        );
      },
    },
    {
      key: "action",
      title: "Hành Động",
      render: (_, record) => {
        return (
          <>
            <div
              className="action"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(role === "ADMIN" || role === "STAFF") && (
                <>
                  <Tooltip title="Cập nhập giao dịch">
                    <Link to={`/admin/update-transaction/${record.id}`}>
                      <Button
                        className="ms-1"
                        style={{ backgroundColor: "#FF7F50" }}
                        icon={<DeliveredProcedureOutlined />}
                      />
                    </Link>
                  </Tooltip>
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card
        style={{ overflowX: "scroll", height: "100vh" }}
        title="Danh sách các khách hàng"
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
    </>
  );
}
