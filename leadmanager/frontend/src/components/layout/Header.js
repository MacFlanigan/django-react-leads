import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

class Header extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-2">
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      </ul>
    );

    const userLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-2">
        <span className="navbar-text mr-3"><strong> Welcome {this.props.auth.user ? this.props.auth.user.username: null}</strong></span>
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={this.handleLogout}>Logout</a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Lead Manager</a>
            {this.props.auth.isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, {logout})(Header);