import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

class Header extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  handleLogout = () => {
    this.props.logout();
    return <Redirect to="/login"/>
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Lead Manager</a>
            <ul className="navbar-nav ml-auto mt-2 mt-2">
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                {this.props.isAuthenticated ? (
                  <button className="btn nav-link" onClick={this.handleLogout}>Logout</button>
                ) : (
                  <Link to="/login" className="nav-link">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Header);