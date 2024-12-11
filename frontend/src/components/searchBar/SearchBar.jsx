import { useState } from "react";
import "./searchBar.scss";

const passengerTypes = ["find car"];

function SearchBar({ userType }) {
  const [query, setQuery] = useState({
    type: "find car",
    location: "",
    destination: "",
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  // Conditionally render the search bar only for passengers
  if (userType !== "passenger") return null;

  return (
    <div className="searchBar">
      <div className="type">
        {passengerTypes.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="location"
          placeholder="Pickup Location"
          value={query.location}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={query.destination}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, destination: e.target.value }))
          }
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
        />
        <button type="submit">
          <img src="/search.png" alt="Search" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
