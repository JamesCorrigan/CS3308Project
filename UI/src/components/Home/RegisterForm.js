import React, {Component} from 'react';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
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
    const rObj = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }
    if (rObj.first_name && rObj.last_name && rObj.email && rObj.password) {
        this.props.register(rObj);
    }
  }
  render() {
    //BASIC LOGIN FORM:
    const { first_name, last_name, email, password, submitted } = this.state;
    return (
      <div className='register-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type='text' name='first_name' value={first_name} onChange={this.handleChange}/>
          </label>
          <label>
            Last Name:
            <input type='text' name='last_name' value={last_name} onChange={this.handleChange}/>
          </label>
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
