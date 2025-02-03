import { Link, NavLink, useLocation, useNavigate } from "react-router";
import "./Header.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const Header = () => {
  const [hideAuth, setHideAuth] = useState(false);
  const [authBtnShow, setAuthBtnShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      setHideAuth(true);
    } else {
      setHideAuth(false);
    }
  }, [location]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuthBtnShow(true);
    } else {
      setAuthBtnShow(false);
    }
  }, []);

  const logOutFunc = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <header className="container">
      <div className="header-box">
        <div className="header-logo">
          <Link
            style={{ fontWeight: "800", fontSize: "1.4rem", color: "black" }}
            to={"/"}
          >
            {" "}
            <h1>MineToDo</h1>
          </Link>
        </div>
        <div className="header-menu">
          <NavLink className="header-menu-child" to={"/home"}>
            <Button>Home</Button>
          </NavLink>
          <NavLink className="header-menu-child" to={"/stopwatch"}>
            <Button>Stop Watch</Button>
          </NavLink>
        </div>
        {hideAuth || (
          <div className="header-auth-btn">
            {authBtnShow ? (
              <Button onClick={logOutFunc} variant="contained">
                Log Out
              </Button>
            ) : (
              <>
                <NavLink style={{ marginRight: "10px" }} to={"/register"}>
                  <Button variant="outlined">Register</Button>
                </NavLink>
                <NavLink to={"/login"}>
                  <Button variant="contained">Log In</Button>
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
