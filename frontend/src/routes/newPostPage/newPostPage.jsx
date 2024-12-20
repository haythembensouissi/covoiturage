import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Map from "../../components/map/Map";
import "./newPostPage.scss";

function NewPostPage() {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pins, setPins] = useState([]); // State for pins
  const [cookies] = useCookies();
  const driverId = cookies.role === "RIDER" ? cookies.id : null;

  const handleGeocode = async (place) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=YOUR_API_KEY`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lon: lng };
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdAt = new Date(Date.now());
    const updatedAt = new Date(Date.now());
    const departureDateTime = new Date(departureTime);
    const img =
      "https://agirpourlatransition.ademe.fr/particuliers/sites/default/files/styles/850x510/public/2023-02/covoiturage-bonnes-raisons.jpg?itok=k3o-2Kya";

    const coords = await handleGeocode(destination);

    if (coords) {
      // Update pins state with new pin
      const newPin = {
        id: Date.now(),
        lat: coords.lat,
        lon: coords.lon,
        img,
        destination,
        departure,
        departureTime,
        availableSeats,
        description,
        price,
        restrictions,
      };
      setPins([...pins, newPin]);
    }

    const res = await fetch("http://localhost:8080/api/rides/createRide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availableSeats,
        pricePerSeat: price,
        driverId,
        createdAt,
        destination,
        departureDateTime,
        departureLocation: departure,
        description,
        updatedAt,
        img,
        restrictions,
      }),
    });

    if (res.ok) {
      setAvailableSeats("");
      setPrice("");
      setDescription("");
      setDestination("");
      setDepartureTime(null);
      setRestrictions("");
      setDeparture("");
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
              <label htmlFor="description">Description</label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="textarea"
                maxLength={90}
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
      <div className="sideContainer">
        <Map items={pins} />
      </div>
    </div>
  );
}

export default NewPostPage;
