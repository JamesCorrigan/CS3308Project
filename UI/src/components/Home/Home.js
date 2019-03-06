import React, {Component} from 'react';
//import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

import LoginForm from '../basic/LoginForm.js';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {members: null}
  };

  componentDidMount() {
    fetch('/users').then(res=>res.json()).then(members => this.setState({members}))
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <LoginForm
          login={this.props.loginActions.login}
          createUser={this.props.loginActions.createUser}
        />
        <p>Count: {this.props.count}</p>

        <p>
          <button onClick={this.props.countActions.increment}>Increment</button>
          <button onClick={this.props.countActions.incrementAsync} disabled={this.props.isIncrementing}>
            Increment Async
          </button>
        </p>

        <p>
          <button onClick={this.props.countActions.decrement}>Decrement</button>
          <button onClick={this.props.countActions.decrementAsync} disabled={this.props.isDecrementing}>
            Decrement Async
          </button>
        </p>
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
