const express = require('express');

const recipeCategoryController = require('../controllers/recipeCategory');

const router = express.Router();

// GET /feed/posts
router.get('/recipe/category', recipeCategoryController.getRecipeCategory);

// POST /feed/post
// router.post('/recipe/category', recipeCategory.createPost);

module.exports = router;