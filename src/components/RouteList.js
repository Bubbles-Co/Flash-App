import React from 'react';
import PropTypes from 'prop-types';

const ClimbingRoute = ({ grade, finish }) => (
  <li
  >
      {grade}, {finish}
  </li>
)

ClimbingRoute.propTypes = {
  grade: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired
}

const RouteList = ({ routes }) => (
  <ul>
    {routes.map((route, index) => (
      <ClimbingRoute key={index} {...route} />
    ))}
  </ul>
)

RouteList.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      grade: PropTypes.string.isRequired,
      finish: PropTypes.string.isRequired
    })
  )
}

export default RouteList;