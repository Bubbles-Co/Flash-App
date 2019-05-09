import React from 'react';
import { connect } from 'react-redux';
import { getSignupAction } from '../actions/signupActions';
import { Field, reduxForm } from 'redux-form';

let SignupForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component="input" type="text" placeholder="name"/>
      <Field name="username" component="input" type="email" placeholder="email"/>
      <Field name="password" component="input" type="password" placeholder="password"/>
      <button type="submit">Submit!</button>
    </form>
  )
}

SignupForm = reduxForm({
  form: 'signup' // a unique name for this form
})(SignupForm);

// redux form is weird, you have to pass "onSubmit"
// and read the prop as "handleSubmit"
class SignupPage extends React.Component {
  render() {
    const {submit} = this.props;
    return <SignupForm onSubmit={submit} />
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (values) => {
      const {username, password, name} = values;
      dispatch(getSignupAction(username, password, name))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignupPage);

