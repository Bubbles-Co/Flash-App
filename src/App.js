import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'

const Home = () => (
  <div className="App">
    <header className="App-header">
      <h1>Welcome to Flash!</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    </header>
  </div>
)

const Routes = () => (
  <div>
    <h1>This where the routes you have done go</h1>
  </div>
)

const Sessions = () => (
  <div>
    <h1>This is where you will input your sessions</h1>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/routes' component={Routes}/>
      <Route path='/sessions' component={Sessions}/>
    </Switch>
  </main>
)

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/routes'>Routes</Link></li>
        <li><Link to='/sessions'>Sessions</Link></li>
      </ul>
    </nav>
  </header>
)

const AppRoute = () => (
  <div>
    <Header />
    <Main />
  </div>
)

const App = () => (
  <div className="App">
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </div>
);

export default App;
