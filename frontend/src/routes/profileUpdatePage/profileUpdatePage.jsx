import { useState } from "react";
import "./profileUpdatePage.scss";
import {useCookies} from "react-cookie"
import { useNavigation } from "react-router-dom";
function ProfileUpdatePage() {
  const [username,setUsername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [cookies,setCookie]=useCookies()
  const navigate=useNavigation()
const handlesubmit=async (e,id)=>{
  e.preventDefault();
const res=await fetch(`http://localhost:8080/api/auth/updateuser/${id}`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({username,email,password})
})
const data=await res.json()
if(res.ok){
  setCookie("email",data.email)
  setCookie("password",data.password)
  setCookie("username",data.username)
  setUsername("")
  setemail("")
  setpassword("")
  navigate("/profile")
}
}
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e=>setemail(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={e=>setpassword(e.target.value)} />

          </div>
          <button onClick={(e)=>handlesubmit(e,cookies.id)}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src="" alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
