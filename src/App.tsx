import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";
import Overview from "./Overview";
import CalendarPage from "./calendarView/Calendar";
import AllTask from "./AllTask";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { name: "Test User" };
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Chế độ sáng/tối với localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false; // Default to light mode
  });

  useEffect(() => {
    // Save to localStorage whenever darkMode changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Apply the mode to the body
    if (darkMode) {
      document.body.classList.add("dark-mode");
      console.log("Dark mode enabled");
    } else {
      document.body.classList.remove("dark-mode");
      console.log("Light mode enabled");
    }
  }, [darkMode]);

  // Ẩn side-menu khi thu nhỏ trình duyệt
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div>
        {/* Header */}
        <Header user={user} setUser={setUser} />

        {/* Side Menu */}
        <SideMenu
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/listTask" element={<AllTask />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
