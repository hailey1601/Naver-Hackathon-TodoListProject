import { useState, useMemo, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Task } from "./types";

export default function AllTask() {
  // State danh sách tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
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
    (task) => task.endDate < today && task.status !== "Done",
  ];

  return (
    <>
      <div className="all-tasks-page">
        <div className="task-sections">
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
            <div className="completed-task-list">
              {renderTasks(filterFn[2])}
            </div>
          </div>

          <div className="outDated-tasks">
            <h2>Outdated tasks</h2>
            <hr />
            <div className="outDated-task-list">{renderTasks(filterFn[3])}</div>
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
      </div>
    </>
  );
}
