import { Layout } from 'antd';
import Sidebar from '../components/desktop/Sidebar';
import { useEffect, useState } from 'react';
import useClientStore from '../store/clientStore';
const { Header, Footer, Sider, Content } = Layout;





const Dashboard = () => {


const {currentTab } = useClientStore();

return(
    <Layout>
      <Sider style={{backgroundColor:'white'}} className='h-screen'> <Sidebar/> </Sider>
      <Layout>
        <Header className='h-[70px] bg-green-200'>Header</Header>
        <Content className='' >{currentTab}</Content>
        <Footer >Footer</Footer>
      </Layout>
    </Layout>

)};
export default Dashboard;