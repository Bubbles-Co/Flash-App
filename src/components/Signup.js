import React from "react";
import { Field, reduxForm } from "redux-form";
import axios from 'axios';

let SignupForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component="input" type="text" placeholder="name" />
      <Field
        name="username"
        component="input"
        type="email"
        placeholder="email"
      />
      <Field
        name="password"
        component="input"
        type="password"
        placeholder="password"
      />
      <button type="submit">Submit!</button>
    </form>
  );
};

SignupForm = reduxForm({
  form: "signup" // a unique name for this form
})(SignupForm);

// redux form is weird, you have to pass "onSubmit"
// and read the prop as "handleSubmit"
class SignupPage extends React.Component {
  async signupUser(values) {
    const { username, password, name } = values;
    const res = await axios.post("http://localhost:3000/sign-up", {
      username: username,
      password: password,
      name: name
    });
    console.log(res);
  }
  render() {
    return <SignupForm onSubmit={this.signupUser} />;
  }
}

export default SignupPage;
