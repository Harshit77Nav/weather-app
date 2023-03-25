import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import "./home.css";

function Home() {
    const history = useNavigate();
    const [currloc, setCurrloc] = useState(false);
    const [data, setData] = useState();
    const [fav, setFav] = useState();
    const getCurrloc = async()=>{
        await axios("https://ipapi.co/json")
        .then((resdata)=>{
            setCurrloc(resdata.data.city)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getCurrloc();
        const fav = sessionStorage.getItem("fav")
        if(fav){
            const arr = fav.split(",");
            setFav(arr)
        }
    },[])

    const getdata = async()=>{
        await axios(`https://api.openweathermap.org/data/2.5/weather?q=${currloc}&appid=1715b73b3af0ae7e5a720f3d75d33a17&units=metric`)
        .then((resdata)=>{
            if(resdata.data.cod === 200){
            setData(resdata.data);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        if(currloc){
        getdata();
        } else {
            console.log("not loc");
        }
    },[currloc])

    const handleclick = ()=>{
        history("/search")
    }

  return (
    <div className='container'>
        <div className='favbox'>
            <h2>Your Favourite Locations</h2>
            <div className='fav'>
            {fav && fav.map((items,index)=>{
                return(
                    <li key={index}>{items}</li>
                )
            })}
            </div>
        </div>
        <div>
            <h1>Weather App</h1>
            <label>Search For New Location</label>
            <button className='btnclick' onClick={handleclick}>Click Here</button>
            {data && data? <div className='listbox'>
                        <li className='li'><span className='spanbox'><b>Your Current Location:</b></span><b>{currloc}</b></li>
                        <li className='li'><span className='spanbox'>Latitude: </span>{data.coord.lat}</li>
                        <li className='li'><span className='spanbox'>Longitude: </span>{data.coord.lon}</li>
                        <li className='li'><span className='spanbox'>Today's Forecast: </span>{data.weather[0].main}</li>
                        <li className='li'><span className='spanbox'>Current Temperature:(&#8451;) </span>{data.main.temp}</li>
                        <li className='li'><span className='spanbox'>Min. Temperature:(&#8451;) </span>{data.main.temp_min}</li>
                        <li className='li'><span className='spanbox'>Max. Temperature:(&#8451;) </span>{data.main.temp_max}</li>
                        <li className='li'><span className='spanbox'>Pressure: </span>{data.main.pressure}</li>
                        <li className='li'><span className='spanbox'>Humidity:   </span>&nbsp;&nbsp;{data.main.humidity}</li>
                        <li className='li'><span className='spanbox'>Visibility: </span>{data.visibility}</li>
                        <li className='li'><span className='spanbox'>Wind Speed: </span>{data.wind.speed}</li>
                    </div>:<p><b>LOADING...</b></p>}
        </div>
    </div>
  )
}

export default Home