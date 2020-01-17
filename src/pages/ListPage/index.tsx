import React, { useState, useEffect } from 'react';
import { Table, Avatar } from 'antd';
import TitleCmp from '../../components/TitleCmp/index';
import { getList, deleteSong } from 'src/service';
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

const ListPage: React.FC<IListPageProps> = () => {
  const title = '歌库';//redux
  const [data, setData] = useState(
    [
      {
        id: '1',
        image: '',
        song: '',
        singer: '',
        lrc: '',
        file: '',
        img: ''
      },
    ]
  );
  const handleDelete = async (idx: number) => {
    const item = data[idx]
    const id = item && item.id;

    const res = await deleteSong({
      id,
      file: item.file,
      lrc: item.lrc,
      img: item.img
    });
    if(res && res.success){
      let copy = [ ...data ];
      copy.splice(idx, 1);
      console.log(copy)
      setData(copy)
    }
  }
  const tableHead = [
    {
      key: 'image',
      title: '',
      dataIndex: 'image',
      render: (image: string) => (
        <Avatar shape="square" size={64} src={image} />
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
      render: (text: string, record: string, index: number) => <a onClick={handleDelete.bind(null, index)}>删除</a>
    },
  ];
  useEffect(() => {
    getList()
    .then((res) => {
      if(!res) return;
      res.data.forEach((data: any, idx: number) => 
        res.data[idx].image = res.data[idx].img.replace(/^\S+server/, 'http://localhost:3009')
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
      <Table dataSource={data} rowKey="id">
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
