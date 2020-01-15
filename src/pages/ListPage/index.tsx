import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Avatar, Tag } from 'antd';
import TitleCmp from '../../components/TitleCmp/index';
import './index.scss';


const { Column, ColumnGroup } = Table;
interface IListPageProps {
  avatar: string;
  userName: string;
  controlList: IItemProps[];
}

interface IItemProps{
  title: string,
  value: string
}

const ListPage: React.FC<IListPageProps> = ({
  avatar,
  userName,
  controlList
}) => {
  const [title, setTitle] = useState('歌库');
  const [data, setData] = useState(
    [
      {
        key: '1',
        albumImage: 'https://avatars3.githubusercontent.com/u/7843281?s=40&v=4',
        song: 'Brown',
        singer: '32',
      },
    ]
  )
  const [tableHead, setTableHead] = useState([
    {
      key: 'albumImage',
      title: '',
      dataIndex: 'albumImage',
      render: (albumImage: string) => (
        <Avatar shape="square" size={64} src={albumImage} />
      ),
      width: 100
    },
    {
      key: 'song',
      title: '歌名',
      dataIndex: 'song'
    },
    {
      key: 'singer',
      title: '歌手',
      dataIndex: 'singer'
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'action',
      render: () => <a>删除</a>
    },
  ]);
  return (
    <div className="main list-page">
      <TitleCmp title={title} action={{
        title: '添加歌曲',
        url: '/addSong'
      }}></TitleCmp>
      <Table dataSource={data}>
      {
        !!tableHead.length && tableHead.map(({key, title, dataIndex, render, width}) => (
          <Column width={width} title={title} dataIndex={dataIndex} key={key} render={render} />
        ))
      }
      </Table>
    </div>
  );
};
export default ListPage;
