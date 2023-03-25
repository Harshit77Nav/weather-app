import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./details.css"

function Details() {
    const history = useNavigate();
    const [data, setData] =useState();
    useEffect(()=>{
        const gdata = JSON.parse(sessionStorage.getItem("data"))
        setData(gdata);
    },[])

    const handleClick = ()=>{
      const item = sessionStorage.getItem("fav")
        if(item){
          const temp = item.split(",");
            if(!temp.includes(data.name)){
                temp.push(data.name);
                sessionStorage.setItem("fav", temp);
                alert("Added to favourite")
            } else{
                alert("Location already Added")
            }
        } else {
            const arr = [data.name];
            sessionStorage.setItem("fav", arr);
        }
    }
  return (
    <div className='detailsbox'>
      <h1>Weather App</h1>
      
           {data && data? <div className='listbox1'>
                        <li className='list1'><span className='span1'><b>Your Searched Location:</b></span><b>{data.name}</b></li>
                        <li className='list1'><span className='span1'>Latitude: </span>{data.coord.lat}</li>
                        <li className='list1'><span className='span1'>Longitude: </span>{data.coord.lon}</li>
                        <li className='list1'><span className='span1'>Today's Forecast: </span>{data.weather[0].main}</li>
                        <li className='list1'><span className='span1'>Current Temperature:(&#8451;) </span>{data.main.temp}</li>
                        <li className='list1'><span className='span1'>Min. Temperature:(&#8451;) </span>{data.main.temp_min}</li>
                        <li className='list1'><span className='span1'>Max. Temperature:(&#8451;) </span>{data.main.temp_max}</li>
                        <li className='list1'><span className='span1'>Pressure: </span>{data.main.pressure}</li>
                        <li className='list1'><span className='span1'>Humidity:   </span>&nbsp;&nbsp;{data.main.humidity}</li>
                        <li className='list1'><span className='span1'>Visibility: </span>{data.visibility}</li>
                        <li className='list1'><span className='span1'>Wind Speed: </span>{data.wind.speed}</li>
                    </div>:<p><b>LOADING...</b></p>}
                    <div>
                        <button className='favbtn' onClick={()=>handleClick()}>Set this location as favourite</button>
                        <button className='favbtn' onClick={()=>history("/")}>Go to Home Page</button>
                    </div>
      
    </div>
  )
}

export default Details