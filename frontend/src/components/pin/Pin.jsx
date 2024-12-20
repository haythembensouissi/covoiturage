import { Marker, Popup } from "react-leaflet";
import "./pin.scss";

function Pin({ item }) {
  return (
    <Marker position={[item.lat, item.lon]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="Ride" />
          <div className="textContainer">
            <h3>Destination: {item.destination}</h3>
            <p><b>Departure:</b> {item.departure}</p>
            <p><b>Price per seat:</b> ${item.price}</p>
            <p><b>Available seats:</b> {item.availableSeats}</p>
            <p><b>Departure time:</b> {new Date(item.departureTime).toLocaleString()}</p>
            <p><b>Restrictions:</b> {item.restrictions || "None"}</p>
            <p><b>Description:</b> {item.description}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
