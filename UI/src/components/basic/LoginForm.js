import React, {Component} from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
        this.props.createUser(username, password);
    }
  }
  render() {
    //BASIC LOGIN FORM:
    const { username, password, submitted } = this.state;
    return (
      <div className='login-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type='text' name='username' value={username} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
            Password:
            <input type='password' name='password' value={password} onChange={this.handleChange}/>
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}
