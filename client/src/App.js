import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Settings from './Settings';
import FoodList from './FoodList';
import DrinkList2 from './DrinkList2';
import GrillingList from './GrillingList';
import Supplies from './Supplies';
import Cart from './Cart';
import Address from './Address';
import Payment from './Payment';
import IconTabs from './Tabs';
import OrderCompleted from './OrderCompleted';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path='/' component={Home}  />
            <Route path='/t' component={IconTabs}  />
            <Route path='/t/foods' component={FoodList} />
            <Route path='/t/grill' component={GrillingList} />
            <Route path='/t/drinks' component={DrinkList2} />
            <Route path='/t/supplies' component={Supplies} />
            <Route path='/cart' component={Cart} />
            <Route path='/address' component={Address} />
            <Route path='/payment' component={Payment} />
            <Route path='/order-completed' component={OrderCompleted} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
