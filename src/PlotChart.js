import React, { Component } from 'react';
import { Line, Doughnut, Radar} from 'react-chartjs-2';
import myData from "./data/data.json";
import "./App.css";

let boulderingDifficulties = ["V0", "V1", "V2", "V3", "V4", "V5", "V6"]
let topropingGrades = ["5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", "5.12a"]
let colors = ["yellow", "green", "red", "blue", "pink", "purple", "black", "gray", "orange"]
let skillsType = ["Slab", "Crack", "Crimp", "Overhang", "Vertical"]
let dummySkillsType = {data: [25, 5, 40, 60, 70], label: "Skill chart"}



export class DataSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: myData,
      user: "",
      route_type: "",
      chartData: {},
      barChartData: {}
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
      user: e.target.value,
    })
  }

  onTypeSelect(e) {
    this.setState({
      route_type: e.target.value,
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
    } else {
      return
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
    
    let barDatasets = {label: "Overall stats", title: "All time"}
    let barData = []
    for (var j = 0; j < grades.length; ++j) {
      barData.push(0);
    }
    for (var i = 0; i < dataSlice.length; ++i) {
      for (var j = 0; j < grades.length; ++j) {
        barData[j] += dataSlice[i][grades[j]]
      }
    }
    barDatasets.data = barData
    barDatasets.backgroundColor = colors.slice(0,grades.length)


  
    this.setState({
      chartData: {
        labels: dataSlice.map(d => {
          return d.Timestamp
        }),
        datasets: datasets,
      },
      barChartData: {
        labels: grades,
        datasets: [barDatasets]
      },
      radarChartData: {
        labels: skillsType,
        datasets: [dummySkillsType]
      }
    })
  }

  render() {
    return (
      <div>
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
        </div>
        <div>
          <Chart data={this.state.chartData}/>
        </div>
        <div className="flex-row">
          <div className="total-stats"><Doughnut data={this.state.barChartData}/></div>
          <div className="skill-radar"><Radar data={this.state.radarChartData}/></div>
        </div>
      </div>
    )
  }
}

class Chart extends Component {
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

class BarChart extends Component {
  render() {
    return (
      <div className="barChart">
        
      </div>
    )
  }
}

class RadarChart extends Component {
  render() {
    return (
      <div className="radarChart">
        
      </div>
    )
  }
}