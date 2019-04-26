import React from 'react';
import AddRoute from '../containers/AddRoute';
import ShowRoute from '../containers/ShowRoutes';
import SelectRouteType from '../containers/SelectRouteType';

const Sessions = () => (
  <div>
    <SelectRouteType />
    <AddRoute />
    <ShowRoute />
  </div>
)

export default Sessions;