import React from 'react';

import { Layout, Menu } from 'tdesign-react';
import { HistoryIcon, TaskIcon, ViewListIcon } from 'tdesign-icons-react';

const { Aside } = Layout;
const { MenuItem } = Menu;

const NavAside = () => {
  return (
    <Menu theme='light' value='dashboard' style={{ marginRight: 50, height: 550 }}>
      <MenuItem value='dashboard' icon={<ViewListIcon />}>
        镜像库
      </MenuItem>
      <MenuItem value='resource' icon={<TaskIcon />}>
        测试任务
      </MenuItem>
      <MenuItem value='root' icon={<HistoryIcon />}>
        执行记录
      </MenuItem>
    </Menu>
  );
};

export default NavAside;
