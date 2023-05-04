import { Layout, Avatar } from 'antd';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import useClientStore from '@store/clientStore'
import Products from './products/Products';
import Categories from './categories/Categories';
import {Outlet} from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const { currentTab } = useClientStore();
  let content = null;

  switch (currentTab) {
    case 'products':
      content = <Products />;
      break;
    case 'categories':
      content = <Categories />;
      break;
    case 'employees':
      content = <Employees />;
      break;
    case 'recettes':
      content = <Recettes />;
      break;

    default:
      break;
  }
  const userId = 1234;
  const colors = ['#e53935', '#3f51b5', '#4caf50', '#ff9800', '#9c27b0'];
  const colorIndex = userId % colors.length;
  const avatarColor = colors[colorIndex];
  return (
    <Layout>
      <Sider style={{ backgroundColor: 'white' }} className="h-screen border-r-2 border-green-400">
        <Sidebar />
      </Sider>
      <Layout>
      <Header className="h-[70px] bg-gray-200 border-b-2 border-green-400">
      <div className="float-right mr-6 mt-3">
        <Avatar
          style={{ backgroundColor: avatarColor }}
          size={40}
        >
          User
        </Avatar>
      </div>
    </Header>
        <Content className=""> <div className='p-4 rounded-md'> <Outlet/> </div></Content>
        <Footer>Created by <a href="www.pub-maroc.com" className='font-bold'>pub-maroc</a></Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;