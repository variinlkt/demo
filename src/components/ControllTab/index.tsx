import React from 'react';
import Profile from '../Profile';
import { List } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';

interface IControlTabProps {
  avatar: string;
  userName: string;
  controlList: IItemProps[];
}

interface IItemProps{
  title: string,
  value: string
}

const ControlTab: React.FC<IControlTabProps> = ({
  avatar,
  userName,
  controlList
}) => {
  return (
    <div>
      <Profile src={avatar} userName={userName}></Profile>
      <List dataSource={controlList}
        renderItem={({title, value}: IItemProps) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/${value}`}>{title}</Link>}
            />
          </List.Item>
        )}>
      </List>
    </div>
  );
};
export default ControlTab;
