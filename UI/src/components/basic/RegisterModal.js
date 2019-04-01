import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lData: {
        email: '',
        password: ''
      },
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      parent: false,
      family: '',
      rData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        parent: false,
        family: '',
      },
      submitted: false,
      showCreateForm: false
    };
    this.handleOpenClose = this.handleOpenClose.bind(this);
    this.handleRegChange = this.handleRegChange.bind(this);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.handleRegCheck = this.handleRegCheck.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    //handle outside clicks
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.handleClose(e);
    }
  }

  handleOpenClose = e => {
    e.preventDefault();
    this.setState(prevState => {return {showCreateForm: !prevState.showCreateForm}});
  }

  handleRegChange(e) {
    const { name, value } = e.target;
    this.setState({rData: { [name]: value }})
  }

  handleRegCheck(e) {
    const value = e.target.checked;
    const name = e.target.name;
    this.setState({rData: { [name]: value }})
  }

  handleRegSubmit(e) {
    e.preventDefault();
    //this.setState({ submitted: true });
    const rObj = this.state.rData;
    console.log(rObj);
    if (rObj.first_name && rObj.last_name
        && rObj.email && rObj.password
        && rObj.parent && rObj.family) {
        //only call with all data present
        this.props.loginActions.registerUser(rObj);
    }
  }

  showRegisterForm() {
    const { first_name, last_name, email, password, parent, family, submitted } = this.state.rData;
    return (
      <div className='register-form'>
        <form onSubmit={this.handleRegSubmit}>
          <label>
            First Name:
            <input
              type='text'
              name='first_name'
              value={first_name}
              onChange={this.handleRegChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type='text'
              name='last_name'
              value={last_name}
              onChange={this.handleRegChange}
             />
          </label>
          <label>
            Family:
            <input
              type='text'
              name='family'
              value={family}
              onChange={this.handleRegChange}
             />
          </label>
          <label>
            Parent:
            <input
              type='checkbox'
              name='parent'
              checked={parent}
              onChange={this.handleRegCheck}
            />
          </label>
          <label>
            email:
            <input
              type='text'
              name='email'
              value={email}
              onChange={this.handleRegChange}
             />
           </label>
          <br/>
          <label>
            Password:
            <input
              type='text'
              name='password'
              value={password}
              onChange={this.handleRegChange}
             />
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }

  handleLoginChange(e) {
    const { name, value } = e.target;
    this.setState({lData: { [name]: value }});
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state.lData;
    if (email && password) {
        this.props.loginActions.login(email, password);
    }
  }

  showCreateForm() {
    const { first_name, last_name, email, password, submitted } = this.state.lData;
    return (
      <div className='login-form'>
        <form onSubmit={this.handleLoginSubmit}>
          <label>
            email:
            <input type='text' name='email' value={email} onChange={this.handleLoginChange}/>
          </label>
          <br/>
          <label>
            Password:
            <input type='password' name='password' value={password} onChange={this.handleLoginChange}/>
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }

  render() {
    const linkText = this.state.showCreateForm ? "Create Family" : "Register New User";
    const headText = this.state.showCreateForm ? "Register User" : "Create New Family";
    return (
      <div className='.modal' ref={this.setWrapperRef}>
        <section className="modal-main">
          <div>
            <h1>{headText}</h1>
            <h4 onClick={this.handleOpenClose}><a>{linkText}</a></h4>
            {this.state.showCreateForm ? this.showCreateForm() : this.showRegisterForm()}
          </div>
          <button onClick={this.props.handleClose}>close</button>
        </section>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    albumActions: bindActionCreators(albumActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
