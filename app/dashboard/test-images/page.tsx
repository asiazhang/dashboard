'use client';

import { useGetTestImagesQuery } from '@/lib/testImage/testImageSlice';
import React, { useState } from 'react';
import { Button, Input, Row, Select, Space, Table, Tag } from 'tdesign-react';
import { ILogObj, Logger } from 'tslog';

import CommonStyle from '@/app/styles/common.module.css';
import classnames from 'classnames';
import { AddIcon, File1Icon, SearchIcon } from 'tdesign-icons-react';
import { useGetTestToolsQuery } from '@/lib/testTool/testToolSlice';

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

  const { data: toolData, error: toolError, isLoading: isToolLoading } = useGetTestToolsQuery({});

  // 将 tools 数据转换为 Select 组件所需的格式
  const options = toolData?.tools.map((tool) => ({
    label: tool.nameZh,
    value: tool.name,
  }));

  const current = pageIndex;

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
          <Select style={{ width: '200px' }} multiple clearable loading={isToolLoading} options={options || []} />
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
            colKey: 'tool',
            width: 160,
          },
          {
            title: '用户代码镜像数量',
            width: 160,
            ellipsis: true,
            colKey: 'count',
            cell({ row }) {
              return (
                <Tag theme='success' variant='light'>
                  {row.count.toString()}
                </Tag>
              );
            },
          },
          {
            align: 'left',
            fixed: 'right',
            width: 160,
            colKey: 'op',
            title: '操作',
            cell(record) {
              return (
                <>
                  <Button
                    theme='primary'
                    variant='text'
                    onClick={() => {
                      rehandleClickOp(record);
                    }}
                  >
                    编辑
                  </Button>
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
              <div>暂无数据</div>
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
