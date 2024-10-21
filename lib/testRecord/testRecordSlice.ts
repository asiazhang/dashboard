import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TestTask {
  id: bigint;
  taskName: string;
}

interface TestRecord {
  id: bigint;
  taskName: string;
  triggerFrom: TestTask;
  status: string;
  startTime: Date;
  elapse: number;
  passRate: number;
  caseCount: bigint;
}

interface TestRecordApiResponse {
  records: TestRecord[];
  total: number;
  pageSize: number;
  current: number;
}

// Define a service using a base URL and expected endpoints
export const testRecordsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/quotes' }),
  reducerPath: 'testRecordApi',
  tagTypes: ['testRecords'],
  endpoints: (build) => ({
    getTaskRecords: build.query<TestRecordApiResponse, { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => `?limit=${limit}&page=${page}`,
      providesTags: (result, error, { limit, page }) =>
        result ? [{ type: 'testRecords', id: `PAGE_${page}_LIMIT_${limit}` }] : [],
    }),
  }),
});

export const { useGetTaskRecordsQuery } = testRecordsApiSlice;
