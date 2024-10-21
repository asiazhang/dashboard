import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const namespace = 'list/tools';

export interface TestToolInfo {
  name: string;
  nameZh: string;
  description: string;
}

interface TestToolMetaInfo {
  tools: Array<TestToolInfo>;
}

interface IInitialState {
  loading: boolean;
  toolList: TestToolInfo[];
}

const initialState: IInitialState = {
  loading: true,
  toolList: [],
};

// Define a service using a base URL and expected endpoints
export const testToolsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://proxy.cors.sh/https://testsolar-1321258242.cos.ap-guangzhou.myqcloud.com/testtools/stable.index.json',
  }),
  reducerPath: 'testToolsApi',
  tagTypes: ['testTools'],
  endpoints: (build) => ({
    getTestTools: build.query<TestToolMetaInfo, any>({
      query: () => ``,
    }),
  }),
});

export const { useGetTestToolsQuery } = testToolsApiSlice;
