import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { post } from '../../../../Utils/requestAPI';
import { getTransactionById } from '../../../../Services/TransactionServices';

export default function VNPay(props) {
  const {record} =props;
  console.log(record);
  const [data,setData]=useState({});
  const token=localStorage.getItem("token");

  const handleClick =async()=>{
    const res=await post(`payment?id=${data.id}&amount=${data.amount}&orderInfo=${"Thanh toán nhanh gọn"}`);
    window.location.href = res.url;
  };

  useEffect(() => {
      const fetchAPI = async () => {
        const res = await getTransactionById(record,token);
        setData(res);
      };
      fetchAPI();
    }, []);

  return (
    <Button className="mr-2"  
        type="primary"
        title="Thanh toán tiền mặt"
        onClick={handleClick}
       >Thanh toán VNPay</Button>     
  )
}
