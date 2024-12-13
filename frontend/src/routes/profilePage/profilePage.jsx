import { useCookies } from "react-cookie";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { Link } from "react-router-dom";
function  ProfilePage() {
  const [cookies,setCookie,removeCookie]=useCookies()
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profileupdate">
            <button>Update Profile</button>
            </Link>
           {cookies.role=="PASSENGER"&& <Link to="/reservations">
            <button>view reservations</button>
            </Link>
  }
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={cookies.image}
                alt=""
              />
            </span>
            <span>
              Username: <b>{cookies.username}</b>
            </span>
            <span>
              E-mail: <b>{cookies.email}</b>
            </span>
          </div>
          <div className="title">
         
            <h1>My List</h1>
          {cookies.role=="RIDER"&&
          <Link to="/addpost" >
            <button >Create New Post</button>
            </Link>
          }
          </div>

         <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
