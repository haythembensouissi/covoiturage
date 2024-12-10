import { useState } from "react";
import "./newPostPage.scss";

function NewPostPage() {
  const [destination,setDestination]=useState("")
  const [deparature,setdeparature]=useState("")
  const [deparatureTime,setdeparatureTime]=useState("")
  const [restrictions,setrestrictions]=useState("")
  const [availableseats,setavailableseats]=useState("")
  const [Price,setPrice]=useState("")
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form>
            <div className="item">
              <label htmlFor="title">destination</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">deparature location</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">available seats</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">deparature time</label>
              <input type="datetime-local" />
            </div>
            
            <div className="item">
              <label htmlFor="latitude">restrictions</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
           
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
      <div className="sideContainer"></div>
    </div>
  );
}

export default NewPostPage;
