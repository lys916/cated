import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Settings from './Settings';
import FoodList from './FoodList';
import DrinkList from './DrinkList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path='/' component={Home}  />
            <Route path='/foods' component={FoodList} />
            <Route path='/drinks' component={DrinkList} />
            <Route path='/settings' component={Settings} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
