import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import global from './global';
import { testImagesApiSlice } from './testImage/testImageSlice';
import { testRecordsApiSlice } from './testRecord/testRecordSlice';
import { testTasksApiSlice } from './testTask/testTaskSlice';
import { testToolsApiSlice } from './testTool/testToolSlice';

const rootReducer = combineSlices({
  global,
  testImagesApiSlice,
  testRecordsApiSlice,
  testTasksApiSlice,
  testToolsApiSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        testImagesApiSlice.middleware,
        testRecordsApiSlice.middleware,
        testTasksApiSlice.middleware,
      );
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
