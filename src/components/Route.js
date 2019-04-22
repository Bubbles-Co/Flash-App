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

export default ClimbingRoute;