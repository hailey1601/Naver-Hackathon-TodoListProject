import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { mockData } from "./mockData";
import type { Task } from "./types";

export default function Overview() {
  const navigate = useNavigate();

  // State thông báo lỗi cho người dùng
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // State danh sách tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

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

  // Load tasks từ localStorage và thêm mock data khi ứng dụng khởi chạy
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        // Chỉ thêm mock data nếu chưa có tasks
        if (parsedTasks.length === 0) {
          const tasksWithMockData = [...parsedTasks, ...(mockData as Task[])];
          setTasks(tasksWithMockData);
          localStorage.setItem("tasks", JSON.stringify(tasksWithMockData));
        } else {
          setTasks(parsedTasks);
        }
      } else {
        // Nếu chưa có tasks trong localStorage, thêm mock data
        setTasks(mockData as Task[]);
        localStorage.setItem("tasks", JSON.stringify(mockData));
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      // Fallback: set mock data nếu có lỗi
      setTasks(mockData as Task[]);
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
      setErrorMessage("🤖 Hey there! Every great journey starts with a name. Give your task a title and let's make magic happen! ✨");
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
    setTagsInput(""); // Reset tags input
    setErrorMessage(null); // Xóa thông báo lỗi sau khi thêm thành công
  };

  return (
    <>
      <div className="overview-task">
        <div className="overview-header">
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

        <div className="task-progress">
          <h2>Task Progress</h2>
          <div
            className="task-progress-bar"
            onClick={() => navigate("/listTask")}
          >
            <div className="task-progress-bar-fill">
              <div className="metric">
                <div className="metric-number">
                  {tasks.filter((task) => task.status !== "Done").length}
                </div>
                <div className="metric-label">Tasks Left</div>
              </div>
              <div className="metric">
                <div className="metric-number">
                  {tasks.filter((task) => task.status === "Done").length}
                </div>
                <div className="metric-label">Completed</div>
              </div>
              <div className="metric">
                <div className="metric-number">
                  {
                    tasks.filter(
                      (task) =>
                        task.endDate < new Date().toISOString().split("T")[0] &&
                        task.status !== "Done"
                    ).length
                  }
                </div>
                <div className="metric-label">Overdue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
