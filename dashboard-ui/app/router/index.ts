import React, { lazy } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { ComponentType } from 'react';
import list from './modules/images';
import form from './modules/tasks';
import login from './modules/login';
import otherRoutes from './modules/others';
import records from './modules/records';

export interface IRouter {
  path: string;
  redirect?: string;
  Component?: ComponentType<any> | NextComponentType<NextPageContext, any, any>;
  /**
   * 当前路由是否全屏显示
   */
  isFullPage?: boolean;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    title?: string;
    Icon?: React.FC;
    /**
     * 侧边栏隐藏该路由
     */
    hidden?: boolean;
  };
}

const routes: IRouter[] = [
  {
    path: '/login',
    Component: lazy(() => import('@/app/components/Login')),
    isFullPage: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/dashboard/base',
  },
];

const allRoutes = [...routes, ...list, ...form, ...records, ...otherRoutes, ...login];

export default allRoutes;
