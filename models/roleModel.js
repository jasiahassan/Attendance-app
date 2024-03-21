const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
