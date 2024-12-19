import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import Review from "../Review/Review"; // Import the Review component
import { useCookies } from "react-cookie";
import DeleteIcon from '@mui/icons-material/Delete';
function Card({ item }) {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [cookies,setCookie]=useCookies()
  const handleChatClick = () => {
    setShowReviewBox(!showReviewBox);
  };
const fetchData=async()=>{
    const res=await fetch("http://localhost:8080/api/rides/getAll")
    const data=await res.json()
    console.log(data)
    setItem(data)
}
const handleDelete=(id)=>{
   fetch(`http://localhost:8080/api/rides/deleteRide/${id}`,{
    method:"DELETE"
  })
  
}
useEffect(()=>{
  fetchData()
},[])

  return (
    <div>
    {item.availableSeats>0&&
    <div className="card">
      <Link to={`/singlepage/${item.idRide}`} className="imageContainer">
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
            {cookies.role=="PASSENGER"&&
            <Link to={`/reservation/${item.idRide}`} className="profile">
              <span>Make a reservation</span>
            </Link>
          }
            </div>
          <div className="icons">

          {cookies.role=="RIDER"&&<i onClick={()=>handleDelete(item.idRide)}><DeleteIcon/></i>}
            <div className="icon" onClick={handleChatClick}>
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
        {showReviewBox && <Review itemId={item.idRide} />} {/* Show Review component */}
      </div>
    </div>
        }
    </div>
      
  );
}

export default Card;
