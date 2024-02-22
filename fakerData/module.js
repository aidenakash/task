const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    Name: { type: String, required: true, },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.index({Name:"text"})
const users = mongoose.model("users", userSchema);
module.exports.users = users;
