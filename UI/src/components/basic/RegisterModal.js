import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        parent: false
      },
      cData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        parent: false
      },
      submitted: false,
      showCreateForm: false
    };
    this.handleSwitchForm = this.handleSwitchForm.bind(this);
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.handleCreateCheck = this.handleCreateCheck.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleRegChange = this.handleRegChange.bind(this);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.handleRegCheck = this.handleRegCheck.bind(this);

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
    if (cObj.first_name && cObj.last_name
        && cObj.email && cObj.password) {
        //only call with all data present
        this.props.loginActions.createFamily(cObj);
    }
  }

  createFamily() {
    const { first_name, last_name, email, password, parent } = this.state.cData;
    return (
      <div className='register-form'>
        <form onSubmit={this.handleCreateSubmit}>
          <label>
            <input
              type='text'
              name='first_name'
              placeholder='First Name'
              value={first_name}
              onChange={this.handleCreateChange}
            />
          </label>
          <label>
            <input
              type='text'
              name='last_name'
              placeholder='Last Name'
              value={last_name}
              onChange={this.handleCreateChange}
             />
          </label>
          <label className="check">Check if Parent
            <input
              type='checkbox'
              name='parent'
              checked={parent}
              onChange={this.handleCreateCheck}
            />
            <span className="checkmark"></span>
          </label>
          <label>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={this.handleCreateChange}
             />
           </label>
          <br/>
          <label>
            <input
              type='password'
              name='password'
              placeholder='Password'
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
    const data = this.state.rData;
    this.setState({rData: {...data, [name]: value }});
  }

  handleRegCheck(e) {
    const value = e.target.checked;
    const name = e.target.name;
    const data = this.state.rData;
    this.setState({rData: { ...data, [name]: value }})
  }

  handleRegSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const rData = this.state.rData;
    if (rData.first_name && rData.last_name && rData.family && rData.email && rData.password) {
        this.props.loginActions.addMemberToFamily(rData);
    }
  }

  registerUser() {
    const { first_name, last_name, email, password, family, parent } = this.state.rData;
    return (
      <div className='register-form'>
        <form onSubmit={this.handleRegSubmit}>
          <label>
            <input
              type='text'
              name='first_name'
              placeholder='First Name'
              value={first_name}
              onChange={this.handleRegChange}
            />
          </label>
          <label>
            <input
              type='text'
              name='last_name'
              placeholder='Last Name'
              value={last_name}
              onChange={this.handleRegChange}
             />
          </label>
          <label>
            <input
              type='text'
              name='family'
              placeholder='Family'
              value={family}
              onChange={this.handleRegChange}
             />
          </label>
          <br/>
          <label className="check">Check if Parent
            <input
              type='checkbox'
              name='parent'
              checked={parent}
              onChange={this.handleRegCheck}
            />
            <span className="checkmark"></span>
          </label>
          <br/>

          <label>
            <input type='text' name='email' placeholder='Email' value={email} onChange={this.handleRegChange}/>
          </label>
          <br/>
          <label>
            <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleRegChange}/>
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
          <div className="makeUser">
            <h1 className="headerWords1">{headText}</h1>
            <h4 className="headerWords2" onClick={this.handleSwitchForm}>{linkText}</h4>
            </div>
            {this.state.showCreateForm ? this.registerUser() : this.createFamily()}
          </div>
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
