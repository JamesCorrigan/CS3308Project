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

class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      events: [
      ]
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
    const title = window.prompt('New Event name');
    const newEvent = {start, end, title};
    const family = this.props.user ? this.props.user.family : null;
    if (title && family) {
      this.setState({events: [...this.state.events, newEvent]})
    }
  }

  handleChange(date) {
    this.setState({ date });
  }

  handleDelete(event) {
    const family = this.props.user ? this.props.user.family : null;
    const r = window.confirm("Remove this event?");
    if (r === true && family !== null) {
      let events = this.state.events;
      let index;
      for (let i = 0; i < events.length; i++) {
        if (events[i].title === event.title && events[i].start === event.start && events[i].end === event.end) {
          index = i;
          events.splice(index, 1);
          break;
        }
      }
      this.setState({events})
    }
  }

  render() {
    const events = this.props.events && this.props.events.length > 0 ? this.props.events : [];
    return (
      <div>
        <h1 className= "calenderHeader">Meals</h1>
        <h2 className= "description"> Highlight any number of hours/minutes to select time for your family meal.</h2>
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          views={['week']}
          events={this.state.events}
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
)(MealPlan);
