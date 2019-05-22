import React from 'react';
import AddRoute from '../containers/AddRoute';
import ShowRoute from '../containers/ShowRoutes';
import SelectRouteType from '../containers/SelectRouteType';
import AddSession from '../containers/AddSession';



const Sessions = () => (
  <div>
    <SelectRouteType />
    <AddRoute />
    <AddSession/>
    <ShowRoute />
  </div>
)

export default Sessions;