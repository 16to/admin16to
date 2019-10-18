import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Layout = ({ children }) => <PageHeaderWrapper title={false}>{children}</PageHeaderWrapper>;

export default Layout;
