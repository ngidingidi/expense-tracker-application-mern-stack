import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import cors from 'cors';

const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};
const PORT = process.env.PORT4;
const API_KEY = process.env.API_KEY;

const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/weather', async (req, res) => {
  console.log('Received request to get weather for specific zip code---');
  const zipCode = req.query.zip;

  if (!zipCode) {
    return res.status(400).json({ error: 'Missing zip code' });
  }

  try {
    // Get coordinates from zip code
    const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${API_KEY}`);
    const geoData = await geoResponse.json();

    //console.log(geoData);

    if (!geoData.lat || !geoData.lon) {
      return res.status(404).json({ error: 'Invalid ZIP code or location not found' });
    }

    // Get weather using coordinates
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${API_KEY}`);
    const weatherData = await weatherResponse.json();

    const weatherDesc = weatherData.weather[0].description;
    const tempK = weatherData.main.temp;
    const tempF = ((tempK - 273.15) * 9/5 + 32).toFixed(2);

    res.json({
      location: {
        zip: geoData.zip,
        city: geoData.name,
        country: geoData.country,
        lat: geoData.lat,
        lon: geoData.lon
      },
      weather: {
        description: weatherDesc,
        temperature: {
          kelvin: tempK,
          fahrenheit: tempF
        }
      }
    });
    console.log('Successfully obtained weather for specific zip code---');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


