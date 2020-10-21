const recipeCategory = require("express").Router();
const all = require("./all");
const single = require("./single");

recipeCategory.get("/recipe-category", all);
recipeCategory.get("/recipe-category/:_id", single);

module.exports = recipeCategory;