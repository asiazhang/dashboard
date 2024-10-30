'use client';

import CommonStyle from '@/app/styles/common.module.css';
import '@/app/styles/theme.css';
import { TestImage, useGetTestImagesQuery } from '@/lib/testImage/testImageSlice';
import { useGetTestToolsQuery } from '@/lib/testTool/testToolSlice';
import classnames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { AddIcon, DeleteIcon, Edit1Icon, File1Icon, SearchIcon } from 'tdesign-icons-react';
import { Button, Input, Row, Select, Space, Table, Tag, TdOptionProps, Tooltip } from 'tdesign-react';
import { ILogObj, Logger } from 'tslog';

const log: Logger<ILogObj> = new Logger();

const TestImagePage = () => {
  const pageSize = 20;
  const pageIndex = 1;
  const { data: imageData, error: imageError } = useGetTestImagesQuery({ limit: pageSize, page: pageIndex });
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
    <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
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
        data={imageData?.images || []}
        columns={[
          {
            fixed: 'left',
            align: 'left',
            title: '镜像库名称',
            colKey: 'imageName',
          },
          {
            title: '测试工具',
            colKey: 'toolName',
            width: 200,
          },
          {
            title: '用户代码镜像数量',
            colKey: 'count',
            width: 160,
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
        rowKey='id'
        selectedRowKeys={selectedRowKeys}
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
      />
    </div>
  );
};

export default TestImagePage;
