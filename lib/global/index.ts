import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/createAppSlice';
import { ETheme } from '@/app/types/index.d';
import { CHART_COLORS, defaultColor } from '@/app/configs/color';
import { RootState } from '../store';

const namespace = 'global';

export enum ELayout {
  side = 1,
  top,
  mix,
  fullPage,
}

export interface IGlobalState {
  loading: boolean;
  collapsed: boolean;
  /**
   * 是否显示面包屑导航
   */
  setting: boolean;
  version: string;
  color: string;
  /**
   * 主题：深色 浅色
   */
  theme: ETheme;
  /**
   * 是否开启跟随系统主题
   */
  systemTheme: boolean;
  layout: ELayout;
  isFullPage: boolean;
  showHeader: boolean;
  showBreadcrumbs: boolean;
  showFooter: boolean;
  chartColors: Record<string, string>;
}

const defaultTheme = ETheme.light;

const initialState: IGlobalState = {
  loading: true,
  collapsed: false, // 宽度小于1000 菜单闭合
  setting: false,
  version: '0.1.0',
  theme: defaultTheme,
  systemTheme: false,
  layout: ELayout.side,
  isFullPage: false,
  color: defaultColor?.[0],
  showHeader: true,
  showBreadcrumbs: true,
  showFooter: true,
  chartColors: CHART_COLORS[defaultTheme],
};

// 创建带有命名空间的reducer
const globalSlice = createAppSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleSetting: (state: IGlobalState) => {
      state.setting = !state.setting;
    },
    toggleShowHeader: (state: IGlobalState) => {
      state.showHeader = !state.showHeader;
    },
    toggleShowBreadcrumbs: (state: IGlobalState) => {
      state.showBreadcrumbs = !state.showBreadcrumbs;
    },
    toggleShowFooter: (state: IGlobalState) => {
      state.showFooter = !state.showFooter;
    },
    switchTheme: (state: IGlobalState, action: PayloadAction<ETheme>) => {
      const finalTheme: ETheme = action?.payload;
      // 切换 chart 颜色
      state.chartColors = CHART_COLORS[finalTheme];
      // 切换主题颜色
      state.theme = finalTheme;
      // 关闭跟随系统
      state.systemTheme = false;
      document.documentElement.setAttribute('theme-mode', finalTheme);
    },
    openSystemTheme: (state: IGlobalState) => {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        const finalTheme = media.matches ? ETheme.dark : ETheme.light;
        state.chartColors = CHART_COLORS[finalTheme];
        // 切换主题颜色
        state.theme = finalTheme;
        state.systemTheme = true;
        document.documentElement.setAttribute('theme-mode', finalTheme);
      }
    },
  },
  extraReducers: () => {},
});

export const selectGlobal = (state: RootState) => state.global;

export const {
  toggleMenu,
  toggleSetting,
  toggleShowHeader,
  toggleShowBreadcrumbs,
  toggleShowFooter,
  switchTheme,
  switchLayout,
  switchFullPage,
  openSystemTheme,
} = globalSlice.actions;

export default globalSlice.reducer;
