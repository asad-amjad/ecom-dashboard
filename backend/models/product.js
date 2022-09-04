const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Model = new Schema(
  {
    name: String,
    price: String,
    userId: String,
    company: String,
    file: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      // required: true,
    },
  },
  { strict: false, versionKey: false, timestamps: true, collection: "products" }
);

// Export the model
module.exports = mongoose.model("product", Model);
