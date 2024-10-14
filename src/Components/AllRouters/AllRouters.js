import React from 'react'
import {useRoutes} from "react-router-dom";
import { router } from '../../router';

export default function AllRouters() {

  const allRouter=useRoutes(router);  

  return (
    <div>{allRouter}</div>
  )
}
