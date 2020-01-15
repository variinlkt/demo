import React, { useRef, CSSProperties } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
// import FileLoader from './baseCmp/File';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';
import Profile from './components/Profile/index';
import './App.scss';

const { SubMenu } = Menu;


const App: React.FC<any> = (props) => {
  // const fileRef: any = useRef(null)
  // const handleSubmit = (e: any) => {
  //   const file = fileRef.current.files[0];
  //   if(!file)
  //     return;
  //   const fl = new FileLoader(file)
  //   fl.upload()

    
  //   e.preventDefault();
  // }
  const MenuStyle: CSSProperties = {
    width: 256,
    height: '100%',
    position: 'absolute'
  };
  return (
    // <div>
    //   {/* <form onSubmit={handleSubmit}>
    //     <label>
    //       Upload file: */}
    //       <input type="file" ref={fileRef} onChange={handleSubmit}/>
    //     {/* </label>
    //     <br />
    //     <button type="submit">Submit</button>
    //   </form> */}
    // </div>
    <>
      <Menu
        style={MenuStyle}
        mode="inline"
      >
        <Profile src={'avatar'} userName={'userName'} />
        {
          [{title:'33',key:'list'}].map(({title, key}) => (
            <SubMenu
              key={key}
              title={
                <span>
                  <Icon type="mail" />
                  <Link to={`/${key === 'list' ? '' : key}`}>{title}</Link>
                </span>
              }
            >
            </SubMenu>
          ))
        }
      </Menu>
      <Switch>
        <Route exact path='/' component={ListPage} />
        <Route exact path='/addSong' component={FormPage} />
      </Switch>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    controlList: [{
      key: 'list',
      title: 'iiiii'
    }]
  }
}
//建立展现型组件的参数到store.dispatch方法的映射
//传递this.props方法，执行counterAddAction（计数器增加Action）对应的函数
const mapDispatchToProps = (dispatch: any) => {
  return {
    // counterAdd: () => {
    //   dispatch(CounterAddAction )
    // }
  }
}
//connect方法关联展示型组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);