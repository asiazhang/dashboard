'use client';

import { MyLayoutProps } from '@/app/lib/common';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Navigation from '@/components/Navigation/Navigation';
import { Layout } from 'tdesign-react';
import Style from './SharedLayout.module.css';

const { Content, Aside } = Layout;

const SharedLayout = ({ children }: MyLayoutProps) => {
  return (
    <Layout className={Style.panel}>
      <Aside style={{ width: 'auto', minWidth: '64px', flex: 'none !important' }}>
        <Navigation></Navigation>
      </Aside>
      <Layout>
        <HeaderNav></HeaderNav>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SharedLayout;
