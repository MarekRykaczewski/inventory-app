const express = require("express");
const router = express.Router();

// Require controller modules

const item_controller = require('../controllers/itemController')
const category_controller = require('../controllers/categoryController')

// ITEM ROUTES

// GET catalog item_list
router.get("/", item_controller.item_list);

// CATEGORY ROUTES
router.get("/categories", category_controller.category_list);

// Export

module.exports = router;
