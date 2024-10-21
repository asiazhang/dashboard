import { lazy } from 'react';
import { QueueIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/tasks',
    meta: {
      title: '测试任务',
      Icon: QueueIcon,
    },
    Component: lazy(() => import('@/app/components/List/Task')),
  },
  {
    path: '/tasks/edit',
    Component: lazy(() => import('@/app/components/CreateTask')),
  },
];

export default result;
