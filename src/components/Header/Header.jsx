import { Link, NavLink, useLocation } from "react-router";
import "./Header.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";


const Header = () => {

    const [hideAuth, setHideAuth] = useState(false);

    const location = useLocation();

   useEffect(()=>{
     if(location.pathname === "/register" || location.pathname === "/login") {
        setHideAuth(true);
    }else{
        setHideAuth(false);
    }
   },[location])

    return (
        <header className="container">
            <div className="header-box">
                <div className="header-logo">
                   <Link to={"/"}> <h1>MineToDo</h1></Link>
                </div>
                <div className="header-menu">
                    <NavLink className="header-menu-child" to={"/home"}><Button>Home</Button></NavLink>
                    <NavLink className="header-menu-child" to={"/stopwatch"}><Button>Stop Watch</Button></NavLink>
                </div>
                {hideAuth ||
                    <div className="header-auth-btn">
                    <NavLink style={{marginRight:"10px"}} to={"/register"}><Button variant="outlined">Register</Button></NavLink>
                    <NavLink to={"/login"}><Button variant="contained">Log In</Button></NavLink>
                </div>
                }
            </div>
        </header>
    );
};

export default Header;