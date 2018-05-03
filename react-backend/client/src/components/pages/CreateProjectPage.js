import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projects';
import CreateProjectForm from '../forms/CreateProjectForm';

class CreateProjectPage extends Component {

  submit = data => this.props.createProject(data)
        .then(() => this.props.history.push("/projects/myproject"));

  render() {

    return (
        <div>
            <h1>Create Project</h1>
            <CreateProjectForm submit={this.submit} />
        </div>
    );
  }
}

CreateProjectPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createProject: PropTypes.func.isRequired
};

export default connect(null, { createProject })(CreateProjectPage);