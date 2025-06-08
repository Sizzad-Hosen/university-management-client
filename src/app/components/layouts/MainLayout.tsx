'use client';
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import Banner from '../banner/Banner';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
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
        <h1 className="ps-4 p-2 text-white">BRUR</h1>
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
           <Banner></Banner>
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
