const express = require("express");
const fetch = require("node-fetch");
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});

app.get('/weatherCity/:city/:unit', async (req, res) => {
    const city = req.params.city;
    const unit = req.params.unit;
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
  });

  app.get('/weatherCoordinates/:lat/:lon/:unit', async (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const unit = req.params.unit;
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
  });