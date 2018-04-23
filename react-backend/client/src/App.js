import React, { Component } from 'react';

import Participants from './components/Participants';

import './App.css';

class App extends Component {

  //Main constructor for states
  constructor(){
    super();
    this.state = {
      users:[]
    }
  }

    //Assign Participantlist to state
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ participants: res }))
        .catch(err => console.log(err));
    }
  
    //Retrieve Participantlist from Express
    callApi = async () => {
      const response = await fetch('/users');
      const body = await response.json();
  
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };

  render() {
    return (
      //Paste the Participantlist-Layout in the root layout
      <div className="App">
        <Participants participants={this.state.participants} />
      </div>
    );
  }
}

export default App;
