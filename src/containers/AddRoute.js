import React from "react";
import { connect } from "react-redux";
import { addRoute } from "../actions/addRoutes";
import { Field, FieldArray, reduxForm, reset } from "redux-form";
import axios from "axios";

const finishOptions = ["Onsight", "Flash", "Send", "Project"];
const boulderingOptions = [
  "v0",
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
  "v11",
  "v12",
  "v13",
  "v14",
  "v15",
  "v16"
];
const topropingOptions = [
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10a",
  "5.10b",
  "5.10c",
  "5.10d",
  "5.11a",
  "5.11b",
  "5.11c",
  "5.11d",
  "5.12a",
  "5.12b",
  "5.12c",
  "5.12d",
  "5.13a",
  "5.13b",
  "5.13c",
  "5.13d",
  "5.14a",
  "5.14b",
  "5.14c",
  "5.14d",
  "5.15a",
  "5.15b",
  "5.15c",
  "5.15d"
];
const gradeDict = {
  boulder: boulderingOptions,
  "top-rope": topropingOptions
};

const renderSelect = ({ input, selectOptions }) => (
  <select {...input}>
    {selectOptions.map((opt, idx) => (
      <option key={idx} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

let routeInfo = ({ fields, gradeOptions }) => (
  <ul>
    <li>
      <button
        type="button"
        onClick={() => fields.push({ timestamp: Date.now() })}
      >
        Add route
      </button>
    </li>
    {fields.map((route, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Route"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={`${route}.grade`}
          type="select"
          component={renderSelect}
          selectOptions={gradeOptions}
          label="Grade"
        />
        <Field
          name={`${route}.finish`}
          type="select"
          component={renderSelect}
          selectOptions={finishOptions}
          label="Finish"
        />
      </li>
    ))}
  </ul>
);

let AddRoute = ({ handleSubmit, gradeOptions }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FieldArray name="routes" component={routeInfo} gradeOptions={gradeOptions} />
        <button type="submit" name="submit" value="route">
          Add Session
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  routeType: state.routeType,
  routes: state.routes
});

let AddRouteForm = ({routeType}) => {
  // Should not have to put this, set default in store
  if (!routeType) {
    routeType = "boulder";
  }

  const submitRoute = (values, dispatch) => {
    const { routes } = values;
    routes.forEach(({ grade, finish, timestamp }) => {
      dispatch(addRoute(grade, finish, timestamp));
    });
    dispatch(reset("addRoute"));
    let gym = "Mission Cliffs";
    let res = axios.post("https://locallhost:3000/me/session", {
      routes,
      gym,
      routeType
    });
    console.log(res);
  };

  return <AddRoute onSubmit={submitRoute} gradeOptions={gradeDict[routeType]}/>;
};

AddRouteForm = connect(mapStateToProps)(AddRouteForm);

AddRoute = reduxForm({
  form: "addRoute"
})(AddRoute);

export default AddRouteForm;
