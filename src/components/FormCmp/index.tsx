import React, { useRef, useState, useMemo } from 'react';
import { Typography, Divider, Form, Upload, Button, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';
import TitleCmp from '../../components/TitleCmp/index';
import FileLoader from '../../baseCmp/File';
import {
  upload
} from './uploadFunctions'

interface IFormPageProps {
  form: any
}

interface ILabelProps {
  value: string;
  onClick: Function;
  disabled: boolean;
}


const FormCmp: React.FC<IFormPageProps> = ({
  form
}) => {
  const [song, setSong] = useState({
    key: 'song',
    name: '歌名',
  });
  const [singer, setSinger] = useState({
    key: 'singer',
    name: '歌手',
  });
  
  const data = [
    {
      key: 'img',
      label: '上传封面图',
      extra: '支持jpg | png格式',
      accept: '.jpg,.png',
    },
    {
      key: 'file',
      label: '上传歌曲文件',
      extra: '支持mp3格式',
      accept: '.mp3',
    },
    {
      key: 'lrc',
      label: '上传歌词文件',
      extra: '支持lrc格式',
      accept: '.lrc',
    },
  ];
  const [info, setInfo] = useState([
    song, singer
  ]);
  useMemo(() => {
    setInfo([song, singer]);
  }, [song, singer]);
  
  return (
    <Form>
      {
        !!info.length && info.map(({name, key}) => (
          <Form.Item label={name} className="form-item info-area" key={key}>
            <Input name={name} />
          </Form.Item>

        ))
      }
      {
        !!data.length && data.map(({label, extra, key, accept}) => (
          <Form.Item label={label} extra={extra} className="form-item upload-area" key={key}>
            <Upload customRequest={upload} accept={accept} >
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>
          </Form.Item>
        ))
      }
      <Button type="primary" htmlType="submit">
        添加
      </Button>
      {/* &nbsp;
      <Button htmlType="reset" onClick={handleReset}>
        重置
      </Button> */}
    </Form>
  );
};

const WrappedAdvancedForm = Form.create({ name: 'advanced_search' })(FormCmp);

export default WrappedAdvancedForm;
