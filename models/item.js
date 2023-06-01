const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 100 },
    category: [{type: Schema.Types.ObjectId, ref: "Category"}],
    number_in_stock: { type: Number },
    price: { type: Number }
  });

// Export model
module.exports = mongoose.model("Item", ItemSchema);