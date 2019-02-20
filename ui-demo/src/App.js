import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Modal from './components/Modal.js';

/*
Keep this small, import components from folders
*/
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginModal: true
    }
  }
  toggleLoginModal() {
    let newVal = !this.state.loginModal
    this.setState({loginModal: newVal});
  }
  render() {
    let isVisible = this.state.loginModal;
    return (
      <div className="App">
        <Modal
          visible={this.state.loginModal}
          toggle={() => this.toggleLoginModal()}
        />
        {/*
          */}
        <header className="App-header">
          <p>
            CSCI 3308 Group Project
          </p>
          {this.state.loginModal? 'true' : 'false'}
        </header>
      </div>
    );
  }
}

export default App;
