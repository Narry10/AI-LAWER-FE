import React from 'react';
import { useAppSelector } from 'contexts/hooks';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, List, Button, Empty } from 'antd';

const HomeScreen: React.FC = () => {
    const me = useAppSelector((s) => s.user.data);
    const navigate = useNavigate();
    return (
        <Card style={{ maxWidth: 600, margin: '32px auto', padding: 24 }}>
            <Typography.Title level={2} style={{ marginBottom: 8 }}>User Home</Typography.Title>
            <Typography.Text style={{ display: 'block', marginBottom: 24, color: '#888' }}>
                Welcome to the user dashboard.
            </Typography.Text>
            <Typography.Title level={4} style={{ marginBottom: 16 }}>Sites you manage</Typography.Title>
            {me?.sites && me.sites.length > 0 ? (
                <List
                    dataSource={me.sites}
                    renderItem={site => (
                        <List.Item>
                            <Button
                                type="primary"
                                style={{ fontWeight: 500 }}
                                onClick={() => navigate(`/user/sites/${site}`)}
                            >
                                {site}
                            </Button>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty description="No sites found" />
            )}
        </Card>
    );
};

export default HomeScreen;
