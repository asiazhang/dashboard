'use client';

import { useGetTaskTasksQuery } from '@/lib/testTask/testTaskSlice';
import React, { memo, useState } from 'react';
import { Button, Input, Radio, Row, Space, Table, Tooltip } from 'tdesign-react';

import CommonStyle from '@/app/styles/common.module.css';
import '@/app/styles/theme.css';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import { AddIcon, Edit1Icon, HistoryIcon, PlayCircleStrokeIcon, SearchIcon } from 'tdesign-icons-react';
import { ILogObj, Logger } from 'tslog';

const log: Logger<ILogObj> = new Logger();

const TaskTable = () => {
  const pageSize = 20;
  const pageIndex = 1;
  const { data, error } = useGetTaskTasksQuery({ limit: pageSize, page: pageIndex });
  if (error) {
    log.warn(error);
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);
  const router = useRouter();

  function onSelectChange(value: (string | number)[]) {
    setSelectedRowKeys(value);
  }

  function rehandleClickOp(record: any) {
    console.log(record);
  }

  return (
    <>
      <Row justify='space-between' style={{ marginBottom: '20px' }}>
        <Space>
          <Radio.Group>
            <Radio.Button value={'my'}>我的</Radio.Button>
            <Radio.Button value={'all'}>全部</Radio.Button>
          </Radio.Group>
          <Input style={{ width: '160px' }} suffixIcon={<SearchIcon />} placeholder={'请输入任务名称'} />
        </Space>
        <Button icon={<AddIcon />} onClick={() => router.push('/dashboard/test-tasks/new')}>
          创建任务
        </Button>
      </Row>
      <Table
        data={data?.tasks || []}
        columns={[
          {
            title: '任务ID',
            width: 120,
            fixed: 'left',
            align: 'left',
            colKey: 'id',
          },
          {
            title: '任务名称',
            colKey: 'taskName',
            ellipsis: true,
          },
          {
            title: '创建人',
            colKey: 'creator',
            width: 140,
          },
          {
            title: '最近修改时间',
            colKey: 'modifyTime',
            width: 200,
          },
          {
            fixed: 'right',
            width: 160,
            colKey: 'op',
            title: '操作',
            cell(record) {
              return (
                <>
                  <Space>
                    <Tooltip content='启动任务'>
                      <Button
                        size='small'
                        variant='text'
                        icon={<PlayCircleStrokeIcon />}
                        onClick={() => {
                          rehandleClickOp(record);
                        }}
                      ></Button>
                    </Tooltip>

                    <Tooltip content='执行记录'>
                      <Button
                        size='small'
                        variant='text'
                        icon={<HistoryIcon />}
                        onClick={() => {
                          rehandleClickOp(record);
                        }}
                      ></Button>
                    </Tooltip>
                    <Tooltip content='编辑任务'>
                      <Button
                        size='small'
                        variant='text'
                        icon={<Edit1Icon />}
                        onClick={() => {
                          rehandleClickOp(record);
                        }}
                      ></Button>
                    </Tooltip>
                  </Space>
                </>
              );
            },
          },
        ]}
        rowKey='id'
        selectedRowKeys={selectedRowKeys}
        onSelectChange={onSelectChange}
        // pagination={{
        //   pageSize,
        //   total,
        //   current,
        //   showJumper: true,
        //   onCurrentChange(current, pageInfo) {
        //     dispatch(
        //       getList({
        //         pageSize: pageInfo.pageSize,
        //         current: pageInfo.current,
        //       }),
        //     );
        //   },
        //   onPageSizeChange(size) {
        //     dispatch(
        //       getList({
        //         pageSize: size,
        //         current: 1,
        //       }),
        //     );
        //   },
        // }}
      />
    </>
  );
};

const TestTaskPage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <TaskTable />
  </div>
);

export default memo(TestTaskPage);
