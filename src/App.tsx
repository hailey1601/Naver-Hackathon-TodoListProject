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

  // State cho AI motivational messages
    const [aiMessage, setAiMessage] = useState<string | null>(null);
    
    // Mảng motivational AI messages
    const motivationalMessages = [
      "🤖 Remember: Progress, not perfection! Every small step counts toward your goals! 🌟",
      "🚀 AI tip: Break big tasks into smaller ones - your future self will thank you! ✨",
      "💡 Productivity hack: Take breaks! Your brain needs rest to stay creative and focused! 🧠",
      "🎯 Stay focused! You're building something amazing, one task at a time! 💪",
      "🌈 Believe in yourself! Every expert was once a beginner who never gave up! 🏆",
      "⚡ Energy boost: Celebrate small wins - they fuel bigger achievements! 🎉",
      "🔥 You're doing great! Consistency beats perfection every single time! 📈",
      "🌟 AI wisdom: The best time to start was yesterday, the second best time is now! ⏰",
      "💫 Keep going! Every challenge you face is making you stronger and wiser! 💎",
      "🎨 Creativity flows when you're organized - keep building those good habits! 🌊"
    ];
  
    // Hiển thị Random AI message system 
    useEffect(() => {
      const showRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        setAiMessage(motivationalMessages[randomIndex]);
        
        // Ẩn tin nhắn sau 5s
        setTimeout(() => setAiMessage(null), 50000);
      };
  
      // Hiện lời nhắn đầu tiên 
      const initialTimer = setTimeout(showRandomMessage, 30000);
      console.log("initialTimer", initialTimer);
      
      
      // Hiện lời nhắn tiếp theo
      const interval = setInterval(showRandomMessage, 30000);
      console.log("interval", interval);
      
  
      return () => {
        clearTimeout(initialTimer);
        clearInterval(interval);
      };
    }, []);

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

        {/* AI Motivational Message */}
        {aiMessage && (
          <div className="ai-message-popup">
            <div className="ai-message-content">
              <p>{aiMessage}</p>
              <button 
                className="ai-message-close" 
                onClick={() => setAiMessage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

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
