import React, { useState, CSSProperties } from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import Profile from '../Profile/index';
import './index.scss';

const { SubMenu } = Menu;
interface IControlTabProps {
}

const ControlTab: React.FC<IControlTabProps> = ({
}) => {
  const MenuStyle: CSSProperties = {
    width: 256,
    height: '100%',
    position: 'absolute'
  };
  const [menuList, setMenuList] = useState([{
    title: '33',
    key: 'list'
  }])
  return (
    <Menu
        style={MenuStyle}
        mode="inline"
      >
        <Profile src={'avatar'} userName={'userName'} />
        {
          menuList.map(({title, key}) => (
            <SubMenu
              key={key}
              title={
                <Link to={`/${key === 'list' ? '' : key}`}>
                  <Icon type="mail" />
                  {title}
                </Link>
              }
            >
            </SubMenu>
          ))
        }
      </Menu>
  );
};
export default ControlTab;
