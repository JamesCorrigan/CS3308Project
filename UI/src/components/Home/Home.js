import React, {Component, Button} from 'react';
//import { push } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: null
    };
  };

  render() {
    const title = this.props.title ? this.props.title : null;
    const photo = this.props.photo ? this.props.photo : null;
    
    return (
      <div className="col-lg-4">
        <svg className="bd-placeholder-img rounded-circle" width="140"
          height="140" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice" focusable="false"
          role="img" aria-label="Placeholder: 140x140">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#777" />
          <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
        </svg>
        <h2>{title}</h2>
        <p>
          <Link className="btn btn-secondary" to={this.props.to} role="button">
            View details »
          </Link>
        </p>
      </div>
    );
  }
}
/*Home*/
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showModal: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };
  handleChange = e => {
    e.preventDefault();
    this.setState(prevState => {return {showRegister: !prevState.showRegister}});
  }

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => {return {showModal: !prevState.showModal}});
  }

  render() {

    const footer = (
      <footer className="container">
        <p className="float-right"><a href="">Back to top</a></p>
        {/*<p>Made by Henry, Kara, Niko, James, Ahoto and Joe</p>*/}
      </footer>
    );
    const logincomponent = (
      <div>
        <h1>Home</h1>
        <h3 onClick={this.handleChange}>{linkText}</h3>
        {this.state.showRegister ?
          <RegisterForm register={this.props.loginActions.register} />
        : <LoginForm login={this.props.loginActions.login} /> }
      </div>
    );

    const linkText = this.state.showRegister ? "Login" : "Register New User";

    return (
      <div className="botpage">
        <div className="container marketing">
          <div className="row">
            <Selector title='Meal Calendar' to='/mealplan'/>
            <Selector title='Vacation Planning' to='/vacations'/>
            <Selector title='Photo Gallery' to='/photoalbum' />
          </div>
          <hr className="featurette-divider" />
        </div>
        {footer}
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
