import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(image) {
    this.props.albumActions.uploadImage(image);
  }
  render() {
    let imageGrid = this.props.images ? this.images.map((image, i) =>
    <div key={i}>
      <img src={image} alt='' />
      {JSON.stringify(image)}
    </div>
  ) : (null);


    return (
      <div className='album-wrapper'>
        <h1>Album</h1>
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
        <br/>
        <button onClick={this.props.albumActions.fetchMembers}>
          Clickabble button
        </button>
        {imageGrid}
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
