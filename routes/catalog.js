const express = require("express");
const router = express.Router();

// Require controller modules

const item_controller = require('../controllers/itemController')

// ITEM ROUTES

// GET catalog item_list
router.get("/", item_controller.item_list);

module.exports = router;
