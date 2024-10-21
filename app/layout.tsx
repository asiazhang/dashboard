'use client';

import FooterNav from '@/components/FooterNav/FooterNav';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Navigation from '@/components/Navigation/Navigation';
import 'tdesign-react/dist/tdesign.css';
import { Layout } from 'tdesign-react/lib';

const { Content } = Layout;

export default function RootLayout() {
  return (
    <html>
      <body>
        <div>
          <Layout>
            <HeaderNav></HeaderNav>
            <Layout>
              <Navigation></Navigation>
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
