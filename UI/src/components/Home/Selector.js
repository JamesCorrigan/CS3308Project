import React, {Component, Button} from 'react';
import { Route, Link } from 'react-router-dom';

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: null
    };
  };

  render() {
    const title = this.props.title ? this.props.title : null;
    const photo = this.props.photo ? this.props.photo : null;

    return (
      <div className="col-lg-4">
        <svg className="bd-placeholder-img rounded-circle" width="140"
          height="140" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice" focusable="false"
          role="img" aria-label="Placeholder: 140x140">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#777" />
          <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
        </svg>
        <h2>{title}</h2>
        <p>
          <Link className="btn btn-secondary" to={this.props.to} role="button">
            View details »
          </Link>
        </p>
      </div>
    );
  }
}
