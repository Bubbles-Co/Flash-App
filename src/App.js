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

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
    <div>
      <h1> This should be a form that submits Sessions</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}

const Routes = () => (
  <div>
    <h1>This is where you view stats on routes</h1>
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
