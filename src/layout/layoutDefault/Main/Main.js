import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
}
