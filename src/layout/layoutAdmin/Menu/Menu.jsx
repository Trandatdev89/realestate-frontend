import React from 'react';
import {
  SettingOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getRoles } from '../../../Components/helper/getRole';

const css={
    textDecoration:"none"
}

const MenuList = () => {
  const role=getRoles();
  
  const items = [
    {
      key: '1',
      icon: <DesktopOutlined />,
      label: <Link to="/admin/dashboard" style={css}>Danh sách các tòa nhà</Link>,
    },
    {
      key: '2',
      icon: <ContainerOutlined />,
      label: 'Quản lý nhân viên',
      children: [
        {
          key: '6',
          label: <Link to={role!=="ADMIN"?("/fobiden"):("/admin/staff")} style={css}>Danh sách nhân viên</Link>,
        }
      ]
    },
    {
      key: '3',
      label: 'Quản lý khách hàng',
      icon: <MailOutlined />,
      children: [
        {
          key: '5',
          label:<Link to="/admin/customer" style={css}>Quản lý khách hàng</Link>,
        }
      ],
    },
    {
      key: '4',
      label: 'Giao dịch',
      icon: <SettingOutlined />,
      children: [
        {
          key: '9',
          label: <Link to="/admin/transaction" style={css}>Thanh toán giao dịch</Link>,
        },
      ],
    },
  ];
  return (
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="inline"
        items={items}
        
      />
  );
};
export default MenuList;