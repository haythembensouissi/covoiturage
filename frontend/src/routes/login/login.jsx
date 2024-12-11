import { useState } from "react";
import "./login.scss";
import { Link} from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [username,setUsername]=useState("")
  const [password,setpassword]=useState("")
  const [cookies,setCookie,removeCookie]=useCookies()
  const [error,setError]=useState("")
  const token=cookies.token
  const handlelogin=async(e)=>{
    e.preventDefault();
    
    try{
      const response=await fetch("http://localhost:8080/api/auth/signin",{
        method:"POST",
        body:JSON.stringify({username,password}),
        headers:{"Content-Type":"application/json"}
  
        
      })
     const data= await response.json()
     if(response.error) {
      console.log(response.error)
      setError(response.error)
     }
  
      if(response.ok){
        setCookie("token",data.token)
        setCookie("role",data.role)
        setCookie("id",data.id)
        
      }else{
        setError(data.error)
      }
    }catch(e){
      setError("username or password is wrong")
    }
    
   
  }
  return (
    
    
    <div className="login">
      <div className="formContainer">
        <form>
          <h1>Welcome back</h1>
          <input name="username" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" />
          <input name="password"  type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Password" />
          <button onClick={handlelogin}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
          <p>{error&&error}</p>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
    
    
  );
}

export default Login;
