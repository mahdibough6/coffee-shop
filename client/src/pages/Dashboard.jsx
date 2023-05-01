import { Layout } from 'antd';
import Sidebar from '../components/desktop/Sidebar';
import { useEffect, useState } from 'react';
import useClientStore from '../store/clientStore';
import Products from '../components/desktop/products/Products';
import Categories from '../components/desktop/categories';
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

  return (
    <Layout>
      <Sider style={{ backgroundColor: 'white' }} className="h-screen border-r-2 border-green-400">
        <Sidebar />
      </Sider>
      <Layout>
        <Header className="h-[70px] bg-gray-200 border-b-2  border-green-400">Header</Header>
        <Content className=""> <div className='p-4 rounded-md'> <Outlet/> </div></Content>
        <Footer>Created by <a href="www.pub-maroc.com" className='font-bold'>pub-maroc</a></Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;