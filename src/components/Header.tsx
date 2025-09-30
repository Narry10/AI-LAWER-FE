import React from 'react';
import { Layout, Button, Avatar, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from 'contexts/hooks';
import { USER_LOGOUT } from 'contexts/user/userConstants';
import SystemDesc from 'components/SystemDesc';
import { AuthLogout } from 'contexts/auth';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const me = useAppSelector((s) => s.user.data);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(AuthLogout());
    };
    return (
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <SystemDesc />
            {me?.uid ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginRight: 24 }}>
                    <Avatar src={me.photoURL} alt={me.displayName || 'User'} />
                    <Typography.Text strong>{me.displayName || me.email}</Typography.Text>
                    <Button type="primary" danger onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
            ) : null}
        </Header>
    );
};

export default AppHeader;
