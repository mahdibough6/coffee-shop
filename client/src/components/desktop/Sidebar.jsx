import React from 'react'
import useClientStore from '../../store/clientStore'
import { 
  SettingOutlined,
PieChartOutlined,
CoffeeOutlined,
AppstoreOutlined,
ShopOutlined,
UserOutlined 

  
   } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/pub-maroc.ico';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Dashboard', 'sub0', <PieChartOutlined />, [
    getItem('Revnue', './revenue'),
    getItem('other', './other'),
  ]),
  getItem('Products', 'sub1', <CoffeeOutlined />, [
    getItem('All Products', './products'),
    getItem('New Product', './products/new-product'),
  ]),
  getItem('Categories', 'sub2', <AppstoreOutlined />, [
    getItem('All Categories', './categories'),
    getItem('New Category', './categories/new-category'),
  ]),
  getItem('Kitchens', 'sub3', <ShopOutlined />, [
    getItem('All Kitchens', './kitchens'),
    getItem('New Kitchen', './kitchens/new-kitchen'),
  ]),
  getItem('Accounts', 'sub4', <UserOutlined />, [
    getItem('All Accounts', './accounts'),
    getItem('New Account', './accounts/new-account'),
  ]),
    getItem('Recette', '9', <UserOutlined />),
  {
    type: 'divider',
  },

  getItem('Settings', 'sub5', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('Group', 'grp', null, [getItem('Sign-out', '13'), getItem('help', '14')], 'group'),
];

const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(`./${e.key}`)
    console.log('click ', e); //TODO e.key to store the navigation later
  };
  return (
    <div className=''>
      <div className=''>
    <div className='flex  ml-6 mb-5 justify-start '><img width={'70px'}  src={logo} alt="" /></div>
</div>
    <Menu
    className=''
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
</div>
  );
};
export default Sidebar;