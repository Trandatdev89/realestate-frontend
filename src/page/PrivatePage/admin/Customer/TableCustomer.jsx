import { Card, Table, Tag, Tooltip } from "antd";
import React from "react";
import AssignmentCustomer from "./AssignmentCustomer";
import DeleteCustomer from "./DeleteCustomer";
import { getRoles } from "../../../../Components/helper/getRole";
import UpdateCustomer from "./UpdateCustomer";


export default function TableCustomer(props) {
  const role = getRoles();
  const { data } = props;
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Nhu cầu",
      dataIndex: "demand",
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
      title: "Ngày thêm",
      dataIndex: "createddate",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <>
            {record.status ? (
              <Tag color="success">Tồn tại</Tag>
            ) : (
              <Tag color="error">Không tồn tại</Tag>
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
              {role === "ADMIN" && (
                <>
                  <Tooltip title="Giao khách hàng cho nhân viên quản lý">
                    <div>
                      <AssignmentCustomer record={record} />
                    </div>
                  </Tooltip>
                  <Tooltip title="Xóa khách hàng">
                    <div>
                      <DeleteCustomer record={record} />
                    </div>
                  </Tooltip>
                </>
              )}
              <Tooltip title="Sửa khách hàng">
                <div>
                  <UpdateCustomer record={record} />
                </div>
              </Tooltip>
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
          dataSource={data?.data}
          pagination={false}
        />
      </Card>
    </>
  );
}
