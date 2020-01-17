import React from 'react';
import { Avatar } from 'antd';
import './index.scss';

interface IProfileProps {
  src: string;
  userName: string;
}

const Profile: React.FC<IProfileProps> = ({
  src,
  userName,
}) => {
  console.log('Profile render')

  return (
    <div className="profile">
      <Avatar shape="circle" size={64} icon="user" className="avatar"/>
      <div>
        <h2>{userName}</h2>
      </div>
    </div>
  );
};
export default Profile;
