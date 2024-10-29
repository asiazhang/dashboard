import React, { memo } from 'react';
import Style from './OperationLogo.module.css';
import { MenuFoldIcon } from 'tdesign-icons-react';

export default memo(() => {
  return (
    <div className={Style.operationLogo}>
      <MenuFoldIcon style={{ color: 'white' }}></MenuFoldIcon>
    </div>
  );
});
