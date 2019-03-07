import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showRegister: false
    };
    this.handleChange = this.handleChange.bind(this);

  };

  handleChange = e => {
    e.preventDefault();
    this.setState(prevState => {return {showRegister: !prevState.showRegister}});
  }

  render() {
    const linkText = this.state.showRegister ? "Login" : "Register New User";
    const headText = !this.state.showRegister ? "Login" : "Register User";
    const logincomponent = (
      <div>
        <h1>{headText}</h1>
        <h4 onClick={this.handleChange}><a>{linkText}</a></h4>

        {this.state.showRegister ?
          <RegisterForm register={this.props.loginActions.register} />
        : <LoginForm login={this.props.loginActions.login} />
        }
      </div>
    );
    return (
      <div className='.modal'>
        <section className="modal-main">
          {logincomponent}
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
