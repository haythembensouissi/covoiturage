import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
function Layout() {
  const [cookies,setCookie,removeCookie]=useCookies()
  const token=cookies.token
  return (
    <div>
    <div className="layout">
    {token&&
      <div className="navbar">
        <Navbar />
      </div>
    }
      <div className="content">
        <Outlet/>
      </div>
    </div>
  </div>
  );
}

export default Layout;
