import { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();
  const [error, setError] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.error) {
        setError(response.error);
      }
      if (response.ok) {
        setCookie("token", data.token);
        setCookie("role", data.role);
        setCookie("id", data.id);
        setCookie("username", data.username);
        setCookie("image", data.img);
        setCookie("email", data.email);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError("Username or password is incorrect.");
    }
  };

  return (
    <div className="login">
      <div className="imageContainer">
        <img
          src="https://img.freepik.com/vecteurs-libre/illustration-concept-covoiturage_114360-9238.jpg"
          alt="Carpooling"
        />
        <h1 className="title">Covoiturage</h1>
      </div>
      <div className="formContainer">
        <form>
          <h1>Welcome back</h1>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handlelogin}>Login</button>
          <Link to="/register">Don't have an account?</Link>
          <p>{error && error}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
