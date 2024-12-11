import { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies,setCookie,removeCookie]=useCookies()
  const navigate=useNavigate()
  const signout=()=>{
    removeCookie("token")
    navigate("/")
  }
  const [open, setOpen] = useState(false);
const role=cookies.role
const token=cookies.token
  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>

        {role=="RIDER"?<a href="/addpost">Addpost</a>:role=="PASSENGER"?<a href="/list">View Rides</a>:null}
        <a href="/contact">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {token ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
            <button onClick={signout}>signout</button>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <Link to="/About">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
