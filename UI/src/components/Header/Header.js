import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const first_name = this.props.user ? this.props.user.first_name : null;
    const last_name = this.props.user ? this.props.user.last_name : null;
    const family = this.props.user ? this.props.user.family : null;

    const headerOptions = this.props.loggedIn ? (
      <div className="nav-link-wrapper" id="navbarCollapse">
        <ul className="nav-links">
        <Link to="/meals" className='header-link' style={{textDecoration: 'none'}}>Meals</Link>

          <Link to="/vacations" className='header-link' style={{textDecoration: 'none'}}>Vacations</Link>
          <Link to="/album" className='header-link' style={{textDecoration: 'none'}}>Album</Link>
        </ul>
        <ul className="right-links">
        <h6 className='header-name'>{first_name} {last_name}</h6>
        <h6 className='header-family'>Family #{family}</h6>
        <button className="headerButton" onClick={this.props.loginActions.logout}>Log Out</button>
        </ul>

      </div>
    ) : (
      <div className="nav-link-wrapper" id="navbarCollapse">
        <div className='header-buttons-wrapper'>
          <button className="headerButton" onClick={this.props.handleShowLogin}>Login</button>
          <button className="headerButton" onClick={this.props.handleShowRegister}>Sign Up</button>
        </div>
      </div>
    );
    return (
        <div className="header-nav">
          <Link className="nav-homeLink" to='/' style={{textDecoration: 'none'}}>FamilyTime</Link>
          {headerOptions}
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
)(Header)
