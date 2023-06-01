const Item = require('../models/item')
const asyncHandler = require('express-async-handler')

// Display list of all BookInstances.
exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().sort({ name: 1 }).exec();
  
    res.render("item_list", {
      title: "Item list",
      item_list: allItems,
    });
  });