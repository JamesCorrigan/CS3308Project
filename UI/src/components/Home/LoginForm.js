import React, {Component} from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email, password } = this.state;
    if (email && password) {
        this.props.login(email, password);
    }
  }
  render() {
    //BASIC LOGIN FORM:
    const { email, password, submitted } = this.state;
    return (
      <div className='login-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            email:
            <input type='text' name='email' value={email} onChange={this.handleChange}/>
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
