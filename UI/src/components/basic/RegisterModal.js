  import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rData: {
        email: '',
        password: ''
      },
      cData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        parent: false,
      },
      submitted: false,
      showCreateForm: false
    };
    this.handleSwitchForm = this.handleSwitchForm.bind(this);
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.handleCreateCheck = this.handleCreateCheck.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleRegChange = this.handleRegChange.bind(this);
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

  handleSwitchForm = e => {
    e.preventDefault();
    this.setState(prevState => {return {showCreateForm: !prevState.showCreateForm}});
  }

  handleCreateChange(e) {
    const { name, value } = e.target;
    const data = this.state.cData;
    this.setState({cData: {...data, [name]: value }})
  }

  handleCreateCheck(e) {
    const value = e.target.checked;
    const name = e.target.name;
    const data = this.state.cData;
    this.setState({cData: { ...data, [name]: value }})
  }

  handleCreateSubmit(e) {
    e.preventDefault();
    //this.setState({ submitted: true });
    const cObj = this.state.cData;
    console.log(this.state.cData);
    if (cObj.first_name && cObj.last_name
        && cObj.email && cObj.password) {
        console.log(cObj);

        //only call with all data present
        this.props.loginActions.createFamily(cObj);
    }
  }

  createFamily() {
    const { first_name, last_name, email, password, parent, submitted } = this.state.cData;
    return (
      <div className='register-form'>
        <form onSubmit={this.handleCreateSubmit}>
          <label>
            First Name:
            <input
              type='text'
              name='first_name'
              value={first_name}
              onChange={this.handleCreateChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type='text'
              name='last_name'
              value={last_name}
              onChange={this.handleCreateChange}
             />
          </label>
          <label>
            Parent?:
            <input
              type='checkbox'
              name='parent'
              checked={parent}
              onChange={this.handleCreateCheck}
            />
          </label>
          <label>
            email:
            <input
              type='text'
              name='email'
              value={email}
              onChange={this.handleCreateChange}
             />
           </label>
          <br/>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={password}
              onChange={this.handleCreateChange}
             />
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }

  handleRegChange(e) {
    const { name, value } = e.target;
    this.setState({rData: { [name]: value }});
  }

  handleRegSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state.rData;
    if (email && password) {
        this.props.loginActions.login(email, password);
    }
  }

  registerUser() {
    const { first_name, last_name, email, password, submitted } = this.state.rData;
    return (
      <div className='login-form'>
        <form onSubmit={this.handleRegSubmit}>
          <label>
            email:
            <input type='text' name='email' value={email} onChange={this.handleRegChange}/>
          </label>
          <br/>
          <label>
            Password:
            <input type='password' name='password' value={password} onChange={this.handleRegChange}/>
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }

  render() {
    const linkText = this.state.showCreateForm ? "Create User and Family" : "Register User to Family";
    const headText = this.state.showCreateForm ? "Register User to family" : "Create New User and Family";
    return (
      <div className='.modal' ref={this.setWrapperRef}>
        <section className="modal-main">
          <div>
            <h1>{headText}</h1>
            <h4 onClick={this.handleSwitchForm}><a>{linkText}</a></h4>
            {this.state.showCreateForm ? this.registerUser() : this.createFamily()}
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
    homeActions: bindActionCreators(homeActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
