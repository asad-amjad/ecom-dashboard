const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Model = new Schema(
  {
    name: String,
    sub_categories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
  },
  {
    strict: false,
    versionKey: false,
    // timestamps: true,
    collection: "categories",
  }
);

// Export the model
module.exports = mongoose.model("category", Model);
