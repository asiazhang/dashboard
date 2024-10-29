import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const namespace = 'global';

export interface IGlobalState {
  // 是否折叠左侧菜单
  collapsed: boolean;
}

const initialState: IGlobalState = {
  collapsed: false,
};

// 创建带有命名空间的reducer
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleMenu: (state: IGlobalState, action: PayloadAction<IGlobalState | null>) => {
      if (action.payload === null) {
        state.collapsed = !state.collapsed;
      } else {
        state.collapsed = !!action.payload;
      }
    },
  },
});

export const { toggleMenu } = globalSlice.actions;

export default globalSlice.reducer;
