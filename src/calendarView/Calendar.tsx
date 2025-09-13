import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

export default function CalendarPage() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const today = `${year}-${month}-${day}`;

  return (
    <div className="main-content">
      <div className="calendar-header">
        <h1>Calendar</h1>
        <div className="event-form" id="event-form">
            <form id="eventForm">
              <div className="title-form">
                <label className="eventTitle">Title:</label>
                <input type="text" id="eventTitle" name="title" required />
              </div>
              <div className="date-time-form">
                <label className="eventDate">Date:</label>
                <input type="date" id="eventDate" name="date" required />

                <label className="eventTime">Time:</label>
                <input type="time" id="eventTime" name="time" required />
              </div>
              <div className="function-button">
                <button type="submit">Add Event</button>
                <button type="button" id="cancel-btn">Cancel</button>
              </div>
            </form>
        </div>
      </div>

      {/* FullCalendar */}
      <div className="calendar-container">
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={today}
        editable={true}
        selectable={true}
        />
      </div>
    </div>
  );
}