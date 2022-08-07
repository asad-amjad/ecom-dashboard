const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Model = new Schema(
  {
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String,
  },
  { strict: false, versionKey: false, timestamps: true, collection: "products" }
);

// Export the model
module.exports = mongoose.model("product", Model);
