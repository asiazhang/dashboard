import { Layout, Row } from 'tdesign-react/lib';

const { Footer } = Layout;

const NavFooter = () => {
  return (
    <Footer>
      <Row justify='center'>Copyright © 2022-{new Date().getFullYear()} Tencent. All Rights Reserved</Row>
    </Footer>
  );
};

export default NavFooter;
