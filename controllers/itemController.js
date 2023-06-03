const Item = require('../models/item')
const Category = require('../models/category')
const { body, validationResult } = require("express-validator");

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
    const item = await Item.findById(req.params.id).populate("category")
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

// Handle Item create on POST.
exports.item_create_post = [
  // Validate and sanitize the name field.
  body("name", "Item name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // Validate and sanitize the description field.
  body("description", "Category description accepts up to 100 characters")
    .trim()
    .isLength({ max: 100 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const item = new Item({ 
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("item_form", {
        title: "Create Item",
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Item with same name already exists.
      const itemExists = await Item.findOne({ name: req.body.name }).exec();
      if (itemExists) {
        // Item exists, redirect to its detail page.
        res.redirect(itemExists.url);
      } else {
        await item.save();
        // New item saved. Redirect to item detail page.
        res.redirect(item.url);
      }
    }
  }),
];