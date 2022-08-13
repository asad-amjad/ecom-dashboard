const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Model = new Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      // required: true,
    },
    sub_category: {
      type: String,
      // required: true,
    },
  },
  {
    strict: false,
    versionKey: false,
    // timestamps: true,
    collection: "sub-categories",
  }
);

// Export the model
module.exports = mongoose.model("SubCategory", Model);
