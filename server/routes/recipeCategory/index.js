const recipeCategory = require("express").Router();
const all = require("./all");
const single = require("./single");

// /recipe-category /
recipeCategory.get("/", all);
// recipeCategory.get("/recipe-category/:_id", single);

//  Route is actually /recipe-category/recipe-category/menu/item
// recipeCategory.get("/recipe-category/menu/item", single);

module.exports = recipeCategory;