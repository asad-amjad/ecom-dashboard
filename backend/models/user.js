const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Model = new Schema(
  {
    name: String,
    email: String,
    password: String
  },
  { strict: false, versionKey: false, timestamps: true, collection: "users" }
);

// Export the model
module.exports = mongoose.model("user", Model);
