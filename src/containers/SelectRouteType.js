import React from 'react';
import { connect } from 'react-redux';
import { selectRouteType } from '../actions/selectRouteType';

const SelectRouteType = ({ dispatch }) => {
  
  return (
    <div>
      <select name="routeType" onChange={e => {
        dispatch(selectRouteType(e.target.value))
      }}>
        <option value="boulder">boulder</option>
        <option value="top-rope">top-rope</option>
      </select>
    </div>
  )
}

export default connect()(SelectRouteType);