import React, { useState, useMemo, FormEvent } from 'react';
import { Form, Upload, Button, Input, Icon } from 'antd';
import { addSong } from "../../service";
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
  const { getFieldDecorator, getFieldsValue } = form;

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

  const formatFieldsValue = () => {
    const { song, singer, img, file, lrc } = getFieldsValue()
    const data = {
      id: file.file.response.token,
      song,
      singer,
      img: img.file.response.location,
      file: file.file.response.location,
      lrc: lrc.file.response.location
    }
    return data
  }

  const handleSubmit = async (e: FormEvent) => {
    try{
      e.preventDefault();
      const fieldsValue = formatFieldsValue()
      fieldsValue && addSong(fieldsValue);

    } catch(e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {
        !!info.length && info.map(({name, key}) => (
          <Form.Item label={name} className="form-item info-area" key={key}>
          {
            getFieldDecorator(key, {
              rules: [{ required: true, message: '必填项' }],
            })(
              <Input name={name} />
            )
          }
          </Form.Item>

        ))
      }
      {
        !!data.length && data.map(({label, extra, key, accept}) => (
          <Form.Item label={label} extra={extra} className="form-item upload-area" key={key}>
          {getFieldDecorator(key, {
            valuePropName: key,
            rules: [{ required: true }],
          })(
              <Upload customRequest={upload} accept={accept} >
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>
          )}
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
