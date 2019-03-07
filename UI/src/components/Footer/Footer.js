import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  render() {
    return (
      <footer className="footer container">
        <p className="float-right" onClick={this.handleClick}><a href="">Back to top</a></p>
        <p>Group Member Names?</p>
      </footer>
    );
  }
}
