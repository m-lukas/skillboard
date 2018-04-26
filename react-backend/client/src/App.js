import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Project from './components/Project';

import './App.css';

const App = ({ isAuthenticated }) => (
  <div>
      <h1>Skillboard</h1>
      { isAuthenticated ? <button>Logout</button> : <Link to='/login'>Login</Link> }
  </div>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return{
      isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(App);
