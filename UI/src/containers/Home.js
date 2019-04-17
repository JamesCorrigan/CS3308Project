import React, {Component, Button} from 'react';
//import { push } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../redux/actions/albumActions.js';
import * as homeActions from '../redux/actions/homeActions.js';
import * as loginActions from '../redux/actions/loginActions.js';
import meal from '../styles/meal.png';
import plane from '../styles/plane.png';
import camera from '../styles/camera.png';

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
      <div className="backgroundGif">
      </div>
        <div className="module mid">
          <h2><span>Family Time</span></h2>
          <h3><span className="log">Home Page</span></h3>
        </div>
        <div className="botpage">
          <div className="container marketing">
            <div className="row">
              <Selector title='Meal Calendar' to='/MealPlan' photos={meal}/>
              <Selector title='Vacation Planning' to='/vacations' photos={plane}/>
              <Selector title='Photo Gallery' to='/album' photos={camera}/>
            </div>
            <hr className="featurette-divider" />
          </div>
        </div>
      </div>
    ) : (
      <main role="main">
      {/*Else, render page asking for login*/}
      <div className="backgroundGif">
      </div>
        <div className="module mid">
          <h2><span>Family Time</span></h2>
          <h3><span>Log in to use features</span></h3>
        </div>
        <div className="botpage">
          <div className="container marketing">
            <hr className="featurette-divider" />
          </div>
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
    user: state.loginReducer.user,
    family: state.loginReducer.user.family
  };
};

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
