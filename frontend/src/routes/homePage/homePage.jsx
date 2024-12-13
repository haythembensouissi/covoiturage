import { useCookies } from "react-cookie";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import CountUp from "react-countup"
import Register from "../register/register";
import Login from "../login/login";
function HomePage() {
  const [cookies,setCookie,removeCookie]=useCookies()
  const token=cookies.token
  return (<div>
    {token?
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find easy rides with trusted partners </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
            <CountUp end={16} duration={5} delay={2} />
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
            <CountUp end={200} duration={5} delay={2} />
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <CountUp end={2000} duration={5} delay={2} />
              <h2>Rides</h2>
            </div>
          </div>
        </div>
      </div>
     
      </div>
      :<Login/>}
      </div>
  );
}

export default HomePage;
