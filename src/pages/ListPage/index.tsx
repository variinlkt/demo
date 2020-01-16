import React, { useState, useEffect } from 'react';
import { Table, Avatar } from 'antd';
import TitleCmp from '../../components/TitleCmp/index';
import { getList } from 'src/service';
import './index.scss';


const { Column } = Table;
interface IListPageProps {
  avatar: string;
  userName: string;
  controlList: IItemProps[];
}

interface IItemProps{
  title: string,
  value: string
}

const tableHead = [
  {
    key: 'img',
    title: '',
    dataIndex: 'img',
    render: (img: string) => (
      <Avatar shape="square" size={64} src={img} />
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
    render: () => <a href="javascript:void(0);">删除</a>
  },
];

const ListPage: React.FC<IListPageProps> = () => {
  const title = '歌库';//redux
  const [data, setData] = useState(
    [
      {
        id: '1',
        img: 'https://avatars3.githubusercontent.com/u/7843281?s=40&v=4',
        song: 'Brown',
        singer: '32',
      },
    ]
  );

  useEffect(() => {
    getList()
    .then((res) => {
      if(!res) return;
      res.data.forEach((data: any, idx: number) => 
        res.data[idx].img = res.data[idx].img.replace(/^\S+server/, 'http://localhost:3009')
      );
      console.log(res);
      setData(res.data)
    });
  }, []);

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
