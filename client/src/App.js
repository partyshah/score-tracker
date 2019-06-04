import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Scores from './components/Scores';
import Dice from './components/Dice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/scores" component={Scores} />
          <Route path="/dice" component={Dice} />
        </Switch>
      </div>
    );
  }
}

export default App;
