const Item = require('../models/item')
const Category = require('../models/category')

const asyncHandler = require('express-async-handler')

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items and categories (in parallel)
  const [
    numItems,
    numCategories,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Home",
    item_count: numItems,
    category_count: numCategories,
  });
});

// Display list of all Items
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

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {

  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("item_form", {
    title: "Create Item",
    categories: allCategories,
  });
});