import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./reservations.scss";
import Review from "../Review/Review"; // Import the Review component

function Reservations() {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [items,setItem]=useState([])
  const handleChatClick = () => {
    setShowReviewBox(!showReviewBox);
  };
const fetchData=async()=>{
    const res=await fetch("http://localhost:8080/api/reservations/getAll")
    const data=await res.json()
    console.log(data)
    setItem(data)
}
const handleDelete=async(id,idride,places)=>{
  const res1=await fetch(`http://localhost:8080/api/rides/handlereservationcancelling/${idride}/${places}`,{
    method:"POST",
    
  })
  const res=await fetch(`http://localhost:8080/api/reservations/delete/${id}`,{
    method:"DELETE"
  })
  if (res.ok&&res1.ok){
    fetchData()
  }
}
useEffect(()=>{
  fetchData()
},[])
  return (
    <div >
    {items.map((item,key)=>(
    
      <div className="card">
      
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.reservationDate}</Link>
        </h2>
        
        <p className="price">{item.places} places</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <span>{item.restrictions} </span>
            </div>
            
            <Link onClick={()=>handleDelete(item.id,item.rideId,item.places)} className="profile">
              <span>Cancel reservation</span>
            </Link>
          </div>
          <div className="icons">
            
           
          </div>
        </div>
        {showReviewBox && <Review itemId={item.idRide} />} {/* Show Review component */}
      </div>
    </div>
    )
      
    )}
    
    </div>
  );
}

export default Reservations;
