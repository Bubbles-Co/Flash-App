import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import RouteStats from '../components/RouteStats'
import Sessions from './Sessions';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/routes' component={RouteStats}/>
      <Route path='/sessions' component={Sessions}/>
    </Switch>
  </main>
)

export default Main