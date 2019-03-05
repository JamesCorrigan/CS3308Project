import React, {Component} from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    //BASIC LOGIN FORM:
    return (
      <div className='login-form'>
        <form>
          <label>
            Username: 
            <input type='text' name='username' />
          </label>
          <br/>
          <label>
            Password:
            <input type='password' name='password' />
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}
