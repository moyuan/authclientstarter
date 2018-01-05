import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // console.log('form sign in values : ', email, password);
    return this.props.signinUser({ email, password }, () => {
      this.props.history.push('/feature');
    });
  }

  renderInput({ label, input, type, meta: { touched, error } }) {
    // console.log(field);
    return (
      <fieldset className="form-group">
        <label>{label}:</label>
        <input {...input} type={type} placeholder={label} className="form-control" />
        {touched && error && <span>{error}</span>}
      </fieldset>
    );
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

  render() {
    const { error, submitting, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          type="text"
          component={this.renderInput}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
        />
        {this.renderAlert(error)}
        <div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Sign In
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  // fields: ['email', 'password']
})(connect(mapStateToProps, actions)(Signin));
