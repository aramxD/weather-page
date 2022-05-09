import React, { useState, useEffect } from "react";
import axios from 'axios'
import './styles/style.css'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  const leKey = '96c7d097bd53c6785a3219aa90cf99ea'
  //const urlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${leKey}`

  // this url API only needs city location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${leKey}`


  const urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=Tijuana&appid=${leKey}`
  // link de prueba
  // https://api.openweathermap.org/data/2.5/weather?q=tijuana&appid=96c7d097bd53c6785a3219aa90cf99ea


  useEffect(()=>{
    axios.get(urlDefault).then((response) => {
      setData(response.data)
      //console.log(response.data)
      
    })
  },[])


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        //console.log(response.data)

      })
      setLocation('')
      
    }
  }

  let temp 
  let feelsTemp
  let maxTemp 
  let humidity
    if(data.main){
      temp = data.main.temp -273.15
      feelsTemp = data.main.feels_like -273.15
      maxTemp = data.main.temp_max -273.15
      humidity = data.main.humidity
    }  
    
  let weatherDescription
  let weatherIcon
  let iconUrl
  if(data.weather){
    weatherDescription = data.weather[0].main
    weatherIcon = data.weather[0].icon
    iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`

  }
    
  

  return (
    <div className="App">
      <div className="search">
        <input type="text" 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter location'/>
      </div>
      <div className="container">
        <div className="top">
        {data.name != undefined && 
          <div className="location">
            <p>{data.name} </p><img src={iconUrl} alt="urlIcon" />
          </div>
        }
          <div className="temp">
            {data.main ? 
            <h2>{temp.toFixed(2)}°C</h2>
            :null
            }
            
          </div>
          <div className="description">
            <p>{weatherDescription}</p>
          </div>
        </div>

        {data.name != undefined && 
        <div className="bottom">
          <div className="feels">
          {data.main ? 
            <p>{feelsTemp.toFixed(2)}°C</p>
            :null
            }
            
            <p>Feels Likes</p>
          </div>
          <div className="humidity">
            <p>{humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind-speed">
          {data.main ? 
            <p>{maxTemp.toFixed(2)}°C</p>
            :null
            }
          
            <p>MAX</p>
          </div>

        </div>
        
        }
        
      </div>
    </div>
  );
}

export default App;
