import React, {Component, Button} from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../redux/actions/albumActions.js';
import * as homeActions from '../redux/actions/homeActions.js';
import * as loginActions from '../redux/actions/loginActions.js';

import Home from './Home';
import Vacations from '../components/Vacations/Vacations.js';
import Header from '../components/Header/Header.js';
import PhotoAlbum from '../components/PhotoAlbum/PhotoAlbum.js';
import MealPlan from '../components/MealPlan/MealPlan.js';
import LoginModal from '../components/basic/Modal.js';

class App extends Component {
  constructor(props) {
    super(props);
    let show = !this.props.loggedIn ? true : false;
    this.state = {
      data: null,
      showModal: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = e => {
    e.preventDefault();
    this.setState({showModal: false});
  }

  handleShow = e => {
    e.preventDefault();
    this.setState({showModal: true});
  }
  render() {

    return (
      <div>
        <Header handleShow={this.handleShow} />
        {this.state.showModal ?
          <LoginModal handleClose={this.handleClose} /> : null}
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/vacations" component={Vacations} />
          <Route exact path="/photoalbum" component={PhotoAlbum} />
          <Route exact path="/mealplan" component={MealPlan} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer,
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user
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
)(App)
