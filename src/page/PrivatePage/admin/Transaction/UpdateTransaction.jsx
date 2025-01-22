import { Card } from "antd";
import React from "react";
import {  useParams } from "react-router-dom";
import UpdateTransaction2 from "./UpdateTransaction2";
import VNPay from "./VNPay";

export default function UpdateTransaction() {
  const param = useParams();
  return (
    <>
      <Card
        style={{ overflowX: "scroll", height: "100vh" }}
        title="Thanh toán giao dich"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        
          <UpdateTransaction2 record={param.id}/>
          <VNPay record={param.id}/>
        </div>
      </Card>
    </>
  );
}
