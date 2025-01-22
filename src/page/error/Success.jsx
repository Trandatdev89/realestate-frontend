import React from "react";
import success from "../../img/success.png";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function Success() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{
         textAlign:"center"
      }}>
        <img src={success} alt="success" style={{width:"500px",height:"500px"}}/>
        <h4>Thanh toán thành công!</h4>
      </div>
    </div>
  );
}
