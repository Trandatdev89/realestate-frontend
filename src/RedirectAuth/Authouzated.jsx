import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Authorized(props) {
  const {roleUser,component}=props;

  console.log(roleUser,component);
  return (
    (roleUser === "ADMIN" || roleUser === "STAFF") ? <Navigate to="/fobiden" /> : component
  )
}
