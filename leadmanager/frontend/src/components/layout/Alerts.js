import React, {Component, Fragment} from 'react';
import {withAlert} from "react-alert";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {

  static propTypes = {
    errors: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const {errors, alert, message} = this.props;

    if (prevProps.errors !== errors) {

      Object.keys(errors.msg).forEach(key => {
        switch (key) {
          case 'username':
          case 'password':
          case 'password2':
          case 'name':
          case 'email':
          case 'message':
            alert.error(`${key}: ${errors.msg[key]}`);
            break;
          case 'non_field_errors':
            alert.error(errors.msg[key]);
        }
      });
    }

    if (prevProps.message !== message) {
      if (message.msg) alert.success(message.msg);
      if (message.error) alert.error(message.error);
    }

  }

  render() {
    return (
      <Fragment/>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));