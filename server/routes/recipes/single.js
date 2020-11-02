const express = require('express');
// const router = express.Router();

require("dotenv").config();

const getData = async (q) => {
  
  const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${q}/information`, {
	"method": "GET",
	"headers": {
        "x-rapidapi-host": `${process.env.app_host}`,
        "x-rapidapi-key": `${process.env.app_key2}`
	}
})
  return response.json();
}

// const getData = async () => {
//   const response = "single item was fetched"
//   return(response)
// }

module.exports = async (req, res) => {

  const query = req.params.id;

  console.log("Going to fetch:", query);
  
  let data = await getData(query);

  console.log("Starting HERE");
  console.log("FETCH COMPLETED");
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