const express = require('express');
// const router = express.Router();

require("dotenv").config();

const getData = async (q) => {
  
  const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?&number=10&offset=0&query=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": `${process.env.app_host}`,
      "x-rapidapi-key": `${process.env.app_key2}`
    }
  })
  
  return response.json();

}

module.exports = async (req, res) => {

  const query = req.params.recipe;

  console.log("Going to fetch:", query);
  
  let data = await getData(query);

  console.log("Starting HERE");
  console.log("FETCh COMPLETED");
  console.log(data);

  try {
    return res.status(200).json({
      success: true,
      message: "Connected!",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};