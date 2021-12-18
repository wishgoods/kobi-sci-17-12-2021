const express = require("express");
const cors = require('cors');
const fs =require('fs');
var bodyParser = require('body-parser');

// App
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/getAllFavorites", (req, res) => {
  let rawdata = fs.readFileSync('data/favorites.json');
  let favorites = JSON.parse(rawdata);
  res.status(200).send({data: favorites});
});
app.post("/addNewFavorite", (req, res) => {
  let rawdata = fs.readFileSync('data/favorites.json');
  let favorites = JSON.parse(rawdata);
  favorites['favorites'].push(req.body);
  favorites = JSON.stringify(favorites);
  fs.writeFileSync('data/favorites.json', favorites);
  res.status(200).send({data: req.body});
})
app.listen(3000);