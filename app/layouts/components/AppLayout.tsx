import { ELayout } from '@/lib/global';
import classnames from 'classnames';
import React from 'react';
import { Layout } from 'tdesign-react';
import Content from './AppRouter';
import Footer from './Footer';
// import Header from './Header';
// import Menu from './Menu';

import Style from './AppLayout.module.less';

const SideLayout = React.memo(() => (
  <Layout className={classnames(Style.sidePanel, 'narrow-scrollbar')}>
    {/* <Menu showLogo showOperation /> */}
    <Layout className={Style.sideContainer}>
      {/* <Header /> */}
      <Content />
      <Footer />
    </Layout>
  </Layout>
));

const FullPageLayout = React.memo(() => <Content />);

export default {
  [ELayout.side]: SideLayout,
  [ELayout.fullPage]: FullPageLayout,
};
