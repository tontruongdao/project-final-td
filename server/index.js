"use strict";
const express = require("express");
const bodyParser = require("body-parser"); 
const morgan = require("morgan"); // Helps with error message
const fetch = require("isomorphic-fetch"); //Uses fetch in express, from browser.
const routes = require('./routes')

// const recipeCategoryRoutes = require('./routes/recipeCategory/index');

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
  
// app.get("/", function(req,res){
//     res.send("hello from server")
//   })


// getData("pizza").then(res => console.log(res));
app.use('/', routes);

//  /recipe-category

app.listen(8080, () => {
    console.info(`Server up and running on port 8080`);
  });