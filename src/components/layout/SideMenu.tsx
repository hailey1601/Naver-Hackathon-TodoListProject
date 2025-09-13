import { NavLink } from "react-router-dom";

type SideMenuProps = {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function SideMenu({
  // darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
}: SideMenuProps) {
  return (
    <>
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
        &gt;
      </button>

      <div id="side-menu">
        <div className="name-website">
          <p>Owlhelper</p>
        </div>

        <div className="menu">
          <div id="overview">
            <NavLink to="/" className="overview-btn" end>
              <img src="../image/icons8-web-design-50.png" /> Overview
            </NavLink>
          </div>
          <div id="calendar">
            <NavLink to="/calendar" className="calendar">
              <img src="../image/icons8-timeline-week-50 (1).png" /> Calendar
            </NavLink>
          </div>
          <div id="listTask">
            <NavLink to="/listTask" className="listTask-btn">
              <img src="../image/icons8-task-50 (1).png" /> List Task
            </NavLink>
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
          <button className="dark-mode" onClick={() => setDarkMode(true)}>
            <img src="../image/icons8-moon-and-stars-50.png" />
          </button>
          <button className="light-mode" onClick={() => setDarkMode(false)}>
            <img src="../image/icons8-sun-50.png" />
          </button>
        </div>
      </div>

      <div
        id="side-menu-close"
        className={sidebarOpen ? "open" : ""}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  );
}