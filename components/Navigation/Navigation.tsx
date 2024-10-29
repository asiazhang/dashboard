'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Menu, MenuValue, Tooltip } from 'tdesign-react';
import { FormIcon, HistoryIcon, SettingIcon, TaskIcon } from 'tdesign-icons-react';
import { useRouter } from 'next/navigation';
import MenuLogo from '@/components/HeaderNav/MenuLogo';
import { RootState } from '@/lib/store';
import { toggleMenu } from '@/lib/global';
import OperationLogo from './OperationLogo';

const { MenuItem } = Menu;

const NavAside = () => {
  const router = useRouter();
  const collapsed: boolean = useSelector((state: RootState) => state.global.collapsed);
  const dispatch = useDispatch();

  const [active, setActive] = useState<MenuValue>('0');

  const routeTo = (path: string) => {
    router.push(path); // 使用 router.push 跳转到指定路由
  };

  return (
    <Menu
      theme='dark'
      value={active}
      collapsed={collapsed}
      onChange={(v) => setActive(v)}
      logo={<MenuLogo collapsed={collapsed} />}
      operations={
        <Tooltip content='收起' destroyOnClose>
          <Button
            shape='square'
            size='large'
            variant='text'
            onClick={() => dispatch(toggleMenu(null))}
            icon={<OperationLogo />}
          ></Button>
        </Tooltip>
      }
      style={{ height: '100%' }}
    >
      <MenuItem value='images' icon={<FormIcon />} onClick={() => routeTo('/dashboard/test-images')}>
        镜像库
      </MenuItem>
      <MenuItem value='tasks' icon={<TaskIcon />} onClick={() => routeTo('/dashboard/test-tasks')}>
        测试任务
      </MenuItem>
      <MenuItem value='records' icon={<HistoryIcon />} onClick={() => routeTo('/dashboard/test-records')}>
        执行记录
      </MenuItem>
      <MenuItem value='setting' icon={<SettingIcon />}>
        项目设置
      </MenuItem>
    </Menu>
  );
};

export default NavAside;
