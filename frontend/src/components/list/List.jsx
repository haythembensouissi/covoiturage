import './list.scss'
import Card from"../card/Card"
import {listData} from"../../lib/dummydata"
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';

function List(){
  const [data, setData] = useState([]);
  const [cookies,setCookie]=useCookies()
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
    <div className='list'>
      {data.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List