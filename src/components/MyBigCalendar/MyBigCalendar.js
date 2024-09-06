import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Spotkanie', start: new Date(2024, 8, 10), end: new Date(2024, 8, 10) },
    { id: 2, title: 'Wydarzenie muzyczne', start: new Date(2024, 8, 12, 10, 0), end: new Date(2024, 8, 12, 12, 0) }
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Wprowadź tytuł wydarzenia');
    if (title) {
      setEvents([...events, { id: events.length + 1, title, start, end }]);
    }
  };

  const handleSelectEvent = (event) => {
    const newTitle = window.prompt('Edytuj tytuł wydarzenia', event.title);
    if (newTitle) {
      setEvents(events.map(evt => evt.id === event.id ? { ...evt, title: newTitle } : evt));
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default MyBigCalendar;
