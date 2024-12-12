import React, { useState } from "react";
import "./filter.scss";

function Filter() {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    minPrice: "",
    maxPrice: "",
    seats: "",
  });

  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (formData.departure) queryParams.append("departureLocation", formData.departure);
    if (formData.destination) queryParams.append("destination", formData.destination);
    if (formData.date) queryParams.append("departureDateTime", formData.date);
    if (formData.minPrice) queryParams.append("minPrice", formData.minPrice);
    if (formData.maxPrice) queryParams.append("maxPrice", formData.maxPrice);
    if (formData.seats) queryParams.append("availableSeats", formData.seats);

    fetch(`/api/rides/searchRides?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => setFilteredData(data))
      .catch((error) => console.error("Error fetching rides:", error));
  };

  return (
    <div className="filter">
      <h1>Search for Rides</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="departure">Departure Location</label>
          <input
            type="text"
            id="departure"
            name="departure"
            placeholder="Enter departure location"
            value={formData.departure}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="Enter destination"
            value={formData.destination}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
            value={formData.minPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Any"
            value={formData.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label htmlFor="seats">Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            placeholder="Any"
            value={formData.seats}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSearch}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
      <div className="results">
        {filteredData.map((ride) => (
          <div key={ride.idRide} className="ride">
            <h3>{ride.departureLocation} to {ride.destination}</h3>
            <p>Price: ${ride.pricePerSeat}</p>
            <p>Seats Available: {ride.availableSeats}</p>
            <p>Departure Time: {ride.departureDateTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
