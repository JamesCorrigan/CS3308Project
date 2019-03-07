import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const links = (
      <div>
        <Link to="/" className='header-link'>Home</Link>
        <Link to="/photoalbum" className='header-link'>Album</Link>
        <Link to="/vacations" className='header-link'>Vacations</Link>
        <Link to="/mealplan" className='header-link'>Meals</Link>
      </div>
    );
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="familySite.html">FamilyTime</a>
          {links}
      <ul className="navbar-nav mr-auto">
            </ul>
            <div className="form-inline mt-2 mt-md-0">
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.handleShow}>Login</button>
            </div>
        </nav>
      </header>
    );
  }
}
