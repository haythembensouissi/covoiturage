import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners"; // Import spinner from react-spinners

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "donaction");

      const response1 = await fetch(
        `https://api.cloudinary.com/v1_1/de4q2fmk3/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response1.ok) {
        const data = await response1.json();
        setCookie("image", data.url);
        console.log(data);
      } else {
        console.error("Upload failed");
      }

      const image = cookies.image;

      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password, role, img: image }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setCookie("username", data.username);
        setCookie("email", data.email);
        setCookie("role", data.role);
        setCookie("token", data.token);
        setCookie("id", data.id);
        navigate("/");
        window.location.reload()
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="register">
    
<div className="imageContainer">
<img
  src="https://img.freepik.com/vecteurs-libre/illustration-concept-covoiturage_114360-9238.jpg"
  alt="Carpooling"
/>
<h1 className="title">Covoiturage</h1>
</div>
      <div className="formContainer">
        {loading ? (
          <div className="spinnerContainer">
            <ClipLoader size={50} color="#3498db" loading={loading} />
          </div>
        ) : (
          <form>
            <h1>Create an Account</h1>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select an option</option>
              <option value="RIDER">RIDER</option>
              <option value="PASSENGER">PASSENGER</option>
            </select>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              placeholder="Your file here"
            />
            <button onClick={handleSignup}>Register</button>
            <Link to="/">Do you have an account?</Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
