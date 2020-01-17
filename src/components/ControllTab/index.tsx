import React, { CSSProperties, useCallback } from 'react';
import { Menu, Icon } from 'antd';
import { useHistory } from "react-router-dom";
import Profile from '../Profile/index';
import { IClickParams, IControlTabProps } from './interface';
import './index.scss';

const { SubMenu } = Menu;

const ControlTab: React.FC<IControlTabProps> = () => {
  const history = useHistory()
  const MenuStyle: CSSProperties = {
    width: 256,
    height: '100%',
    position: 'absolute'
  };

  const handleClick = useCallback(
    (path: IClickParams) => {
      history.push(path)
    },
    [],
  );

  const menuList = [{
    title: '所有歌曲',//redux
    key: 'list',
    pathname: '/',
    onClick: handleClick
  }];

  return (
    <Menu
      style={MenuStyle}
      mode="inline"
    >
      <Profile src={'avatar'} userName={'userName'} />
      {
        menuList.map(({title, key, pathname}) => (
          <SubMenu
            key={key}
            title={
              <>
                <Icon type="mail" />
                {title}
              </>
            }
            onTitleClick={handleClick.bind(null, {pathname})}
          >
          </SubMenu>
        ))
      }
    </Menu>
  );
};
export default ControlTab;
