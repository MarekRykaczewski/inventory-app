const express = require("express");
const router = express.Router();

// Require controller modules

const item_controller = require('../controllers/itemController')
const category_controller = require('../controllers/categoryController')

// ITEM ROUTES

// GET index
router.get("/", item_controller.index);

// GET request for creating an Item
router.get("/item/create", item_controller.item_create_get);

// GET item list
router.get("/items", item_controller.item_list);

// GET request for one Item.
router.get("/item/:id", item_controller.item_detail);

// CATEGORY ROUTES

// GET request for creating a Category
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Author.
router.post("/category/create", category_controller.category_create_post);

// GET request for one Author.
router.get("/category/:id", category_controller.category_detail);

// Get category list
router.get("/categories", category_controller.category_list);

// Export

module.exports = router;
