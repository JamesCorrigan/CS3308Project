import React, {Component} from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

export default class Vacations extends Component {
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ date });
  }
  render() {
    return (
      <div>
        <h1>Vacations</h1>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
        Monthly Calendar Goes Here
      </div>
    );
  }
}
