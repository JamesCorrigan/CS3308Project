import React, {Component} from 'react';
//import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

import LoginForm from '../basic/LoginForm.js';
import RegisterForm from '../basic/RegisterForm.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showRegister: false,
    }
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange = e => {
    e.preventDefault();
    this.setState(prevState => {return {showRegister: !prevState.showRegister}});
  }
  componentDidMount() {
    fetch('/users').then(res=>res.json()).then(members => this.setState({members}))
  }

  render() {
    const linkText = this.state.showRegister ? "Login" : "Register New User";
    return (
      <div>
        <h1>Home</h1>
        <h3 onClick={this.handleChange}>{linkText}</h3>
        {this.state.showRegister ?
          <RegisterForm register={this.props.loginActions.register} />
        : <LoginForm login={this.props.loginActions.login} /> }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countActions: bindActionCreators(countActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
