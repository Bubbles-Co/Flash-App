import React from 'react';
import { connect } from 'react-redux';
import { addRoute } from '../actions';

const finishOptions = ["Onsight", "Flash", "Send", "Project"]
const boulderingOptions = ["v0", "v1", "v2", "v3",
                           "v4", "v5", "v6", "v7",
                           "v8", "v9", "v10", "v11",
                           "v12", "v13", "v14", "v15", "v16"]
// const topropingOptions = ["5.5", "5.6", "5.7", "5.8", "5.9",
//                           "5.10a", "5.10b", "5.10c", "5.10d",
//                           "5.11a", "5.11b", "5.11c", "5.11d",
//                           "5.12a", "5.12b", "5.12c", "5.12d",
//                           "5.13a", "5.13b", "5.13c", "5.13d",
//                           "5.14a", "5.14b", "5.14c", "5.14d",
//                           "5.15a", "5.15b", "5.15c", "5.15d"]

const AddRoute = ({ dispatch }) => {
  
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        const grade = e.target.grade.value
        const finish = e.target.finish.value
        dispatch(addRoute(grade, finish))
      }}>
        <select name="grade">
          {boulderingOptions.map((grade, idx) => (
            <option key={idx} value={grade}>{grade}</option>
          ))}
        </select>
        <select name="finish">
          {finishOptions.map((finish, idx) => (
            <option key={idx} value={finish}>{finish}</option>
          ))}
        </select>
        <button type="submit">
          Add Route
        </button>
      </form>
    </div>
  )
}

export default connect()(AddRoute);