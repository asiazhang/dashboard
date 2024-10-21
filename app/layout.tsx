'use client';

import FooterNav from '@/components/FooterNav/FooterNav';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Navigation from '@/components/Navigation/Navigation';
import 'tdesign-react/dist/tdesign.css';
import { Layout } from 'tdesign-react/lib';
import Style from './layout.module.css';

const { Content, Aside } = Layout;

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
          <Layout>
            <HeaderNav></HeaderNav>
            <Layout>
              <Aside style={{ borderTop: '1px solid var(--component-border)' }}>
                <Navigation></Navigation>
              </Aside>
              <Layout>
                <Content>
                  <div>Content</div>
                </Content>
                <FooterNav></FooterNav>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </body>
    </html>
  );
}
