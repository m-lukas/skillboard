import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class CreateProjectForm extends Component {

  state = {
      data: {
          projectid: '',
          projectname: '',
          description: ''
      },
      loading: false,
      errors: {}
  }

  onChange = e => {
      this.setState({
        ...this.state, 
        data: {...this.state.data, [e.target.name]: e.target.value}
      });
      this.state.data['projectid'] = this.state.data.projectname;
    }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0){
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => {
            this.setState({ errors: err.response.data.errors, loading: false });
        }
            
        );
    }
  };

  validate = (data) => {
    const errors = {};
    if(!data.projectname) errors.projectname = "Can't be blank!";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;
    return (
        <Form onSubmit={this.onSubmit} loading={loading}>
            { errors.global && (
                <Message negative>
                    <Message.Header>Something went wrong!</Message.Header>
                    <p>{errors.global}</p>
                </Message>
            )}
            <Form.Field error={!!errors.projectname}>
                <label>Projectname</label>
                <input
                    type="text"
                    id="projectname"
                    name="projectname"
                    value={data.projectname}
                    onChange={this.onChange}
                />
                { errors.projectname && <InlineError text={errors.projectname}/> }
                <label>skillboard.io/projects/{data.projectname}</label>
            </Form.Field>
            <Form.Field error={!!errors.description}>
                <label>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={this.onChange}
                />
                { errors.description && <InlineError text={errors.description}/> }
            </Form.Field>
            <Button primary>Create Project</Button>
        </Form>
    );
  }
}

CreateProjectForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default CreateProjectForm;