import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let imageGrid = this.props.images ? this.images.map((image, i) =>
    <div key={i}>
      <img src={image.url} alt='' />
    </div>

  ) : (null);
    return (
      <div className='album-wrapper'>
        <h1>Album</h1>
        <br/>
        <button onClick={this.props.albumActions.fetchMembers}>
          Clickabble button
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albumReducer: state.albumReducer,
    homeReducer: state.homeReducer
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
)(Album)
