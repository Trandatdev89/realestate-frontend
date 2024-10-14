import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { DeliveredProcedureOutlined } from "@ant-design/icons";
import { assignmentBuilding, getInfoUserAssignment } from "../../../../Services/BuildingServices";

export default function AssignmentProduct(props) {
  const { record } = props;

  const [isModel, setModel] = useState(false);
  const [messageAPI, contextHolder] = message.useMessage();
  const token=localStorage.getItem("token");
  const [result, setResult] = useState([]);
  const inputRef=useRef([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getInfoUserAssignment(record.id,token);
      setResult(res.data);
    };
    fetchAPI();
  }, []);



  const handleCancel = () => {
    setModel(false);
  };

  const handleOpen = () => {
    setModel(true);
  };

  const handleClick=async(idBuilding)=>{
     const listIdStaff=inputRef.current.filter(item=>item.checked).map(ref => parseInt(ref.value));
     const obj={
        "buildingId":idBuilding,
        "staffId":listIdStaff
     }
     const res=await assignmentBuilding(obj,token);
     if(res.code===200){
      messageAPI.open({
        type: "success",
        content: "Giao tòa nhà thành công",
        duration: 3,
      });
    }
    else{
      messageAPI.open({
        type: "error",
        content: "Giao tòa nhà thất bại!",
        duration: 3,
      });
    }

  }
  return (
    <>
      {contextHolder}
      <Button
        className="ms-1"
        onClick={handleOpen}
        icon={<DeliveredProcedureOutlined />}
        style={{backgroundColor:"#FF7F50"}}
      />
      <Modal
        title="Giao tòa nhà cho nhân viên quản lý"
        width={500}
        open={isModel}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <div className="modal-body">
            <table
              className="table table-bordered"
              style={{ marginTop: 10 }}
              id="staffList"
            >
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th scope="row">STT</th>
                  <th scope="col">Tên nhân viên</th>
                </tr>
              </thead>
              <tbody className="center">
                {(result || []).map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <input type="checkbox" ref={el => (inputRef.current[index] = el)} value={item.staffId} defaultChecked={item.checked} />
                    </td>
                    <td className="text-center">{item.fullName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              id="assignmentBuilding"
              data-dismiss="modal"
              onClick={()=>handleClick(record.id)}
            >
              Giao
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
