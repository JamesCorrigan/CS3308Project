import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import * as albumActions from '../../redux/actions/albumActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      newImage: null,
      uploadStatus: false
    }
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  handleUploadImage(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    console.log('uploading from react', data);
    this.props.albumActions.uploadImage(data);
    /*
    axios.post('http://localhost:4000/upload', data)
    .then(response => {
      console.log(response);
      this.setState({ imageURL: `http://localhost:4000/${response.body.file}`, uploadStatus: true });
    }).catch(error => {
       console.log(error);
     });
     */
  }
  onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({ newImage: e.target.files[0] });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const image = {

    }
    this.props.albumActions.uploadImage(image);
  }
  render() {
    let imageGrid = this.props.images ? this.props.images.map((image, i) =>
    <div key={i}>
      <img src={image} alt='' />
      {JSON.stringify(image)}
    </div>
  ) : (null);
    return (
      <div className='album-wrapper'>
        <h1>Album</h1>
        <div className="container">
          <form onSubmit={this.handleUpload}>
            <div className="form-group">
              <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>

            <div className="form-group">
              <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
            </div>

            <button className="btn btn-success" type='submit'>Upload</button>

            </form>
          </div>
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
