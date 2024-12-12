import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.idRide}`} className="imageContainer">
        <img src="https://agirpourlatransition.ademe.fr/particuliers/sites/default/files/styles/850x510/public/2023-02/covoiturage-bonnes-raisons.jpg?itok=k3o-2Kya" alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.destination}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.departureLocation}</span>
        </p>
        <p className="price">$ {item.pricePerSeat}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              
              <span>{item.restrictions} </span>
            </div>
            <div className="feature">

              <span>{item.availableSeats} seats available</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;