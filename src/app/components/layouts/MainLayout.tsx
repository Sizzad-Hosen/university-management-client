'use client';
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import type { MenuProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: 'profile',
    label: <Link href="/profile">Profile</Link>,
  },
  {
    key: 'userManagement',
    label: 'User Management',
    children: [
      {
        key: 'createAdmin',
        label: <Link href="/admin/create-admin">Create Admin</Link>,
      },
      {
        key: 'createStudent',
        label: <Link href="/admin/create-student">Create Student</Link>,
      },
      {
        key: 'createFaculty',
        label: <Link href="/admin/create-faculty">Create Faculty</Link>,
      },
    ],
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
        <h1 className="ps-4 p-2 text-white">PH UNI</h1>
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
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          PH University ©{new Date().getFullYear()} Created by PH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
