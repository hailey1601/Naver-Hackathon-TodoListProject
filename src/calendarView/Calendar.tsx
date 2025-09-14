import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import type { Task } from "../types";

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  // Lấy task từ LocalStorage
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
    }
  }, []);

  // Hiện task lên Calendar
  const calendarEvents = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.startDate,
    end: task.endDate,
    backgroundColor: getTaskColor(task.priority, task.status),
    borderColor: getTaskColor(task.priority, task.status),
    textColor: "white",
    extendedProps: {
      description: task.description,
      priority: task.priority,
      status: task.status,
      tags: task.tags,
    },
  }));

  // Màu dựa trên status và priority
  function getTaskColor(priority: string, status: string): string {
    if (status === "Done") return "#588157"; // Fern green cho completed
    if (status === "In Progress") return "#a3b18a"; // Sage cho in progress

    switch (priority) {
      case "High":
        return "#344e41"; // Brunswick green cho high priority
      case "Medium":
        return "#3a5a40"; // Hunter green cho medium priority
      case "Low":
        return "#588157"; // Fern green cho low priority
      default:
        return "#dad7cd"; // Timberwolf cho default
    }
  }

  return (
    <div className="main-content">
      <div className="calendar-header">
        <h2>Calendar</h2>
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
              <button type="button" id="cancel-btn">
                Cancel
              </button>
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
          events={calendarEvents}
          eventClick={(info) => {
            alert(
              `Task: ${info.event.title}\nPriority: ${info.event.extendedProps.priority}\nStatus: ${info.event.extendedProps.status}\nDescription: ${info.event.extendedProps.description}`
            );
          }}
          height="auto"
        />
      </div>
    </div>
  );
}
