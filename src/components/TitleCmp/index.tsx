import React from 'react';
import { Typography, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';

const { Title } = Typography;

interface ITitleProps {
  title: string;
  action?: {
    title: string;
    url: string
  };
}

const TitleCmp: React.FC<ITitleProps> = ({
  title,
  action
}) => {
  return (
    <div className="page-title">
      <Typography className="header-wrapper">
        <Title>{title}</Title>
        {
          action && (
            <Link to={action.url}>
              <Button icon="plus" type="primary">{action.title}</Button>
            </Link>
          )
        }
      </Typography>
      <Divider />
    </div>
  );
};
export default TitleCmp;