import React from 'react';
import TitleCmp from '../../components/TitleCmp/index';
import WrappedAdvancedForm from '../../components/FormCmp';
import './index.scss';

interface IFormPageProps {
}

const FormPage: React.FC<IFormPageProps> = () => {
  const title = '添加歌曲';
  console.log('formpage render')
  return (
    <div className="form-page">
      <WrappedAdvancedForm />
    </div>
  );
};
export default FormPage;
