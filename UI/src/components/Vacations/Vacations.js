import React, {Component} from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//redux action imports
import * as albumActions from '../../redux/actions/albumActions.js';
import * as homeActions from '../../redux/actions/homeActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
import * as vacationActions from '../../redux/actions/vacationActions.js';
const localizer = Calendar.momentLocalizer(moment);

class Vacations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "weeks")),
          title: "Jamaica Vacation"
        },
        {
          start: '2019-05-15',
          end: '2019-05-29',
          title: "Jamaica Vacation"
        }
      ]
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const family = this.props.user ? this.props.user.family : null
    this.props.vacationActions.getCalendar(family)
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    const newEvent = {start, end, title};
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          newEvent,
        ],
      })
    }

  handleChange(date) {
    this.setState({ date });
  }
  render() {
    return (
      <div>
        <h1 className= "calenderHeader">Vacations</h1>
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
        Monthly Calendar Goes Here
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer,
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user
  };
};

//Link redux actions (functions) to props
//DO NOT EDIT
const mapDispatchToProps = dispatch => {
  return {
    albumActions: bindActionCreators(albumActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch),
    vacationActions: bindActionCreators(vacationActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vacations)
