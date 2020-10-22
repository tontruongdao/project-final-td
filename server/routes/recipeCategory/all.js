const express = require('express');
// const router = express.Router();

require("dotenv").config();

// Fetching data from third party API.
const getData = async (q) => {
    const url = `https://api.edamam.com/search?q=${q}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&from=0&to=10`;
    const response = await fetch(url)
    // console.log(response.json());
    return response.json();
}

module.exports = async (req, res) => {
    
    // const q = "burger"
    // const url = `https://api.edamam.com/search?q=${q}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&from=0&to=10`;
    // const response = await fetch(url)
    let data = await getData("pizza");
    console.log("Starting HERE");
    // getData("pizza").then(json => data.push(json));
    


    console.log("FETCh COMPLETED");
    console.log(data);
    // console.log(data);

    // return res.status(200).send("Endpoint works")

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

// POST /feed/post
// router.post('/recipe/category', recipeCategory.createPost);

// module.exports = router;