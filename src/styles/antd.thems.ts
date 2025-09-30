// src/configs/antdTheme.ts
// Central place to configure Ant Design v5 theme (LIGHT ONLY)
import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';

export const siteTheme: ThemeConfig = {
  token: {
    // Brand & base tokens
    colorPrimary: '#3b82f6', // Tailwind blue-500
    colorInfo: '#3b82f6',
    borderRadius: 12,
    fontFamily: `Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'`,
    colorBgLayout: '#f9fafb', // gray-50 background
  },
  algorithm: antdTheme.defaultAlgorithm, // LIGHT ONLY
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f9fafb',
      siderBg: '#ffffff',
      headerHeight: 64,
    },
    Menu: {
      itemBorderRadius: 10,
      itemSelectedColor: '#111827',
      itemSelectedBg: '#eef2ff',
      itemHoverBg: '#f5f7ff',
    },
    Button: {
      controlHeight: 40,
      borderRadius: 10,
    },
    Card: {
      borderRadiusLG: 16,
    },
    Breadcrumb: {
      itemColor: '#6b7280',
      lastItemColor: '#111827',
    },
    Dropdown: {
      controlItemBgHover: '#f5f7ff',
      controlItemBgActive: '#eef2ff',
    },
  },
};

