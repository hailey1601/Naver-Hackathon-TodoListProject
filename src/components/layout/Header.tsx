type HeaderProps = {
  user: { name: string };
  setUser: (user: any) => void;
};

export default function Header({ user, setUser }: HeaderProps) {
  return (
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
          <p className="user-name" onClick={() => setUser(user)}>
            {user.name}
          </p>
          <div className="dropdown">
            <button className="user">Account</button>
            <button className="logout-btn">Log out</button>
          </div>
        </div>
      </div>
    </header>
  );
}