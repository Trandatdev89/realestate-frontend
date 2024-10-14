import { Button, Card, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import { getInfoByCustomerId } from "../../../../Services/TransactionServices";

import { getInfoBuilding } from "../../../../Services/BuildingServices";
import { useParams } from "react-router-dom";
import UpdateTransaction2 from "./UpdateTransaction2";

export default function UpdateTransaction() {
  const param = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Id nha",
      dataIndex: "buildingid",
    },
    {
      title: "Tên tòa nhà",
      dataIndex: "name",
    },
    {
      title: "Trạng thái thanh toán",
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
              
            >
               <Tooltip title="Sửa giao dich">
                <div>
                  <UpdateTransaction2 record={record} />
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getInfoByCustomerId(param.id, token);
      const updatedRes = await Promise.all(
        res.map(async (item) => {
          const building = await getInfoBuilding(item.buildingid, token);
          // Cập nhật thuộc tính name từ building
          return {
            ...item,
            name: building.data.name, // Gán giá trị name từ kết quả API
          };
        })
      );
      setData(updatedRes);
    };
    fetchAPI();
  }, []);



  return (
    <>
      <Card
        style={{ overflowX: "scroll", height: "100vh" }}
        title="Danh sách các giao dich"
      >
        <Table
          rowKey="id"
          dataSource={data}
          pagination={false}
          columns={columns}
        />
      </Card>
    </>
  );
}
