import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';

const WeatherCheck = () => {
  const [zipCode, setZipCode] = useState(1);
  const [localTemperature, setLocalTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);

  const getWeather = async () => {
    //console.log(zipCode);
     try {
      const res = await axios.get(`http://localhost:5001/weather?zip=${zipCode}`)
      if (!res) {
        alert("Failed to fetch weather for this location");
      }
      if (res) {
        //console.log(res.data)
        //console.log(res.data.weather.temperature.fahrenheit);
        setLocalTemperature(res.data.weather.temperature.fahrenheit);
        setTimeStamp(res.data);
        setCity(res.data.location.city);
      }
    } catch (err) {
      alert(`There was an error. Enter valid zip code: ${JSON.stringify(err.message)}`);
    }
  };

  return (
    <div>
        <br />
        <br />
        <Navigation />
        <br />
    <div className='div-form'>
      <h2>Weather Check Tool</h2>
      <p>Enter Zip Code to Get Local Weather in <sup>o</sup>F</p>
      <div className='div-from'>
        <label style={{ marginRight: '10px' }}>Zip Code: </label>
        <input type="number" value={ zipCode } onChange={(e) => setZipCode(e.target.value)} />
      </div> <br />
      <button className='btn-fetch' onClick={getWeather}>Fetch</button>
      <br /> <br />
      {localTemperature && (
        <div className='result-box'>
          <h4>Temperature for {city}: = {localTemperature} </h4>
        </div>
      )}
    </div>
    </div>
  );
};

export default WeatherCheck;
