import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import "./search.css";

function Search() {
    const history = useNavigate();
    const [input, setInput] = useState();
    const [data, setData] = useState();
    const handleClick = async()=>{
        await axios(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=1715b73b3af0ae7e5a720f3d75d33a17&units=metric`)
        .then((resdata)=>{
            if(resdata.data.cod === 200){
            setData(resdata.data);
            const prop = JSON.stringify(resdata.data);
            sessionStorage.setItem("data",prop);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className='bodybox'>
        <div>
            <h1>Weather App</h1>
            <div className='searchbox'>
                <div>
                    <label>Enter Your Location:</label>
                    <input id='input' type={"text"} onChange={(e)=>setInput(e.target.value)}/>
                    <button className='btnsearch' onClick={handleClick}>Search</button>
                </div>
                <div>
                    <button className='homepage' onClick={()=>history("/")}>Go to Home Page</button>
                </div>
            </div>
        </div>
        <div>
            {data && <div className='resultlist'>
                <p>{data.name}</p><div><button className='btndetails' onClick={()=> history("/details")}>Show Details</button></div>
                </div>}
        </div>
    </div>
  )
}

export default Search