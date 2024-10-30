'use client';

import { TestImage, useGetTestImagesQuery } from '@/lib/testImage/testImageSlice';
import React, { useState } from 'react';
import { Button, Input, Row, Select, Space, Table, Tag, Tooltip } from 'tdesign-react';
import { ILogObj, Logger } from 'tslog';
import '@/app/styles/theme.css';
import CommonStyle from '@/app/styles/common.module.css';
import { useGetTestToolsQuery } from '@/lib/testTool/testToolSlice';
import classnames from 'classnames';
import Link from 'next/link';
import { AddIcon, DeleteIcon, Edit1Icon, File1Icon, SearchIcon } from 'tdesign-icons-react';
import { TdOptionProps } from 'tdesign-react/lib';

const log: Logger<ILogObj> = new Logger();

const SelectTable = () => {
  const pageSize = 20;
  const pageIndex = 1;
  const {
    data: imageData,
    error: imageError,
    isLoading: isImageLoading,
  } = useGetTestImagesQuery({ limit: pageSize, page: pageIndex });
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);

  if (imageError) {
    log.error(imageError);
  }

  const { data: toolData, error: toolError, isLoading: isToolLoading } = useGetTestToolsQuery({});

  if (toolError) {
    log.error(toolError);
  }

  // 将 tools 数据转换为 Select 组件所需的格式
  const options: Array<TdOptionProps> | undefined = toolData?.tools.map((tool) => ({
    label: tool.nameZh,
    value: tool.name,
  }));
  options?.unshift({ label: '全选', checkAll: true });

  const current = pageIndex;

  function onSelectChange(value: (string | number)[]) {
    setSelectedRowKeys(value);
  }

  function onEditTestImage(record: any) {
    log.debug(record);
  }

  function onDeleteTestImage(record: TestImage) {
    log.debug(record);
  }

  return (
    <>
      <Row justify='space-between' style={{ marginBottom: '20px' }}>
        <Space>
          <Select
            style={{ width: '300px' }}
            label='测试工具'
            multiple
            clearable
            loading={isToolLoading}
            options={options || []}
          ></Select>
          <Input style={{ width: '160px' }} suffixIcon={<SearchIcon />} placeholder={'请输入镜像库名称'} />
        </Space>
        <Button icon={<AddIcon />}>创建镜像库</Button>
      </Row>
      <Table
        loading={isImageLoading}
        data={imageData?.images || []}
        columns={[
          {
            title: '镜像库名称',
            fixed: 'left',
            align: 'left',
            ellipsis: true,
            colKey: 'imageName',
          },
          {
            title: '测试工具',
            colKey: 'toolName',
            width: 200,
          },
          {
            title: '用户代码镜像数量',
            width: 160,
            ellipsis: true,
            colKey: 'count',
            cell({ row }) {
              return (
                <Tag theme={row.count === 0 ? 'warning' : 'primary'} variant='light'>
                  {row.count.toString()}
                </Tag>
              );
            },
          },
          {
            fixed: 'right',
            width: 160,
            colKey: 'op',
            title: '操作',
            cell({ row }) {
              return (
                <>
                  <Space>
                    <Tooltip content='编辑'>
                      <Button
                        size='small'
                        variant='text'
                        icon={<Edit1Icon />}
                        onClick={() => {
                          onEditTestImage(row);
                        }}
                      ></Button>
                    </Tooltip>
                    <Tooltip content='删除'>
                      <Button
                        size='small'
                        variant='text'
                        icon={<DeleteIcon />}
                        onClick={() => onDeleteTestImage(row)}
                      ></Button>
                    </Tooltip>
                  </Space>
                </>
              );
            },
          },
        ]}
        rowKey='index'
        selectedRowKeys={selectedRowKeys}
        hover
        empty={
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
            <Space direction='vertical' align='center'>
              <File1Icon size={'100px'} />
              <div>
                暂无数据，<Link href='/test-images/new'>创建镜像库</Link>
              </div>
            </Space>
          </span>
        }
        onSelectChange={onSelectChange}
        pagination={{
          pageSize,
          total: imageData?.total,
          current,
          showJumper: true,
          // onCurrentChange(current, pageInfo) {
          //   dispatch(
          //     getList({
          //       pageSize: pageInfo.pageSize,
          //       current: pageInfo.current,
          //     }),
          //   );
          // },
          // onPageSizeChange(size) {
          //   dispatch(
          //     getList({
          //       pageSize: size,
          //       current: 1,
          //     }),
          //   );
          // },
        }}
      />
    </>
  );
};

const TestImagePage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <SelectTable />
  </div>
);

export default TestImagePage;
