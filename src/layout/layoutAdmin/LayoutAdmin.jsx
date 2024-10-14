import React, { useState } from 'react'
import { Drawer, Layout } from "antd";

import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

// import MenuSider from "./MenuSider";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from '../layoutDefault/Header/Header';
import Footer from '../layoutDefault/Footer/Footer';
import MenuList from './Menu/Menu';
import './index.scss';


export default function LayoutAdmin() {

  const reload = useSelector((state) => state.ReloadAdmin);
  const [open, setOpen] = useState(false);
  const onClose=()=>{
    setOpen(false);
  }
  return (
    <div>
        <Layout>
          <Header/>
          <Layout>
            <Sider theme="light" width="270px" className="sider">
               <MenuList/>
            </Sider>
            {/* <Drawer width={"280px"} title="Menu" open={open} onClose={onClose} className="drawer" placement="left">
             
            </Drawer> */}
            <Content>
              <div className="container">
                <div style={{ minHeight: "100vh", padding: "50px 0" }}>
                  <Outlet />
                </div>
              </div>
            </Content>
          </Layout>  
        <Footer />
        </Layout>
    </div>
  )
}
