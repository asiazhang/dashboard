import React from 'react';
import { Button } from 'tdesign-react';
import { LogoGithubIcon, HelpCircleIcon, SettingIcon } from 'tdesign-icons-react';
import { useAppDispatch } from '@/lib/store';
import { toggleSetting } from '@/lib/global';
import Image from 'next/image';
import LogoFullIcon from '@/lib/svg/assets-logo-full.svg';
import Style from './index.module.less';

export default function Header() {
  const dispatch = useAppDispatch();

  const navToGitHub = () => {
    window.open('https://github.com/tencent/tdesign-react-starter');
  };

  const navToHelper = () => {
    window.open('http://tdesign.tencent.com/starter/docs/react/get-started');
  };

  const toggleSettingPanel = () => {
    dispatch(toggleSetting());
  };

  return (
    <div>
      <header className={Style.loginHeader}>
        <Image src={LogoFullIcon} alt='logo' />
        <div className={Style.operationsContainer}>
          <Button
            className={Style.operationsButton}
            theme='default'
            shape='square'
            variant='text'
            onClick={navToGitHub}
          >
            <LogoGithubIcon className={Style.icon} />
          </Button>
          <Button
            className={Style.operationsButton}
            theme='default'
            shape='square'
            variant='text'
            onClick={navToHelper}
          >
            <HelpCircleIcon className={Style.icon} />
          </Button>
          <Button
            className={Style.operationsButton}
            theme='default'
            shape='square'
            variant='text'
            onClick={toggleSettingPanel}
          >
            <SettingIcon className={Style.icon} />
          </Button>
        </div>
      </header>
    </div>
  );
}
