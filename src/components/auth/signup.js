import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const required = value => (value ? undefined : 'Required');
const maxLength = max => value => 
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength3 = minLength(3);
const emailFormat = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleFormSubmit(formProps) {
    // call action creator to sign up the  user
    // console.log({ ...formProps });
    return this.props.signupUser(formProps, () => {
      this.props.history.push('/feature');
    });
  }

  renderAlert(error) {
    if (error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {error}
        </div>
      );
    }
  }

  renderInput({ label, input, type, meta: { touched, error } }) {
    // console.log(field);
    // console.log(this);
    return (
      <fieldset className="form-group">
        <label>{label}:</label>
        <input {...input} type={type} placeholder={label} className="form-control" />
        {touched && this.renderAlert(error)}
      </fieldset>
    );
  }
  
  render() {
    const {
      handleSubmit,
      submitting,
      error,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          type="text"
          component={this.renderInput}
          validate={[required, emailFormat]}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          validate={[required]}
          label="Password"
        />
        <Field
          name="passwordConfirm"
          type="password"
          component={this.renderInput}
          validate={[required]}
          label="Confirm Password"
        />
        {this.renderAlert(error)}
        <div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  const { password, passwordConfirm } = formProps;

  if (password !== passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: [
    'email',
    'password',
    'passwordConfirm',
  ],
  validate,
})(connect(null, actions)(Signup));
