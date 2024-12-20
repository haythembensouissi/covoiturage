import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./Reservation.scss";
import { useParams } from "react-router-dom";

function Reservation() {
  const [reservationdate, setReservationDate] = useState("");
  const [places, setPlaces] = useState("");
  const [cookies] = useCookies();
  const  params = useParams(); // Correctly extract idRide from URL parameters
  const userId = cookies.role === "PASSENGER" ? cookies.id : null;
console.log(typeof params.id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to make this reservation?");
    if (!confirmed) {
      return; // Exit the function if the user doesn't confirm
    }
    const parsedReservationDate = new Date(reservationdate).toISOString(); // Ensure date is correctly formatted
    const res1=await fetch(`http://localhost:8080/api/rides/updateAvailableSeats/${params.id}/${places}`,{
      method:"POST",
      
    })
    if(res1.ok){
      const res = await fetch("http://localhost:8080/api/reservations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId, // Ensure userId is an integer
          rideId: parseInt(params.id), // Ensure rideId is an integer
          places: places, // Ensure places is an integer
          reservationDate: parsedReservationDate,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setPlaces("");
        setReservationDate("");
        console.log("Reservation created successfully:", data);
      } else {
        console.error("Error creating reservation:", data);
      }
    }
    else{
      alert("not enough number of seats")
    }
    
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Make a Reservation</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="places">Places</label>
              <input
                id="places"
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
                type="number"
                min={1}
              />
            </div>
            <div className="item">
              <label htmlFor="reservationDate">Reservation Date</label>
              <input
                id="reservationDate"
                value={reservationdate}
                onChange={(e) => setReservationDate(e.target.value)}
                type="datetime-local"
              />
            </div>
            <button className="sendButton" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer"></div>
    </div>
  );
}

export default Reservation;
