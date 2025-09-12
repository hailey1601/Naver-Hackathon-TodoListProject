import {useState} from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./App.css";

type Priority = "low" | "medium" | "high";
type Status = "todo" | "in_progress" | "done";

type Task = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  status: Status;
  description: string;
  tags: string[];
};

function App() {
  // State danh sách tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // State form tạo task mới
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    startDate: "",
    endDate: "",
    priority: "low",
    status: "todo",
    description: "",
    tags: [],
  });

  // State task đang được chọn để xem/chỉnh sửa
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Xử lý thay đổi input form tạo task mới
  const handleNewTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      // Chuyển chuỗi tags thành mảng
      setNewTask((prev) => ({
        ...prev,
        tags: value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }));
    } else {
      setNewTask((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Thêm task mới vào danh sách
  const addTask = () => {
    if (newTask.title.trim() === "") {
      alert("Task name is required");
      return;
    }
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id, ...newTask }]);
    // Reset form
    setNewTask({
      title: "",
      startDate: "",
      endDate: "",
      priority: "low",
      status: "todo",
      description: "",
      tags: [],
    });
  };

  // Mở modal chi tiết task
  const openTask = (task: Task) => {
    setSelectedTask(task);
  };

  // Đóng modal chi tiết task
  const closeTask = () => {
    setSelectedTask(null);
  };

  // Xử lý thay đổi form chỉnh sửa task trong modal
  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!selectedTask) return;
    const { name, value } = e.target;
    if (name === "tags") {
      setSelectedTask({
        ...selectedTask,
        tags: value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
    } else {
      setSelectedTask({
        ...selectedTask,
        [name]: value,
      });
    }
  };

  // Lưu thay đổi task sau khi chỉnh sửa
  const saveTaskChanges = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    setTasks((prev) =>
      prev.map((task) => (task.id === selectedTask.id ? selectedTask : task))
    );
    closeTask();
  };

  // Hàm render danh sách task theo trạng thái
  const renderTasksByStatus = (status: Status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          className="task-item"
          onClick={() => openTask(task)}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            margin: "5px",
            padding: "5px",
          }}
        >
          <h4>{task.title}</h4>
          <p>
            {task.startDate} - {task.endDate}
          </p>
          <p>Priority: {task.priority}</p>
          <p>Tags: {task.tags.join(", ")}</p>
        </div>
      ));
  };

  return (
    <div>
      <header>
        <div className="search-box">
          <input
            className="search-input"
            type="search"
            placeholder="Search..."
          />
          <button className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
        <div className="account">
          <div className="notification">
            <i className="bx bx-bell"></i>
          </div>
          <div>
            <i className="bx bx-user-circle"></i>
          </div>
          <div className="name-box">
            <p className="user-name"></p>

            <div className="dropdown">
              <button className="user">Account</button>
              <button className="logout-btn">Log out</button>
            </div>
          </div>
        </div>
      </header>

      <div id="side-menu">
        <div className="name-website">
          <p>Owlhelper</p>
        </div>

        <div className="menu">
          <div id="overview">
            <button className="overview-btn">
              <img src="../image/icons8-web-design-50.png" /> Overview
            </button>
          </div>
          <div id="calendar">
            <button className="calendar">
              <img src="../image/icons8-timeline-week-50 (1).png" /> Calendar
            </button>
          </div>
          <div id="setting">
            <button className="setting-btn">
              <img src="../image/icons8-setting-50.png" /> Setting
            </button>
          </div>
        </div>

        <hr className="line-menu" />

        <div className="sub-menu">
          <div className="tags-column">
            <h3>TAG</h3>
          </div>
          <div id="personal">
            <button className="personal-btn">
              <img src="../image/icons8-folder-50.png" /> Personal
            </button>
          </div>
          <div id="group">
            <button className="group-btn">
              <img src="../image/icons8-folder-50.png" /> Group
            </button>
          </div>
        </div>

        <div className="light-dark-mode">
          <button className="dark-mode">
            <img src="../image/icons8-moon-and-stars-50.png" />
          </button>
          <button className="light-mode-mode">
            <img src="../image/icons8-sun-50.png" />
          </button>
        </div>
      </div>

      <div className="tasks">
        <div className="task-header">
          <div className="create-task">
            <h2>Create a new task</h2>
            <input
              type="text"
              className="task-input"
              placeholder="Task name"
              name="title"
              value={newTask.title}
              onChange={handleNewTask}
            />

            <input
              type="date"
              className="start-date"
              name="startDate"
              value={newTask.startDate}
              onChange={handleNewTask}
            />

            <input
              type="date"
              className="end-date"
              name="endDate"
              value={newTask.endDate}
              onChange={handleNewTask}
            />

            <select
              className="task-priority"
              name="priority"
              value={newTask.priority}
              onChange={handleNewTask}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              className="task-status"
              name="status"
              value={newTask.status}
              onChange={handleNewTask}
            >
              <option value="ToDo">To do</option>
              <option value="InProgress">In progress</option>
              <option value="Done">Done</option>
            </select>

            <textarea
              className="task-description"
              placeholder="Task description"
            ></textarea>

            <input
              type="text"
              className="task-tags"
              placeholder="Tags (comma separated)"
              name="tags"
              value={newTask.tags.join(", ")}
              onChange={handleNewTask}
            />

            <button className="add-task-btn" onClick={addTask}>Add Task</button>
          </div>

          <div className="quote">
            <h2>Quote of the day</h2>
            <div className="quote-text">
              <p>"The only way to do great work is to love what you do."</p>
              <p>- Steve Jobs</p>
            </div>
          </div>
        </div>

        <div className="today-tasks">
          <h2>Today's tasks</h2>
          <hr />
          <div className="recent-task-list">{renderTasksByStatus("todo")}</div>
        </div>

        <div className="upcoming-tasks">
          <h2>Upcoming tasks</h2>
          <hr />
          <div className="upcoming-task-list">{renderTasksByStatus("in_progress")}</div>
        </div>

        <div className="completed-tasks">
          <h2>Completed tasks</h2>
          <hr />
          <div className="completed-task-list">{renderTasksByStatus("done")}</div>
        </div>
      </div>

      {/* Modal chi tiết của từng task */}
      {selectedTask && (
        <div id='taskDetail' className="detail" style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className='detail-content' style={{backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "400px"}}>
            <span id="closeModal" style={{cursor: "pointer", float: "right", fontSize: "20px"}} onClick={closeTask}> &times; </span>
            
            <h2>DETAIL AND EDIT TASK</h2>
            <form id='editForm' onSubmit={saveTaskChanges}>
              <input type='hidden' id='edit-id' value={selectedTask.id} readOnly/>
              <label>Title:</label>
              <input 
               type='text' 
               id='edit-title' 
               name='title'
               value={selectedTask.title} 
               onChange={handleEditChange}
              />

              <br/><br/>

              <label>Start Date:</label>
              <input 
               type='date' 
               id='edit-start-date' 
               name='startDate'
               value={selectedTask.startDate} 
               onChange={handleEditChange}
              />

              <br/><br/>

              <label>End Date:</label>
              <input 
                type='date' 
                id='edit-end-date' 
                name='endDate'
                value={selectedTask.endDate} 
                onChange={handleEditChange}
              />

              <br/><br/>

              <label>Status: </label>
              <select
                id='edit-status'
                name='status'
                value={selectedTask.status}
                onChange={handleEditChange}
              >
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Done'>Done</option>
              </select>

              <br/><br/>

              <label>Priority: </label>
              <select 
                id='edit-priority'
                name='priority'
                value={selectedTask.priority}
                onChange={handleEditChange}
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>

              <br/><br/>

              <label>Description:</label>
              <textarea 
                id='edit-desc'
                name='description'
                value={selectedTask.description}
                onChange={handleEditChange}
              ></textarea>

              <br/><br/>

              <label>Tags:</label>
              <input 
                type='text' 
                id='edit-tags' 
                name='tags'
                value={selectedTask.tags.join(", ")}
                onChange={handleEditChange}
                placeholder='Tags (comma separated)'
              />

              <br/><br/>
              <button type='submit'>Save Changes</button>
          </form>
        </div>
      </div>
      )}
    </div>
);
}

export default App;