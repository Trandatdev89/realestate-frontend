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
          key: '3',
          label: <Link to={role!=="ADMIN"?("/fobiden"):("/admin/staff")} style={css}>Danh sách nhân viên</Link>,
        }
      ]
    },
    {
      key: 'sub1',
      label: 'Quản lý khách hàng',
      icon: <MailOutlined />,
      children: [
        {
          key: '5',
          label:<Link to="/admin/customer" style={css}>Danh sách khách hàng</Link>,
        }
      ],
    },
    {
      key: 'Cài đặt',
      label: 'Navigation Two',
      icon: <SettingOutlined />,
      children: [
        {
          key: '9',
          label: <Link to="/admin/setting" style={css}>Chỉnh sửa tài khoản</Link>,
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