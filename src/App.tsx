import React from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';
import './App.scss';
import ControlTab from './components/ControllTab/index';



const App: React.FC<any> = (props) => {
  return (
    <>
      <ControlTab/>
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