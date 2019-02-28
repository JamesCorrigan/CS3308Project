import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link to="/photoalbum">Album</Link>
        <Link to="/vacations">Vacations</Link>
        <Link to="/mealplan">Meals</Link>
      </header>
    );
  }
}
