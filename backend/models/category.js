const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Model = new Schema(
  { name: String },
  {
    strict: false,
    versionKey: false,
    timestamps: true,
    collection: "categories",
  }
);

// Export the model
module.exports = mongoose.model("category", Model);
