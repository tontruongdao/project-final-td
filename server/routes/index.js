const routes = require("express").Router();

const getRecipePizza = require("./recipe-pizza");

routes.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Connected!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

routes.use("/recipe/pizza", getRecipePizza);
// routes.use("/random-stuff", recipeCategory);



module.exports = routes;