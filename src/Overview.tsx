import { useState, useEffect, useMemo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { mockData } from "./mockData";

type Priority = "Low" | "Medium" | "High";
type Status = "To Do" | "In Progress" | "Done";

type Task = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  status: Status;
  description: string;
  tags: string[];
};

export default function Overview() {
    
  // State thông báo lỗi cho người dùng
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // State danh sách tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    setTasks((prevTasks: any) => {
      localStorage.setItem(
        "tasks",
        JSON.stringify([...prevTasks, ...mockData])
      );
      return [...prevTasks, ...mockData];
    });
  }, []);

  // State form tạo task mới
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    startDate: "",
    endDate: "",
    priority: "Low",
    status: "To Do",
    description: "",
    tags: [] as string[],
  });

  // State task đang được chọn để xem/chỉnh sửa
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Load tasks từ localStorage khi ứng dụng khởi chạy
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

  // Lưu tasks vào localStorage mỗi khi danh sách tasks thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  // Xử lý thay đổi input form tạo task mới
  const [tagsInput, setTagsInput] = useState("");

  // Xử lý thay đổi input form
  const handleNewTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setTagsInput(value); // giữ nguyên text hiển thị trong input
      setNewTask((prev) => ({
        ...prev,
        tags: value
          .split(",") // tách chuỗi khi người dùng nhập dấu phẩy
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
      setErrorMessage("Task name is required!");
      return;
    }
    // Sử dụng ID duy nhất
    const id = Date.now().toString();
    setTasks([...tasks, { id, ...newTask }]);
    setNewTask({
      title: "",
      startDate: "",
      endDate: "",
      priority: "Low",
      status: "To Do",
      description: "",
      tags: [],
    });
    setErrorMessage(null); // Xóa thông báo lỗi sau khi thêm thành công
  };

  // Mở modal chi tiết task
  const openTask = (task: Task) => {
    setSelectedTask(task);
  };

  // Đóng modal chi tiết task
  const closeTask = () => {
    setSelectedTask(null);
  };

  // Thêm hàm xóa task
  const deleteTask = (taskId: string) => {
    setTasks((prev: Task[]) => prev.filter((task) => task.id !== taskId));
    closeTask();
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
    setTasks((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === selectedTask.id ? selectedTask : task
      )
    );
    closeTask();
  };

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Hàm render danh sách tasks với bộ lọc
  const renderTasks = (filterFn: (tasks: Task) => boolean) => {
    return tasks.filter(filterFn).map((task: Task) => (
      <div key={task.id} className="task-card" onClick={() => openTask(task)}>
        <h4 className="task-title">{task.title}</h4>
        <p className="due-date">
          {task.startDate} - {task.endDate}
        </p>
        <p className="task-status">{task.status}</p>
        <p className="priority">Priority: {task.priority}</p>
        {task.tags && task.tags.length > 0 && (
          <p>Tags: {task.tags.join(", ")}</p>
        )}
        <p
          className="delete-task"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        >
          {" "}
          🗑
        </p>
      </div>
    ));
  };

  const filterFn: Array<(task: Task) => boolean> = [
    (task) => task.startDate === today && task.status !== "Done",
    (task) => task.startDate > today && task.status !== "Done",
    (task) => task.status === "Done",
  ];

  return (
    <>
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
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              className="task-status"
              name="status"
              value={newTask.status}
              onChange={handleNewTask}
            >
              <option value="To Do">To do</option>
              <option value="In Progress">In progress</option>
              <option value="Done">Done</option>
            </select>

            <textarea
              className="task-description"
              name="description"
              placeholder="Task description"
              value={newTask.description}
              onChange={handleNewTask}
            />

            <input
              type="text"
              className="task-tags"
              placeholder="Tags (comma separated)"
              name="tags"
              value={tagsInput}
              onChange={handleNewTask}
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="add-task-btn" onClick={addTask}>
              Add Task
            </button>
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
          <div className="recent-task-list">{renderTasks(filterFn[0])}</div>
        </div>

        <div className="upcoming-tasks">
          <h2>Upcoming tasks</h2>
          <hr />
          <div className="upcoming-task-list">{renderTasks(filterFn[1])}</div>
        </div>

        <div className="completed-tasks">
          <h2>Completed tasks</h2>
          <hr />
          <div className="completed-task-list">{renderTasks(filterFn[2])}</div>
        </div>
      </div>

      {/* Modal chi tiết của từng task */}
      {selectedTask && (
        <div id="taskDetail" className="detail">
          <div className="detail-content">
            <span id="closeModal" onClick={closeTask}>
              {" "}
              X{" "}
            </span>

            <h2>DETAIL AND EDIT TASK</h2>
            <form id="editForm" onSubmit={saveTaskChanges}>
              <input
                type="hidden"
                id="edit-id"
                value={selectedTask.id}
                readOnly
              />
              <label>Title:</label>
              <input
                type="text"
                id="edit-title"
                name="title"
                value={selectedTask.title}
                onChange={handleEditChange}
              />

              <br />
              <br />

              <label>Start Date:</label>
              <input
                type="date"
                id="edit-start-date"
                name="startDate"
                value={selectedTask.startDate}
                onChange={handleEditChange}
              />

              <br />
              <br />

              <label>End Date:</label>
              <input
                type="date"
                id="edit-end-date"
                name="endDate"
                value={selectedTask.endDate}
                onChange={handleEditChange}
              />

              <br />
              <br />

              <label>Status: </label>
              <select
                id="edit-status"
                name="status"
                value={selectedTask.status}
                onChange={handleEditChange}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <br />
              <br />

              <label>Priority: </label>
              <select
                id="edit-priority"
                name="priority"
                value={selectedTask.priority}
                onChange={handleEditChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <br />
              <br />

              <label>Description:</label>
              <textarea
                id="edit-desc"
                name="description"
                value={selectedTask.description}
                onChange={handleEditChange}
              ></textarea>

              <br />
              <br />

              <label>Tags:</label>
              <input
                type="text"
                id="edit-tags"
                name="tags"
                value={selectedTask.tags.join(", ")}
                onChange={handleEditChange}
                placeholder="Tags (comma separated)"
              />

              <br />
              <br />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
