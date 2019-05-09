import React from 'react';
import { connect } from 'react-redux';
import {  getLoginAction } from '../actions/loginActions';
import { Field, reduxForm } from 'redux-form';

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" component="input" type="text"/>
      <Field name="password" component="input" type="password"/>
      <button type="submit">Submit!</button>
    </form>
  )
}

LoginForm = reduxForm({
  form: 'user' // a unique name for this form
})(LoginForm);

class LoginPage extends React.Component {
  render() {
    const {submit} = this.props;
    return <LoginForm onSubmit={submit} />
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (values) => {
      const {username, password} = values;
      dispatch(getLoginAction(username, password))
    }
  }
}

// export default LoginPage;
export default connect(null, mapDispatchToProps)(LoginPage);

