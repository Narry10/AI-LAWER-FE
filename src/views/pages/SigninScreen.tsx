
import React from 'react';
import { Button, Card, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../contexts/hooks';
import { authLoginGoogle } from '../../contexts/auth/authActions';

const SigninScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const handleGoogleLogin = () => {
		dispatch(authLoginGoogle());
	};
	return (
		<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)' }}>
			<Card style={{ maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
				<Typography.Title level={2} style={{ marginBottom: 16, color: '#1677ff' }}>Welcome to X-Dashboard</Typography.Title>
				<Typography.Text style={{ display: 'block', marginBottom: 32, color: '#888' }}>
					Hệ thống quản lý site CMS
				</Typography.Text>
				<Button
					type="primary"
					icon={<GoogleOutlined />}
					size="large"
					style={{ width: '100%', fontWeight: 600, background: '#1677ff', border: 'none' }}
					onClick={handleGoogleLogin}
				>
					Đăng nhập với Google
				</Button>
			</Card>
		</div>
	);
};

export default SigninScreen;
