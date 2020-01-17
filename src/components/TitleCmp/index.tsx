import React from 'react';
import { Typography, Divider, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';
import { useSelector } from 'react-redux';

const { Title } = Typography;

interface ITitleProps {
  action?: {
    title: string;
    url: string
  };
}

const TitleCmp: React.FC<ITitleProps> = ({
}) => {
  const history = useHistory();
  const path = history.location.pathname;

  const title = useSelector((state: any) => state.Reducer.header[path].title);
  const action = useSelector((state: any) => state.Reducer.header[path].action)
  console.log('TitleCmp render')
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