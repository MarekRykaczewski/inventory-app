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

// Display detail page for a specific Item
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id)
      .exec();
  
    if (Item === null) {
      // No results.
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("item_detail", {
      title: "Item:",
      item: item,
    });
  });  