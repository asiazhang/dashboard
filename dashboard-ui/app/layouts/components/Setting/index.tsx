import React, { memo } from 'react';
import { Col, Row, Switch } from 'tdesign-react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { openSystemTheme, selectGlobal, switchColor, switchTheme, toggleShowBreadcrumbs } from '@/lib/global';
import { ETheme } from '@/app/types/index.d';
import RadioRect from './RadioRect';

import Image from 'next/image';
import lightImg from '@/public/svg/assets-setting-light.svg';
import darkImg from '@/public/svg/assets-setting-dark.svg';
import systemImg from '@/public/svg/assets-setting-auto.svg';

import Style from './index.module.less';

enum ESettingTheme {
  system,
}

const themeList = [
  {
    value: ETheme.light,
    image: <Image src={lightImg} alt='light' />,
    name: '明亮',
  },
  {
    value: ETheme.dark,
    image: <Image src={darkImg} alt='dark' />,
    name: '黑暗',
  },
  {
    value: ESettingTheme.system,
    image: <Image src={systemImg} alt='system' />,
    name: '跟随系统',
  },
];

export default memo(() => {
  const dispatch = useAppDispatch();
  const globalState = useAppSelector(selectGlobal);

  const handleThemeSwitch = (value: any) => {
    if (value === ESettingTheme.system) {
      dispatch(openSystemTheme());
    } else {
      dispatch(switchTheme(value));
      dispatch(switchColor(globalState.color));
    }
  };

  return (
    <div>
      <div className={Style.settingTitle}>主题模式</div>
      <RadioRect
        defaultValue={globalState.systemTheme ? ESettingTheme.system : globalState.theme}
        onChange={handleThemeSwitch}
        options={themeList}
      />

      <div className={Style.settingTitle}>元素开关</div>

      <Row justify='space-between'>
        <Col>
          <div className={Style.settingSubTitle}>显示 Breadcrumbs</div>
        </Col>
        <Col>
          <Switch size='large' value={globalState.showBreadcrumbs} onChange={() => dispatch(toggleShowBreadcrumbs())} />
        </Col>
      </Row>
    </div>
  );
});
