import { Button, Card, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import UpdateProduct from "./ManagerProduct/UpdateProduct";
import DeleteProduct from "./ManagerProduct/DeleteProduct";
import AssignmentProduct from "./ManagerProduct/AssignmentProduct";
import { getRoles } from "../../../Components/helper/getRole";

export default function TableAdmin(props) {
  const { data } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const role = getRoles();
  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
    },
    {
      title: "Tên tòa nhà",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số tầng hầm",
      dataIndex: "numberOfBasement",
    },
    {
      title: "Tên quản lý",
      dataIndex: "managerName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "managerPhone",
    },
    {
      title: "diện tích sàn",
      dataIndex: "floorArea",
    },
    {
      title: "diện tích thuê",
      dataIndex: "rentAreaString",
    },
    {
      title: "Giá thuê",
      dataIndex: "rentPrice",
    },
    {
      title: "Phí dịch vụ",
      dataIndex: "serviceFee",
    },
    {
      title: "Phí môi giới",
      dataIndex: "brokerageFee",
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
              {role === "ADMIN" && (
                <>
                  <Tooltip title="Xoa sản phẩm">
                    <div>
                      <DeleteProduct record={record} />
                    </div>
                  </Tooltip>
                  <Tooltip title="Giao tòa nhà cho nhân viên quản lý">
                    <div>
                      <AssignmentProduct record={record} />
                    </div>
                  </Tooltip>
                </>
              )}
              <Tooltip title="Sửa sản phẩm">
                <div>
                  <UpdateProduct record={record} />
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Card
        style={{ overflowX: "scroll", height: "100vh" }}
        title="Danh sách các sản phẩm"
        extra={<Link to={role==="ADMIN" ? ("/admin/create-product"):("/fobiden")}>
          <Tooltip title="Tạo mới sản phẩm">
            <Button
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#008000",color:"#fff" }}
            >Tạo mới tòa nhà </Button>
          </Tooltip>
        </Link>}

      >
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.data}
          pagination={false}
        />
      </Card>
    </>
  );
}
