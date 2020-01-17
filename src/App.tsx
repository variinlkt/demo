import React from 'react';
import { Switch, Route } from "react-router-dom";
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';
import './App.scss';
import ControlTab from './components/ControllTab/index';
import TitleCmp from './components/TitleCmp/index';

const App: React.FC<any> = ({
}) => {
  return (
    <>
      <ControlTab/>
      <div className="main">
        <TitleCmp></TitleCmp>
        <Switch>
          <Route exact path='/' render={() => <ListPage />}/>
          <Route exact path='/addSong' component={FormPage} />
        </Switch>
      </div>
    </>
  );
}
export default App