import { useState,useEffect } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
function Navbar() {
  const [data, setData] = useState([]);

  // Fetch rides data from the backend
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/rides/getAllRides");
    const data = await res.json();
    setData(data);  // Store the fetched data
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [cookies,setCookie,removeCookie]=useCookies()
  const navigate=useNavigate()
  const signout=()=>{
    removeCookie("token")
    removeCookie("email")
    removeCookie("username")
    removeCookie("id")
    removeCookie("password")
    removeCookie("role")
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
          <span>Covoiturage</span>
        </a>
        <a href="/">Home</a>

        {role=="RIDER"?<a href="/addpost">Addpost</a>:role=="PASSENGER"?<a href="/list">View Rides</a>:null}
      
       
      </div>
      <div className="right">
        {token ? (
          <div className="user">
            <img
              src={cookies.image}
              alt=""
            />
            <span>{cookies.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">{data.length}</div>
              <span>Profile</span>
            </Link>
           <i>
            <PowerSettingsNewIcon onClick={signout}/>
            </i>
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
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
