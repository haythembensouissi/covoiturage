import { useState } from "react";
import "./chat.scss";
import { useCookies } from "react-cookie";
import { rideData } from "./dummydatajs"; // Import the ride-related dummy data

function Chat() {
  const [chat, setChat] = useState(true);
  const [cookies] = useCookies(["username", "image", "role"]); // Include 'role' in cookies to differentiate rider and passenger

  // Get the ride data
  const ride = rideData[0]; // Use the first ride as an example

  return (
    <div className="chat">
      <div className="messages">
        <h1>{cookies.role === "rider" ? "Rider Chat" : "Passenger Chat"}</h1>
        {ride.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.own ? "own" : ""}`}>
            <img
              src={msg.own ? cookies.image : (cookies.role === "rider" ? ride.passengerImage : ride.riderImage)}
              alt={`${msg.sender}'s profile`}
            />
            <span>
              {msg.own
                ? cookies.username
                : cookies.role === "rider"
                ? ride.passenger
                : ride.driver}
            </span>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={cookies.role === "rider" ? ride.passengerImage : ride.driverImage}
                alt={`${cookies.role === "rider" ? "Passenger" : "Driver"}'s profile`}
              />
              {cookies.role === "rider" ? ride.passenger : ride.driver}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {ride.messages.map((msg, index) => (
              <div key={index} className={`chatMessage ${msg.own ? "own" : ""}`}>
                <p>{msg.message}</p>
                <span>Just now</span>
              </div>
            ))}
          </div>
          <div className="bottom">
            <textarea placeholder="Type a message..."></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
