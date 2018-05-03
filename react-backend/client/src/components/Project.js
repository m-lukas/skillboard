import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProjectData } from '../actions/projects';
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
      if(!this.props.participants){
        var project = this.props.match.params.project;
        this.props.getProjectData({ projectid: project });
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.match.params.project !== this.props.match.params.project){
        var project = nextProps.match.params.project;
        this.props.getProjectData({ projectid: project });
      }
    }
  
    //Retrieve Participantlist from Express
    /*callApi = async (project) => {
      const response = await fetch('/api/project/get/' + project);
      const body = await response.json();
  
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };*/

  render() {

    return (
      <div className="Project">
        {!this.props.isConfirmed && <ConfirmEmailMessage />}
        {this.props.match.params.project}
        <h2>Project.js</h2>
        <Participants participants={this.props.participants} />
      </div>
    );
  }
}

Project.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  participants: PropTypes.array
}

function mapStateToProps(state){
  return {
    isConfirmed: !!state.user.confirmed,
    participants: state.project.participants
  }
}

export default connect(mapStateToProps, { getProjectData })(Project);