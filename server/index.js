"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fetch = require("isomorphic-fetch");
const axios = require("axios").default;

require("dotenv").config();
const recipeCategoryRoutes = require('./routes/recipeCategory');

const app = express();

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


// const getRecipe= async (q,id,key) =>{
//   const URL = `https://api.edamam.com/search?${q}&app_id=${id}&app_key=${key}`
//   const options = {
//     headers:{
//       "Accept": "application/json",
//       "Content-Type": "application/json"
//     }
//   }
//   const res =  await fetch(URL, options)
//   return res.json();
// }

function getRecipe() {
  const response = axios.get('https://api.edamam.com/search', {
    //  headers:{
    //    Accept: application/json,
    //    Content-Type: application/json
    //    },
      params: {
        app_key:process.env.app_key,
        app_id:process.env.app_id,
        q:"pizza"
      }
    })
    .then(function (response) {
      console.log(response.data.hits)
      // console.log(response.statusCode);
    })
    .catch(function (error) {
      console.log("error");
    })
    .then(function () {
      // always executed
    }); 
}

// getRecipe()

// const test = getRecipe("pizza",process.env.app_id,process.env.app_key)
//   .then(res=> res));

//   console.log(test);



app.listen(8080, () => {
    console.info(`Server up and running on port 8080`);
  });