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
      if (errors.msg.name) alert.error(`Name: ${errors.msg.name.join()}`);
      if (errors.msg.email) alert.error(`Email: ${errors.msg.email.join()}`);
      if (errors.msg.message) alert.error(`Message: ${errors.msg.message.join()}`);
    }

    if (prevProps.message !== message) {
      alert.success(message.msg);
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