import React, { useRef, useState, useMemo } from 'react';
import { Typography, Divider, Form, Upload, Button, Input, Icon } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';
// import ControlTab from '../../components/ControllTab/index';
import TitleCmp from '../../components/TitleCmp/index';
import WrappedAdvancedForm from '../../components/FormCmp';

interface IFormPageProps {
  form: any
}

interface ILabelProps {
  value: string;
  onClick: Function;
  disabled: boolean;
}

const Label: React.FC<ILabelProps> = ({
  value,
  onClick,
  disabled
}) => {
  const edit = () => {
    onClick && onClick(value);
  }
  return <a onClick={edit} >{ disabled ? '编辑' : '确定' }</a>
}

const FormPage: React.FC<IFormPageProps> = ({
  form
}) => {
  const [title, setTitle] = useState('添加歌曲');
  return (
    <div className="main form-page">
      <TitleCmp title={title}></TitleCmp>
      <WrappedAdvancedForm />
    </div>
  );
};
export default FormPage;
