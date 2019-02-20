import React, { Component } from 'react';

export default class LoginModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      form: ''
    }
  }
  render() {
    const show = this.props.visible ? {} : {display: 'none'};
    return (
      <div className='modal' style={show}>
        <button onClick={this.props.toggle}>Click</button>
        <div className='modal-content'>
        <h1>Login Form</h1>
        {JSON.stringify(this.props.visible)}

        </div>
      </div>
    )
  }
}
