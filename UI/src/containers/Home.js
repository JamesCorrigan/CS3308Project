import React, {Component, Button} from 'react';
//import { push } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../redux/actions/albumActions.js';
import * as homeActions from '../redux/actions/homeActions.js';
import * as loginActions from '../redux/actions/loginActions.js';

import Footer from '../components/Footer/Footer';
//Selector has deteailed links to pages
import Selector from '../components/Home/Selector';

/*Home*/
class Home extends Component {
  constructor(props) {
    //initialize props and state
    super(props);
    this.state = {}
  };

  render() {
    const body = this.props.loggedIn ? (
      <div role="main">
      {/*if logged in, render main page*/}
        <div className="module mid">
          <h2><span>Family Time</span></h2>
          <h3><span>Home Page</span></h3>
        </div>
        <div className="botpage">
          <div className="container marketing">
            <div className="row">
              <Selector title='Meal Calendar' to='/mealplan'/>
              <Selector title='Vacation Planning' to='/vacations'/>
              <Selector title='Photo Gallery' to='/photoalbum' />
            </div>
            <hr className="featurette-divider" />
          </div>
          <Footer />
        </div>
      </div>
    ) : (
      <main role="main">
      {/*Else, render page asking for login*/}
        <div className="module mid">
          <h2><span>Family Time</span></h2>
          <h3><span>Log in to use features</span></h3>
        </div>
        <div className="botpage">
          <div className="container marketing">
            <hr className="featurette-divider" />
          </div>
          <Footer />
        </div>
      </main>
    );

    return body;
  };
};


//REDUX LINKS, DO NOT EDIT
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
    homeActions: bindActionCreators(homeActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
