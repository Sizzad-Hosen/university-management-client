'use client';
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import type { MenuProps } from 'antd';

import Home from '../Home/Home';
import Image from 'next/image';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'Home',
    label: <Link href="/">Home</Link>,
  },
  {
    key: 'about',
    label: <Link href="/about">About</Link>,
  },
  {
    key:'login',
     label: <Link href="/login">Login</Link>,
  },
 
 
  
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />

        <Link href={"/"}>
          <Image 
      width={130}
      height={60}
      alt="brur"
      className='ps-10 p-2 text-3xl'
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BRUR_Logo.svg/640px-BRUR_Logo.svg.png" mode=""/>
       
        
        </Link>

    
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={items} />
    
    
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
         <Home></Home>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          BRUR University ©{new Date().getFullYear()} Created by MD Sizzad Hosen
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
