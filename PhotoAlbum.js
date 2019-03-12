import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
import '../../styles/photoAlbum.css';
class Album extends Component {
  
  
  
  constructor(props) {
    super(props);
    this.state = {
      width:  800,
      height: 182
    }
    var screen = window.innerWidth;
    console.log("screen size: ", screen);
  }
  updateDimensions() {
    if(window.innerWidth < 500) {
      this.setState({ width: 450, height: 102 });
    } else {
      let update_width  = window.innerWidth-100;
      let update_height = Math.round(update_width/4.4);
      this.setState({ width: update_width, height: update_height });
    }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return (
      <div id ="name">
        <h1> Album </h1>
        <div id ="album">
          <table>
            <tr>
              <td> a </td><td> b </td><td> c </td><td> d </td>
            </tr>
            <tr>
              <td> e </td><td> f </td><td> g </td><td> h </td>
            </tr>
            <tr>
              <td> i </td><td> j </td><td> k </td><td> l </td>
            </tr>
            <tr>
              <td> m </td><td> n </td><td> o </td><td> p </td>
            </tr>
            <tr>
              <td> q </td><td> r </td><td> s </td><td> t </td>
            </tr>
          </table>
        </div>
        <br/>
        <button onClick={this.props.albumActions.fetchMembers}>
          Upload Image
        </button>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.countReducer.count,
    isIncrementing: state.countReducer.isIncrementing,
    isDecrementing: state.countReducer.isDecrementing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countActions: bindActionCreators(countActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album)
