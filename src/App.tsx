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
  const MenuStyle: CSSProperties = {
    width: 256,
    height: '100%',
    position: 'absolute'
  };
  return (
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
                <Link to={`/${key === 'list' ? '' : key}`}>
                  <Icon type="mail" />
                  {title}
                </Link>
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