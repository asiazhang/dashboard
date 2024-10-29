import { memo } from 'react';
import { Layout, Space } from 'tdesign-react';
import HeaderIcon from './HeaderIcon';
import Style from './HeaderNav.module.css';
import ProjectSelector from './ProjectSelector';

const { Header } = Layout;

export default memo(() => {
  return (
    <Header className={Style.panel}>
      <Space align='center'>
        <ProjectSelector></ProjectSelector>
      </Space>

      <HeaderIcon />
    </Header>
  );
});
