"use strict";
const express = require("express");
const bodyParser = require("body-parser"); 
const morgan = require("morgan"); // Helps with error message
const fetch = require("isomorphic-fetch"); //Uses fetch in express, from browser.

require("dotenv").config();
const recipeCategoryRoutes = require('./routes/recipeCategory');

const app = express();

// Allows us to do CRUD in BE
app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

app.use(morgan("tiny"))
app.use(express.static("./server/assets"))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

  // app.use('/recipe/category', recipeCategoryRoutes);
  
app.get("/", function(req,res){
    res.send("hello from server")
  })

// Fetching data from third party API.
const getData = async (q) => {
  const url = `https://api.edamam.com/search?q=${q}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&from=0&to=10`;
  const response = await fetch(url)
  return response.json();
}
getData("pizza").then(res => console.log(res));


app.listen(8080, () => {
    console.info(`Server up and running on port 8080`);
  });