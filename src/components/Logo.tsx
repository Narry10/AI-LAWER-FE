import React from 'react';
import { Typography } from 'antd';

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 0', justifyContent: 'center' }}>
    <span style={{ fontWeight: 700, fontSize: 20, color: '#1677ff' }}>X</span>
    <Typography.Text strong style={{ fontSize: 18 }}>Dashboard</Typography.Text>
    <span style={{ marginLeft: 8, fontSize: 12, color: '#52c41a', background: '#e6fffb', borderRadius: 4, padding: '2px 6px' }}>New</span>
  </div>
);

export default Logo;
