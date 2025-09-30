import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { userMenuItems } from '../../routers/routes';
import Logo from 'components/Logo';
import SystemDesc from 'components/SystemDesc';
import UserHeader from '../../components/Header';
import AppHeader from '../../components/Header';

const { Header, Content, Footer, Sider } = Layout;

const UserLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsedWidth="0" theme="light">
                <Logo/>
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[userMenuItems.find(item => location.pathname === item.path)?.key || '1']}
                    onClick={({ key }) => {
                        const item = userMenuItems.find(i => i.key === key);
                        if (item) navigate(item.path);
                    }}
                    style={{ background: '#fff' }}
                >
                    {userMenuItems.map(item => (
                               <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <AppHeader/>
                <Content style={{ margin: '24px 16px 0', minHeight: '80vh' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', background: '#fff' }}>
                    x-dashboard Admin ©2024 Created by Your Company
                </Footer>
            </Layout>
        </Layout>
    );
};

export default UserLayout;
