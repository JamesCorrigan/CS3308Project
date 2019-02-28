import React, {Component} from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../redux/actions/countActions.js'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Count: {this.props.count}</p>

        <p>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>
            Increment Async
          </button>
        </p>

        <p>
          <button onClick={this.props.decrement}>Decrement</button>
          <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>
            Decrement Async
          </button>
        </p>

        <p>
          <button onClick={() => this.props.changePage()}>
            Go to about page via redux
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.countReducer.count,
    isIncrementing: state.countReducer.isIncrementing,
    isDecrementing: state.countReducer.isDecrementing
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
