import React, {Component, Fragment} from 'react';
import {withAlert} from "react-alert";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {

  static propTypes = {
    errors: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const {errors, alert} = this.props;
    if (prevProps.errors !== errors) {
      if (errors.msg.name) alert.error(`Name: ${errors.msg.name.join()}`);
      if (errors.msg.email) alert.error(`Email: ${errors.msg.email.join()}`);
      if (errors.msg.message) alert.error(`Message: ${errors.msg.message.join()}`);
    }
  }

  render() {
    return (
      <Fragment/>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(withAlert()(Alerts));