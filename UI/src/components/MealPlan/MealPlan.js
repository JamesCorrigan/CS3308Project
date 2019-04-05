import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';

class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      parent: false
    }
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Meals</h1>
        Weekly Calendar Goes Here
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type='text' name='email' placeholder='Email' value={email} onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
            <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange}/>
          </label>
          <input type='submit' value='submit' />
        </form>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albumReducer: state.albumReducer,
    loginReducer: state.loginReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    albumActions: bindActionCreators(albumActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlan)
