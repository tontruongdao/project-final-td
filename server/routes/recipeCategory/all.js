const express = require('express');
const router = express.Router();

// Fetching data from third party API.
// const getData = async (q) => {
//     const url = `https://api.edamam.com/search?q=${q}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&from=0&to=10`;
//     const response = await fetch(url)
//     return response.json();
// }

module.exports = (req, res) => {
    const url = `https://api.edamam.com/search?q=${q}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&from=0&to=10`;
    const response = await fetch(url)
    
    try {
      return res.status(200).json({
        success: true,
        companies,
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

module.exports = router;