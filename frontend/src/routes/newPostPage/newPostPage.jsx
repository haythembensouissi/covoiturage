import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./newPostPage.scss";

function NewPostPage() {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [cookies] = useCookies();
  const driverId = cookies.role === "RIDER" ? cookies.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdAt =new Date(Date.now());
    const updatedAt = new Date(Date.now());
    const departureDateTime=new Date(departureTime);
    const img="https://agirpourlatransition.ademe.fr/particuliers/sites/default/files/styles/850x510/public/2023-02/covoiturage-bonnes-raisons.jpg?itok=k3o-2Kya"
    console.log(departureDateTime)
    console.log(createdAt)
    console.log(updatedAt)
    const res = await fetch("http://localhost:8080/api/rides/createRide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availableSeats,
        pricePerSeat:price,
        driverId,
        createdAt,
       destination,
        departureDateTime,
       departureLocation:departure,
        description,
        updatedAt,
        img,
        restrictions
        
      }),
    });

    if (res.ok) {
      setAvailableSeats("")
      setPrice("")
      setdescription('')
      setDestination("")
      setDepartureTime(null)
      setRestrictions("")
      setDeparture("")
    } else {
      const errorData = await res.json().catch(() => ({ error: "Unknown error occurred" }));
      console.error("Error creating ride:", errorData);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="departure">Departure Location</label>
              <input
                id="departure"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="availableSeats">Available Seats</label>
              <input
                id="availableSeats"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                type="number"
                min={1}
              />
            </div>
            <div className="item">
              <label htmlFor="departureTime">Departure Time</label>
              <input
                id="departureTime"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                type="datetime-local"
              />
            </div>
            <div className="item">
            <label htmlFor="restrictions">Description</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="textarea" maxLength={90} 
            />
          </div>
            <div className="item">
              <label htmlFor="restrictions">Restrictions</label>
              <input
                id="restrictions"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                type="text"
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

export default NewPostPage;
