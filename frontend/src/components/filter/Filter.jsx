import React, { useState, useEffect } from "react";
import "./filter.scss";
import Card from "../card/Card";

function Filter({ data }) {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    minPrice: "",
    maxPrice: "",
    seats: "",
  });

  const [filteredData, setFilteredData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const filteredRides = data.filter((ride) => {
      const matchDeparture = formData.departure
        ? ride.departureLocation.toLowerCase().includes(formData.departure.toLowerCase())
        : true;
      const matchDestination = formData.destination
        ? ride.destination.toLowerCase().includes(formData.destination.toLowerCase())
        : true;
      const matchDate = formData.date
        ? ride.departureDateTime.startsWith(formData.date)
        : true;
      const matchMinPrice = formData.minPrice
        ? ride.price == parseInt(formData.minPrice)
        : true;  // Filter by minPrice
      const matchMaxPrice = formData.maxPrice
        ? ride.price == parseInt(formData.maxPrice)
        : true;  // Filter by maxPrice
      const matchSeats = formData.seats
        ? ride.availableSeats == parseInt(formData.seats)
        : true;

      return (
        matchDeparture &&
        matchDestination &&
        matchDate &&
        matchMinPrice &&
        matchMaxPrice &&
        matchSeats
      );
    });

    setFilteredData(filteredRides);
  }, [formData, data]);

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
      </div>
      <div className="results">
        {filteredData.length === 0 ? (
          <p>No rides found matching the criteria.</p>
        ) : (
          filteredData.map((ride) => (
            <div>
            {ride.availableSeats>0&&
            <Card key={ride.idRide} item={ride} />
          }
          </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Filter;