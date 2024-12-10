import { useState } from "react";
import "./register.scss";
import { Link, redirect, useNavigate, useRoutes } from "react-router-dom";
import { useCookies } from "react-cookie";

function Register() {
  const [username,setUsername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [role,setrole]=useState("")
  const [cookies,setCookie,removeCookie]=useCookies()
  const token=cookies.token
  const navigate=useNavigate()
  const handlesignup=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:8080/api/auth/signup",{
      method:"POST",
      body:JSON.stringify({username,email,password,role}),
      headers:{"Content-Type":"application/json"}

      
    })
   const data= await response.json()
    if(response.ok){
      setCookie("username",data.username)
      setCookie("email",data.email)
      setCookie("role",data.role)
      setCookie("token",data.token)
    }

    navigate("/")
  }
  return (
    
      <div className="register">
      <div className="formContainer">
        <form>
          <h1>Create an Account</h1>
          <input name="username" type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
          <input name="email" value={email} onChange={e=>setemail(e.target.value)} type="text" placeholder="Email" />
          <input name="password" value={password} onChange={e=>setpassword(e.target.value)} type="password" placeholder="Password" />
          <select value={role} onChange={e=>setrole(e.target.value)}>
          <option value="">Select an option</option>
        <option value="RIDER">RIDER</option>
        <option value="PASSENGER">PASSENGER</option>
          
        </select>
  
          <button onClick={handlesignup}>Register</button>
          <Link to="/">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
    
    
    
   
  );
}

export default Register;
