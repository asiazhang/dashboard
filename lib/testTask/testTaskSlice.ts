import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogObj, Logger } from 'tslog';

interface TestTask {
  id: bigint;
  taskName: string;
  creator: string;
  modifyTime: Date;
}

interface TestTaskApiResponse {
  tasks: TestTask[];
  total: number;
  pageSize: number;
  current: number;
}

const log: Logger<ILogObj> = new Logger();

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '/mockData' // 开发环境使用本地文件
    : 'https://dummyjson.com/'; // 生产环境使用线上 API

// Define a service using a base URL and expected endpoints
export const testTasksApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: 'testTaskApi',
  tagTypes: ['testTasks'],
  endpoints: (build) => ({
    getTaskTasks: build.query<TestTaskApiResponse, { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => {
        if (process.env.NODE_ENV === 'development') {
          return 'tasks.json';
        } else {
          return `images?limit=${limit}&page=${page}`;
        }
      },
      providesTags: (result, error, { limit, page }) =>
        result ? [{ type: 'testTasks', id: `PAGE_${page}_LIMIT_${limit}` }] : [],
      transformResponse: (response: any) => {
        // 检查返回的数据结构
        log.info(response);
        return response; // 确保你返回了处理后的数据
      },
    }),
  }),
});

export const { useGetTaskTasksQuery } = testTasksApiSlice;
