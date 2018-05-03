import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Participants from './Participants';
import ConfirmEmailMessage from './messages/ConfirmEmailMessage';

class Project extends Component {

  constructor(props){
    super(props);
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
      const response = await fetch('/api/project/get/' + project);
      const body = await response.json();
  
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };

  render() {

    return (
      <div className="Project">
        {!this.props.isConfirmed && <ConfirmEmailMessage />}
        {this.props.match.params.project}
        <h2>Project.js</h2>
        <Participants participants={this.state.participants} />
      </div>
    );
  }
}

Project.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state){
  return {
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps)(Project);