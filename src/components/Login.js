import React from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";

let LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" component="input" type="text" />
      <Field name="password" component="input" type="password" />
      <button type="submit">Submit!</button>
    </form>
  );
};

LoginForm = reduxForm({
  form: "user" // a unique name for this form
})(LoginForm);

async function loginAction({ username, password }) {
  let res = await axios.post("http://localhost:3000/sign-in", {
    username: username,
    password: password
  });
  console.log(res);
}

const LoginPage = () => {
  return <LoginForm onSubmit={loginAction} />;
};

export default LoginPage;
