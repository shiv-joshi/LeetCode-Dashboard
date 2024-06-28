import httpClient from "../httpClient";

const NavBar = () => {
  // Send logout request
  const logoutUser = async () => {
    const response = await httpClient.post("//localhost:5000/logout");

    alert("You have been logged out.");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/review-today">
              Review
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
