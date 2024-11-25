import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(token);
  const [userProfile, setUserProfile] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
      fetchUserProfile(storedToken);
    }
    else {
      setIsAuthenticated(true);
      setUserProfile(null);
    }
  }, [token]);

  const fetchUserProfile = async (token) => {
    const response = await fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUserProfile(data);
  };


  useEffect(() => {
    closeMenu();
  }, [menu])

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
    setUserProfile(null);
    setShowLogin(false);
    navigate("/");
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("mode") === "dark"
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const mode = darkMode ? "dark" : "light";
    body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("mode", mode);
  }, [darkMode]);

  const openMenu = () => {
    document.querySelector(".menu-drop").style.transform = "translateY(0)";
    document.querySelector(".menu-drop").style.display = "flex";
    document.querySelector(".header-content").style.display = "none";
  };

  const closeMenu = () => {
    document.querySelector(".menu-drop").style.transform = "translateY(-100%)";
    document.querySelector(".menu-drop").style.display = "none";
    document.querySelector(".header-content").style.display = "flex";
  };

  return (
    <>
      <div className="header">
        <div className="menu-drop">
          <div className="nav-close">
            <Link to="/">
              <div className="header-logo">
                <h1 className="title">Blooger</h1>
              </div>
            </Link>
            <i className="fas fa-close nav-cross" onClick={closeMenu}></i>
          </div>
          <nav className="menu-links">
            <Link
              onClick={() => {
                setMenu("Home");
                closeMenu();
              }}
              to="/"
              className={menu === "Home" ? "active" : "nav-link"}
            >
              Home
            </Link>
            <Link
              onClick={() => {
                setMenu("Blogs");
                closeMenu();
              }}
              to="/Blogs"
              className={menu === "Blogs" ? "active" : "nav-link"}
            >
              Blogs
            </Link>
            <Link
              onClick={() => {
                setMenu("Add Blogs");
                closeMenu();
              }}
              to="http://localhost:5174/"
              className={menu === "Add Blogs" ? "active" : "nav-link"}
            >
              Add Blogs
            </Link>
            {isAuthenticated && (

              <Link
                onClick={() => {
                  setMenu("Add Blogs");
                  closeMenu();
                }}
                to="http://localhost:5174/"
                className={menu === "Add Blogs" ? "active" : "nav-link"}
              >
                Add Blogs
              </Link>
            )}
            
            <div className="mode" onClick={toggleDarkMode}>
              <div className={`ball ${darkMode ? "right-ball" : ""}`}></div>
            </div>
            {!isAuthenticated && (
              <a className="nav-link">
                <button
                  className="btn-class"
                  onClick={() => {
                    closeMenu();
                    setShowLogin(true)
                  }
                  }
                >
                  Sign In
                </button>
              </a>
            )}
          </nav>

        </div>

        <div className="header-content">
          <Link to="/">
            <div className="header-logo">
              <h1 className="title">Blooger</h1>
            </div>
          </Link>
          <nav className="navbar">
            {/* Navbar Links */}
            <Link
              onClick={() => setMenu("Home")}
              to="/"
              className={menu === "Home" ? "active" : "nav-link"}
            >
              Home
            </Link>
            <Link
              onClick={() => setMenu("Blogs")}
              to="/Blogs"
              className={menu === "Blogs" ? "active" : "nav-link"}
            >
              Blogs
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  onClick={() => {
                    setMenu("Add Blogs");
                    closeMenu();
                  }}
                  to="http://localhost:5174/"
                  className={menu === "Add Blogs" ? "active" : "nav-link"}
                >
                  Add Blogs
                </Link>
              </>
            )}
            <div className="mode" onClick={toggleDarkMode}>
              <div className={`ball ${darkMode ? "right-ball" : ""}`}></div>
            </div>
            
            {isAuthenticated ? (
              <div className="navbar-profile">
                <img
                  src={userProfile?.imageUrl || assets.profile_icon}
                  alt="Profile Icon"
                />
                <img onClick={logout} src={assets.logout_icon} alt="Logout" />
              </div>
            ) : (
              <a className="nav-link">
                <button
                  className="btn-class"
                  onClick={() => setShowLogin(true)}
                >
                  Sign In
                </button>
              </a>
            )}
          </nav>
          <div className="menu-btn">
            {isAuthenticated ? (
              <div className="navbar-profile">
                <img
                  src={userProfile?.imageUrl || assets.profile_icon}
                  alt="Profile Icon"
                />
                <img onClick={logout} src={assets.logout_icon} alt="Logout" />
              </div>
            ) : (
              <></>
            )}
            <i className="fas fa-bars menu-icon" onClick={openMenu}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
