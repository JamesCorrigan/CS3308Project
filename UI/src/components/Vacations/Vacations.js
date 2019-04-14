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
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect = ({ start, end }) => {
    console.log(start, end);
    const title = window.prompt('New Event name');
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
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
          view="month"
          
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
