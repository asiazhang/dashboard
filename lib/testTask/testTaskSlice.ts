import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

// Define a service using a base URL and expected endpoints
export const testTasksApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/quotes' }),
  reducerPath: 'testTaskApi',
  tagTypes: ['testTasks'],
  endpoints: (build) => ({
    getTaskTasks: build.query<TestTaskApiResponse, { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => `?limit=${limit}&page=${page}`,
      providesTags: (result, error, { limit, page }) =>
        result ? [{ type: 'testTasks', id: `PAGE_${page}_LIMIT_${limit}` }] : [],
    }),
  }),
});

export const { useGetTaskTasksQuery } = testTasksApiSlice;
