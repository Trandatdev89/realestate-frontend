import { Button, Card, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { getRoles } from "../../../../Components/helper/getRole";
import {
  getAllTransaction,
  getInfoByCustomerId,
} from "../../../../Services/TransactionServices";

import UpdateTransaction from "./UpdateTransaction";

export default function Transaction() {

  const params=useParams();

  console.group(params.id);
  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createddate",
    },
    {
      title: "Ten khách hàng",
      dataIndex: "nameCustomer",
    },
    {
      title: "Mã code",
      dataIndex: "code",
    },
    {
      title: "Hình thức",
      dataIndex: "note",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Trạng thái",
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
      title: "Người thêm",
      dataIndex: "createdby",
      render: (_, record) => {
        return (
          <>
            {record.createdby ? (
              <Tag color="pink">{record.createdby}</Tag>
            ) : (
              <Tag color="purple">AnonymusUser</Tag>
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
              <Tooltip title="Sửa Giao dịch">
                <div>
                  <UpdateTransaction record={record} />
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  const role = getRoles();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAPI = async () => {
      if (role === "ADMIN") {
        const result = await getAllTransaction(token);
        setData(result);
      } else if (role === "STAFF") {
        const result = await getInfoByCustomerId(params.id, token);
        setData(result);
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
      <Card
        style={{ overflowX: "scroll", height: "100vh" }}
        title="Danh sách các sản phẩm"
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
