import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCustomer } from '../../../../Services/CustomerServices';
import { Reloadpage } from '../../../../Action/ReloadPage';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteCustomer(props) {
  const {record}=props;

    const reload=false;
    const token=localStorage.getItem("token");
    const dispatch=useDispatch();

    const handleComfirm=async(id)=>{
        const res= await deleteCustomer(id,token);
        if(res.code===200){
            dispatch(Reloadpage(!reload));
        }else{
            alert("xoa khong thanh cong");
        }
    }
  return (
    <Popconfirm
        title="Bạn có chắc chắn muốn xóa nó"
        description="Nếu xóa thì sản phẩm sẽ không thể phục hồi?"
        okText="Yes"
        cancelText="No"
        onConfirm={()=>handleComfirm(record.id)}
      >
        <Button className="ms-1" danger icon={<DeleteOutlined />} />
      </Popconfirm>
  )
}
