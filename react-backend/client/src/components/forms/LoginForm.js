import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class LoginForm extends Component {
  state = {
    data: {},
    loading: false,
    errors: {}
  }

  render() {
    const { data } = this.state;
    return (
        <Form>
          <Form.Field>
            <label htmlFor='email'>Email</label>
            <input 
              type='email' 
              id='email' 
              name='email' 
              placeholder='example@example.com'
              value={data.email}
              onChange={this.onChange}
            />
          </Form.Field>
          <Button primary>Login</Button>
        </Form>
    );
  }
}

export default LoginForm;