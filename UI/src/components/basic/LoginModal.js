import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      showRegister: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  };


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
        this.props.loginActions.login(email, password);
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

 /**
  * Set the wrapper ref
  */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

 /**
  * Alert if clicked on outside of element
  */
 handleClickOutside(e) {
   if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
     this.props.handleClose(e);
   }
 }

  render() {
    const { email, password } = this.state;
    return (
      <div className='.modal' ref={this.setWrapperRef}>
        <section className="modal-main">
          <div>
            <h1>Login</h1>
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
