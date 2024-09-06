import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5001/api/events')
			.then(response => response.json())
			.then(data => setEvents(data));
	}, []);

	const handleSelectSlot = ({ start, end }) => {
		const title = window.prompt('Wprowadź tytuł wydarzenia');
		if (title) {
			const newEvent = { title, start, end };
			setEvents([...events, newEvent]);

			fetch('http://localhost:5001/api/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newEvent)
			})
			.then(response => response.json())
			.then(data => setEvents([...events, data]));
		}
	};

	const handleSelectEvent = (event) => {
		const newTitle = window.prompt('Edytuj tytuł wydarzenia', event.title);
		if (newTitle) {
			const updatedEvent = { ...event, title: newTitle };
			setEvents(events.map(evt => evt._id === event._id ? updatedEvent : evt));
			fetch(`http://localhost:5001/api/events/${event._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedEvent)
			})
			.catch(error => console.log(error));
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
