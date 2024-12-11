import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { useEffect, useState } from "react";

function ListPage() {
  const [data,setData]=useState([])
  const fetchdata=async()=>{
    const res=await fetch("http://localhost:8080/api/rides/getAllRides")
    const data=await res.json()
    console.log(data)
    setData(data)
  }
  useEffect(()=>{
fetchdata()
  },[])
  
  
  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        {data.map(item=>(
          <Card key={item.id} item={item}/>
        ))}
      </div>
    </div>
   
  </div>;
}

export default ListPage;
