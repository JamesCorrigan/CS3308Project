import React, {Component, Button} from 'react';
//libraries to support url links
import { Route, Link } from 'react-router-dom';
//imports for redux library
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
//redux action imports
import * as albumActions from '../redux/actions/albumActions.js';
import * as homeActions from '../redux/actions/homeActions.js';
import * as loginActions from '../redux/actions/loginActions.js';

//component imports
import Vacations from '../components/Vacations/Vacations.js';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header.js';
import PhotoAlbum from '../components/PhotoAlbum/PhotoAlbum.js';
import MealPlan from '../components/MealPlan/MealPlan.js';
import RegisterModal from '../components/basic/RegisterModal.js';
import LoginModal from '../components/basic/LoginModal';
import Home from './Home';

//Classes extending React.Component have state, props, etc.
class App extends Component {
  constructor(props) {
    //initialize props to this.props
    super(props);
    let show = !this.props.loggedIn ? true : false;
    //initialize this.state
    this.state = {
      data: null,
      showRegModal: false,
      showLogModal: false
    }
    //any event handlers need to be bound to (this)
    //clicks, submit, etc all are event handlers
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);
  }
  //close modal event handler
  handleCloseLogin = e => {
    //prevent event from triggering until call
    e.preventDefault();
    this.setState({ showLogModal: false });
  }

  handleCloseRegister = e => {
    //prevent event from triggering until call
    e.preventDefault();
    this.setState({ showRegModal: false });
  }
  //open modal event handler
  handleShowRegister = e => {
    //prevent event from triggering until call
    e.preventDefault();
    this.setState({showRegModal: true});
  }

  handleShowLogin = e => {
    //prevent event from triggering until call
    e.preventDefault();
    this.setState({showLogModal: true});
  }

  render() {
    const routes = this.props.loggedIn ? (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/vacations" component={Vacations} />
        <Route exact path="/album" component={PhotoAlbum} />
      </div>
    ) : (null);
    //render JSX elements here
    //conditional shortcut: {this.state.bool ? a : b}
    //returns a if true, b if false
    const app = this.props.loggedIn ? (
      <div className='ui-page'>
        {/*LOGGED IN*/}
        <Header
          handleShowRegister={this.handleShowRegister}
          handleShowLogin = {this.handleShowLogin}
          loggedIn = {true}
          user = {this.props.user}
        />
        {routes}
      </div>
    ) : (
      <div className='login-page'>
        {/*NOT LOGGED IN*/}
        <Header
          handleShowRegister={this.handleShowRegister}
          handleShowLogin = {this.handleShowLogin}
          loggedIn = {false}
          user = {this.props.user}
        />
        <Route exact path="/" component={Home} />
        {this.state.showRegModal ? <RegisterModal handleClose={this.handleCloseRegister} /> : null}
        {this.state.showLogModal ? <LoginModal handleClose={this.handleCloseLogin} /> : null}
      </div>
    );
    return app;
  }
}

//Link redux store to this.props
//DO NOT EDIT
const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer,
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user
  };
};

//Link redux actions (functions) to props
//DO NOT EDIT
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
)(App)
