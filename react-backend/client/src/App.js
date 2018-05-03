import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions/auth'

import './App.css';

const App = ({ isAuthenticated, logout }) => (
  <div>
      <h1>Skillboard</h1>
      { isAuthenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <div>
          <Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link>
        </div>
      )}
  </div>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
      isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(App);
