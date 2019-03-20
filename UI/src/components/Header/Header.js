import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <header className='header-wrapper'>
        <div className="header-nav">
          <a className="nav-homeLink" href="familySite.html">FamilyTime</a>
            <div className="nav-link-wrapper" id="navbarCollapse">
              <ul className="nav-links">
                <Link to="/" className='header-link' style={{textDecoration: 'none'}}>Home</Link>
                <Link to="/photoalbum" className='header-link' style={{textDecoration: 'none'}}>Album</Link>
                <Link to="/vacations" className='header-link' style={{textDecoration: 'none'}}>Vacations</Link>
                <Link to="/mealplan" className='header-link' style={{textDecoration: 'none'}}>Meals</Link>
              </ul>
            <div className='header-buttons-wrapper'>
              <button className="headerButton" onClick={this.props.handleShowLogin}>Login</button>
              <button className="headerButton" onClick={this.props.handleShowRegister}>Sign Up</button>
            </div>
            </div>
        </div>
      </header>
    );
  }
}
