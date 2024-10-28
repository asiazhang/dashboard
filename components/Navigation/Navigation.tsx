'use client';

import React from 'react';

import { Menu } from 'tdesign-react';
import { FormIcon, HistoryIcon, TaskIcon } from 'tdesign-icons-react';
import { useRouter } from 'next/navigation';
import MenuLogo from '@/components/HeaderNav/MenuLogo';

const { MenuItem } = Menu;

const NavAside = () => {
  const router = useRouter();

  const routeTo = (path: string) => {
    router.push(path); // 使用 router.push 跳转到指定路由
  };

  return (
    <Menu theme='dark' value='dashboard' logo={<MenuLogo collapsed={false} />} style={{ height: '100%' }}>
      <MenuItem value='dashboard' icon={<FormIcon />} onClick={() => routeTo('/dashboard/test-images')}>
        镜像库
      </MenuItem>
      <MenuItem value='resource' icon={<TaskIcon />} onClick={() => routeTo('/dashboard/test-tasks')}>
        测试任务
      </MenuItem>
      <MenuItem value='root' icon={<HistoryIcon />} onClick={() => routeTo('/dashboard/test-records')}>
        执行记录
      </MenuItem>
    </Menu>
  );
};

export default NavAside;
