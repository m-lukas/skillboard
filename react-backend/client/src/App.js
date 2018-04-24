import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Project from './components/Project';

import './App.css';

class App extends Component {

  //Main constructor for states

  render() {
    return (
      //Paste the Participantlist-Layout in the root layout
      <div className="App">
          <h1>Skillboard</h1>
          <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default App;
