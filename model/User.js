const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  auth0_id: {
    type: String,
  },
  profile_Picture: {
    type: String,
  },
  isAdmin: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
