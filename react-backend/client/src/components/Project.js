import React, { Component } from 'react';

import Participants from './Participants';

class Project extends Component {

  constructor(){
    super();
    this.state = {
    }
  }

    //Assign Participantlist to state
    componentDidMount() {
      var project = this.props.match.params.project;
      this.callApi(project)
        .then(res => this.setState({ participants: res }))
        .catch(err => console.log(err));
    }

    componentWillReceiveProps(nextProps){
        console.log("Changed props");
        var project = nextProps.match.params.project;
        console.log(nextProps.match.params.project);
        this.callApi(project)
        .then(res => this.setState({ participants: res }))
        .catch(err => console.log(err));
    }
  
    //Retrieve Participantlist from Express
    callApi = async (project) => {
      const response = await fetch('/projects/' + project);
      const body = await response.json();
  
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };

  render() {

    return (
      <div className="Project">
        {this.props.match.params.project}
        <h2>Project.js</h2>
        <Participants participants={this.state.participants} />
      </div>
    );
  }
}

export default Project;