import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getProjectData, joinProject } from '../actions/projects';
import Participants from './Participants';
import ConfirmEmailMessage from './messages/ConfirmEmailMessage';
import JoinProjectForm from './forms/JoinProjectForm';
import CreateProjectForm from './forms/CreateProjectForm';
import ErrorPage from './pages/ErrorPage';

class Project extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

    //Assign Participantlist to state
    async componentDidMount() {
      if(!this.props.participants){
        var project = this.props.match.params.project;
        await this.props.getProjectData({ projectid: project, token: localStorage.skillboardJWT });
        console.log("PROPS_EXISTING " + this.props.existing);
        console.log("PROPS_JOINED " + this.props.joined);
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.match.params.project !== this.props.match.params.project){
        var project = nextProps.match.params.project;
        this.props.getProjectData({ projectid: project, token: localStorage.skillboardJWT });
      }
    }

    submit = data => this.props.joinProject(data)
        .then(() => {/*Dismiss modal*/});

  render() {

    return (
      <div className="Project">
        {/*!this.props.isConfirmed && <ConfirmEmailMessage />*/}
        {this.props.projectname}
        <PageContent isExisting={this.props.isExisting} isJoined={this.props.isJoined} participants={this.props.participants} projectid={this.props.projectid} submit={this.submit} />
      </div>
    );
  }
}

Project.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  participants: PropTypes.array,
  isJoined: PropTypes.bool,
  isExisting: PropTypes.bool.isRequired,
  projectname: PropTypes.string,
  projectid: PropTypes.string
}

function PageContent(props){
  const isExisting = props.isExisting;
  const isJoined  = props.isJoined;
  const participants = props.participants;
  const projectid = props.projectid;
  const submit = props.submit;
  if(isExisting){
    if(isJoined){
      return <Participants participants={participants} />;
    }else{
      return <JoinProjectForm submit={submit} projectid={projectid} />
    }
  }else if(isExisting === false){
    return <ErrorPage />;
  }else{
    //LoadingView
    return null;
  }
}

function mapStateToProps(state){
  console.log("STATE_EXISTING " + state.project.existing);
  console.log("STATE_JOINED " + state.project.joined);
  console.log("STATE_PARTICIPANTS " + state.project.participants);
  return {
    isConfirmed: !!state.user.confirmed,
    participants: state.project.participants,
    isJoined: state.project.joined,
    isExisting: state.project.existing,
    projectname: state.project.projectname,
    projectid: state.project.projectid
  }
}

export default connect(mapStateToProps, { getProjectData, joinProject })(Project);