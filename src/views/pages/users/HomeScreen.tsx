import React from 'react';
import { useAppSelector, useAppDispatch } from 'contexts/hooks';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Table, Button, Empty, Row, Col, Statistic } from 'antd';
import { SITE_WORKSPACE_SELECT } from 'contexts/siteWorkspace/siteWorkspaceActions';

const HomeScreen: React.FC = () => {
    const me = useAppSelector((s) => s.user.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSiteClick = (siteId: string) => {
        dispatch({ type: SITE_WORKSPACE_SELECT, payload: { siteId } });
        navigate(`/user/workspace/${siteId}`);
    };

    // Fake stats for demo, you can replace with real data
    const totalSites = me?.sites?.length || 0;
    const stats = [
        { title: 'Total Sites', value: totalSites },
        { title: 'Active Sites', value: totalSites },
        { title: 'Pending Tasks', value: Math.max(0, totalSites - 1) },
    ];

    const columns = [
        {
            title: 'Site Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <Button type="link" onClick={() => handleSiteClick(record.name)} style={{ fontWeight: 600, fontSize: 16 }}>
                    {text}
                </Button>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: () => <span style={{ color: '#52c41a' }}>Active</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button type="primary" onClick={() => handleSiteClick(record.name)}>
                    Go to Workspace
                </Button>
            ),
        },
    ];

    const dataSource = me?.sites?.map((site) => ({ name: site, status: 'active' })) || [];

    return (
        <Card style={{ maxWidth: 900, margin: '32px auto', padding: 24 }} bodyStyle={{ padding: 24 }}>
            <Row gutter={[24, 24]} justify="space-between" align="middle">
                <Col xs={24} sm={12} md={8}>
                    <Typography.Title level={2} style={{ marginBottom: 8, color: '#1677ff' }}>
                        Site Management
                    </Typography.Title>
                    <Typography.Text style={{ display: 'block', marginBottom: 16, color: '#888', fontSize: 16 }}>
                        Manage all your CMS sites in one place. Click a site to enter its workspace and start working with posts, analytics, and more!
                    </Typography.Text>
                </Col>
                <Col xs={24} sm={12} md={16}>
                    <Row gutter={16} justify="end">
                        {stats.map((stat) => (
                            <Col key={stat.title}>
                                <Statistic title={stat.title} value={stat.value} valueStyle={{ color: '#1677ff' }} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <div style={{ marginTop: 32 }}>
                {dataSource.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowKey="name"
                        pagination={{ pageSize: 5 }}
                        bordered
                        size="middle"
                        style={{ background: '#fff' }}
                    />
                ) : (
                    <Empty description="No sites found" style={{ marginTop: 32 }} />
                )}
            </div>
        </Card>
    );
};

export default HomeScreen;
