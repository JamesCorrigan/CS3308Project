import React, {Component} from 'react';
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
    const photos = this.props.photos ? this.props.photos : null;

    return (
      <div className="col-lg-4">
        <img src={photos} alt="plane" height="140px" width="140px"/>
        <h2>{title}</h2>
        <p>
          <Link className="btn btn-secondary" to={this.props.to} role="button">
            View »
          </Link>
        </p>
      </div>
    );
  }
}
