import React, {Component, Button} from 'react';
//libraries to support url links
import { Route, Link } from 'react-router-dom';
//imports for redux library
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//redux action imports
import * as albumActions from '../redux/actions/albumActions.js';
import * as homeActions from '../redux/actions/homeActions.js';
import * as loginActions from '../redux/actions/loginActions.js';

//component imports
import Home from './Home';
import Vacations from '../components/Vacations/Vacations.js';
import Header from '../components/Header/Header.js';
import PhotoAlbum from '../components/PhotoAlbum/PhotoAlbum.js';
import MealPlan from '../components/MealPlan/MealPlan.js';
import LoginModal from '../components/basic/Modal.js';

//Classes extending React.Component have state, props, etc.
class App extends Component {
  constructor(props) {
    //initialize props to this.props
    super(props);
    let show = !this.props.loggedIn ? true : false;
    //initialize this.state
    this.state = {
      data: null,
      showModal: false
    }
    //any event handlers need to be bound to (this)
    //clicks, submit, etc all are event handlers
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  //close modal event handler
  handleClose = e => {
    //prevent event from triggering until call
    e.preventDefault();
    this.setState({showModal: false});
  }
  //open modal event handler
  handleShow = e => {
    //prevent event from triggering until call
    e.preventDefault();
    this.setState({showModal: true});
  }
  render() {
    //render JSX elements here
    //conditional shortcut: {this.state.bool ? a : b}
    //returns a if true, b if false
    return (
      <div>
        {/*Pass modal functions to header component for button*/}
        <Header handleShow={this.handleShow} />
        {this.state.showModal ?
          <LoginModal handleClose={this.handleClose} /> : null}
        <main>
          {/*Route pages for link clicks, default=home*/}
          <Route exact path="/" component={Home} />
          <Route exact path="/vacations" component={Vacations} />
          <Route exact path="/photoalbum" component={PhotoAlbum} />
          <Route exact path="/mealplan" component={MealPlan} />
        </main>
      </div>
    );
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
