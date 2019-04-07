import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import myData from "./data/data.json";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let boulderingDifficulties = ["V0", "V1", "V2", "V3", "V4", "V5", "V6"]
let topropingGrades = ["5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", "5.12a"]
let colors = ["yellow", "green", "red", "blue", "pink", "purple", "black", "gray", "orange"]



export class DataSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: myData,
      user: "",
      route_type: "",
      chartData: {}
    }

    this.onUserSelect = this.onUserSelect.bind(this);
    this.onTypeSelect = this.onTypeSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  getUsers() {
    let users = this.state.data.map(d => {
      return d.Name
    })
    users = [...new Set(users)]
    return users
  }

  onUserSelect(e) {
    this.setState({
      user: e.target.value
    })
  }

  onTypeSelect(e) {
    this.setState({
      route_type: e.target.value
    })
  }

  onSubmit() {
    let dataSlice = this.state.data.filter(d => {
      return ((d.Name === this.state.user) && (d.Type == this.state.route_type))
    })

    let grades = []
    if (this.state.route_type == "Bouldering") {
      grades = boulderingDifficulties
    }
    else if (this.state.route_type == "Top-roping") {
      grades = topropingGrades
    }

    let datasets = []
    for (var i = 0; i < grades.length; ++i) {
      datasets.push({
        label: grades[i],
        data: dataSlice.map(d => {
          return d[grades[i]]
        }),
        borderColor: colors[i],
        fill: false
      })
    }

    if (!grades.length) {
      return
    }
    this.setState({
      chartData: {
        labels: dataSlice.map(d => {
          return d.Timestamp
        }),
        datasets: datasets
      }
    })
  }

  render() {
    return (
      <div>
        <select onChange={this.onUserSelect}>
          {
            this.getUsers().map(user => {
              return <option key={user} value={user}>{user}</option>
            })
          }
        </select>
        <select onChange={this.onTypeSelect}>
          <option value="Bouldering">Bouldering</option>
          <option value="Top-roping">Top-roping</option>
        </select>
        <button onClick={this.onSubmit}>
          plot!
        </button>
        <Chart data={this.state.chartData}/>
      </div>
    )
  }
}

export class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <Line
          type= 'line'
          data={this.props.data}
          height="600px"
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}