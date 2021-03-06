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
      date: new Date()
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const family = this.props.user ? this.props.user.family : null
    this.props.vacationActions.getCalendar(family)
  }

  handleSelect = ({ start, end }) => {
    console.log(start, end);
    const family = this.props.user ? this.props.user.family : null;
    const parent = this.props.user ? this.props.user.parent : null;
    if (parent) {
      let title = window.prompt('New Event name');
      const newEvent = {start, end, title};
      if (title && family) {
        this.props.vacationActions.addEvent(family, newEvent);
      }
    } else {
      window.alert('Only Parents can create events!')
    }
  }

  handleChange(date) {
    this.setState({ date });
  }

  handleDelete(event) {
    const family = this.props.user ? this.props.user.family : null;
    const parent = this.props.user ? this.props.user.parent : null;
    if (parent) {
      const r = window.confirm("Remove this event?");
      console.log(parent);
      if (r === true && family !== null) {
        //delete event
        this.props.vacationActions.deleteEvent(family, event);
      }
    } else {
      window.alert('Only parents can remove events!');
    }
  }

  render() {
    const events = this.props.events && this.props.events.length > 0 ? this.props.events : [];
    return (
      <div>
        <h1 className= "calenderHeader">Vacations</h1>
        <h2 className= "description"> Highlight any number of days to select time for your vacation.</h2>
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={['month']}
          events={events}
          style={{ height: "100vh" }}
          onSelectEvent={this.handleDelete}
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    vacationReducer: state.vacationReducer,
    loginReducer: state.loginReducer,
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user,
    events: state.vacationReducer.calendar
  };
};


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
)(Vacations);
