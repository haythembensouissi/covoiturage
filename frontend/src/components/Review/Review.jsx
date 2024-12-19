import React, { useState, useEffect } from "react";
import "./review.scss"; // Create and style this file as needed
import { useCookies } from "react-cookie";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Review({ itemId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [cookies] = useCookies();
  const [visibleReviews, setVisibleReviews] = useState(2); // Number of reviews to show initially

  const fetchData = async () => {
    const res = await fetch(`http://localhost:8080/api/reviews/getAll`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
const handleDelete= async(id)=>{
 const res=await fetch(`http://localhost:8080/api/reviews/delete/${id}`,{
method:"DELETE"
  })
  if(res.ok){

    fetchData()
  }
}
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/api/reviews/create/${itemId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newReview,
        username: cookies.username,
        userimg: cookies.image,
        userId: cookies.id,
        itemId: parseInt(itemId)
      }),
    });

    if (res.ok) {
      fetchData();
      setNewReview("");
    } else {
      console.error("Error submitting review");
    }
  };

  const handleViewMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  return (
    <div className="reviewSection">
      <div className="reviewList">
        {reviews.slice(0, visibleReviews).filter(review=>review.itemId==itemId).map((review, index) => (
          <div key={index} className="review">
          <img src={review.userimg} alt={review.username} className="userImg" />
          {review.userId==cookies.id&&
            <i className="deleteicon" onClick={()=>handleDelete(review.id)}>  
            <DeleteForeverIcon />
            </i>
          }
          <div className="reviewContent">
          <h4>{review.username}</h4>
          <p>{review.text}</p>
          </div>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <button onClick={handleViewMore} className="profile">
          View more
        </button>
      )}
      <form onSubmit={handleReviewSubmit} className="reviewForm">
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Review;
