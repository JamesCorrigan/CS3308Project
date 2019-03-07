import React, {Component, Button} from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../components/Home/Home.js';
import Vacations from '../components/Vacations/Vacations.js';
import Header from '../components/Header/Header.js';
import PhotoAlbum from '../components/PhotoAlbum/PhotoAlbum.js';
import MealPlan from '../components/MealPlan/MealPlan.js';
import LoginModal from '../components/basic/Modal.js';
import LoginForm from '../components/basic/LoginForm.js';
import RegisterForm from '../components/basic/RegisterForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loggedIn: false,
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
    const loginModal = (
      <LoginModal
        handleClose={this.handleClose}
      >
      </LoginModal>
    );

    const header = (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="familySite.html">FamilyTime</a>
          <Link to="/" className='header-link'>Home</Link>
          <Link to="/photoalbum" className='header-link'>Album</Link>
          <Link to="/vacations" className='header-link'>Vacations</Link>
          <Link to="/mealplan" className='header-link'>Meals</Link>
          <ul className="navbar-nav mr-auto">
            </ul>
            <div className="form-inline mt-2 mt-md-0">
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleShow}>
                Login
              </button>
            </div>
        </nav>
      </header>
    );

    return (
      <div>
        {header}
        {this.state.showModal ? loginModal : null}
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

export default App
