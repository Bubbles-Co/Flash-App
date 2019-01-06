import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'

const finishOptions = ["Onsight", "Flash", "Send", "Project"]
const routeTypes = ["boulder", "top-rope", "sport", "trad", "ice", "mixed"]
const boulderingOptions = ["v0", "v1", "v2", "v3",
                           "v4", "v5", "v6", "v7",
                           "v8", "v9", "v10", "v11",
                           "v12", "v13", "v14", "v15", "v16"]
const topropingOptions = ["5.5", "5.6", "5.7", "5.8", "5.9",
                          "5.10a", "5.10b", "5.10c", "5.10d",
                          "5.11a", "5.11b", "5.11c", "5.11d",
                          "5.12a", "5.12b", "5.12c", "5.12d",
                          "5.13a", "5.13b", "5.13c", "5.13d",
                          "5.14a", "5.14b", "5.14c", "5.14d",
                          "5.15a", "5.15b", "5.15c", "5.15d"]

class Grades extends Component {
  difficultyField(){
    return (
        <select onChange={this.props.handleChange} name="grade">
          {this.difficulties.map((grade, idx) => (
            <option key={`${idx}`} value={grade}>{grade}</option>
          ))}
        </select>
    )
  }

  render() {
    this.difficulties = this.props.route_type === "boulder" ? boulderingOptions : topropingOptions;
    var renderDifficulty = (<div> <h5> Please select type </h5> </div>)
    if (this.props.route_type) {
      var renderDifficulty = this.difficultyField()
    }

    return (
      <div>
        <label>
          Grade:
          {renderDifficulty}
        </label>
        <br />
      </div>
    )
  }
}

class RouteType extends Component {
  render() {
    return (
      <div>
      <label>
        Route type:
        <select onChange={this.props.handleChange} name="route_type">
            {routeTypes.map((routeType, idx) => (
              <option key={`${idx}`} value={routeType}>{routeType}</option>
            ))}
        </select>
      </label>
      <br />
      </div>
    )
  }
}

class Finish extends Component {
  render() {
    return (
      <div>
        <label>
          Finish:
          <select onChange={this.props.handleChange} name="finish">
              {finishOptions.map((finish, idx) => (
                <option key={`${idx}`} value={finish}>{finish}</option>
              ))}
          </select>
        </label>
        <br />
      </div>
    )
  }
}


class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "",
      finish: "",
      route_type: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value
    this.setState({
      [name]: value
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    // event.preventDefault()
    console.log(this.state);
  }

  render() {
  
    return (
    <div>
      <h1> This should be a form that submits Sessions</h1>
      <form onSubmit={this.handleSubmit}>
        <RouteType handleChange={this.handleChange}/>
        <Grades route_type={this.state.route_type} handleChange={this.handleChange}/>
        <Finish handleChange={this.handleChange}/>
      </form>
    </div>
    )
  }
}

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
