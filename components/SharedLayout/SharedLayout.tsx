'use client';

import FooterNav from '@/components/FooterNav/FooterNav';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Navigation from '@/components/Navigation/Navigation';
import { ReactNode } from 'react';
import 'tdesign-react/dist/tdesign.css';
import { Layout } from 'tdesign-react/lib';

const { Content, Aside } = Layout;

export interface MyLayoutProps {
  children: ReactNode; // ReactNode 是表示任意可渲染内容的类型
}

const SharedLayout = ({ children }: MyLayoutProps) => {
  return (
    <Layout>
      <HeaderNav></HeaderNav>
      <Layout>
        <Aside style={{ borderTop: '1px solid var(--component-border)' }}>
          <Navigation></Navigation>
        </Aside>
        <Layout>
          <Content>{children}</Content>
          <FooterNav></FooterNav>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SharedLayout;
