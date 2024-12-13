import { useState, useEffect } from "react";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";

function ListPage() {
  const [data, setData] = useState([]);

  // Fetch rides data from the backend
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/rides/getAllRides");
    const data = await res.json();
    setData(data);  // Store the fetched data
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="listPage">
      <div className="listContainer">
      
        <div className="wrapper">
          <Filter data={data} /> {/* Pass the fetched data to Filter component */}
          </div>
      
      </div>
    </div>
  );
}

export default ListPage;
