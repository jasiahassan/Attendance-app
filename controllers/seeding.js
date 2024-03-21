const User = require("../models/userModel");
const Role = require("../models/roleModel");

const seedAdmin = async () => {
  try {
    const admin = await Role.findOne({ role: "admin" });
    if (!admin) {
      const newAdmin = new User({
        name: "jasia",
        email: "jasia@gmail.com",
        password: "123456789",
        passwordConfirm: "123456789",
      });

      const adminRole = new Role({
        role: "admin",
        createdAt: Date.now(),
      });

      await newAdmin.save();
      await adminRole.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin already exists.");
    }
  } catch (err) {
    console.log(err);
  }
};

seedAdmin();
