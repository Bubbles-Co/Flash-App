import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reduxForm } from "redux-form";

let SessionForm = ({ handleSubmit, routes, routeType }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" name="submit" value="route">
        Add Session
      </button>
    </form>
  );
};

SessionForm = reduxForm({
  form: "session"
})(SessionForm);

async function handleSessionSubmit(values, routes, routeType) {
  console.log(routes, routeType);
  let gym = "Mission Cliffs";
  let res = axios.post("https://locallhost:3000/me/session", {
    routes,
    gym,
    routeType
  });
  console.log(res);
}

const SessionPage = props => {
  return <SessionForm onClick={handleSessionSubmit} {...props} />;
};

const mapStateToProps = state => ({
  routeType: state.routeType,
  routes: state.routes
});

export default connect(mapStateToProps)(SessionPage);
