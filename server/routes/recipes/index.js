const getRecipes = require("express").Router();
const all = require("./all");
const single = require("./single");

// /recipe
getRecipes.get("/category/:recipe", all);
getRecipes.get("/:id", single);

// getRecipePizza.get("/recipe-category/:_id", single);

//  Route is actually /recipe-category/recipe-category/menu/item
// getRecipePizza.get("/recipe-category/menu/item", single);

module.exports = getRecipes;