import React, {Component, Button} from 'react';
//import { push } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../redux/actions/albumActions.js';
import * as homeActions from '../redux/actions/homeActions.js';
import * as loginActions from '../redux/actions/loginActions.js';

import Footer from '../components/Footer/Footer';
import Selector from '../components/Home/Selector';

/*Home*/
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
    const body = this.props.loggedIn ? (
      <main role="main">
        <div class="module mid">
          <h2>Family Time</h2>
          <h3>Home Page</h3>
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
      </main>
    ) : (
      <main role="main">
        <div class="module mid">
          <h2>Family Time</h2>
          <h3>Log in to use features</h3>
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
