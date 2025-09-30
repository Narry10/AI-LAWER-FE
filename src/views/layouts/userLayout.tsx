import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const UserLayout: React.FC = () => (
    <Layout className="min-h-screen flex flex-col">
        <Header className="bg-white shadow flex items-center justify-center p-0">
            <h2 className="text-2xl font-semibold py-4">User Dashboard</h2>
        </Header>
        <Content className="flex flex-1 justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-xl">
                <Outlet />
            </div>
        </Content>
        <Footer className="text-center py-4 bg-gray-100">
            x-dashboard ©2024 Created by Your Company
        </Footer>
    </Layout>
);

export default UserLayout;
