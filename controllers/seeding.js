const User = require("../models/userModel");
const Role = require("../models/roleModel");

const seedAdmin = async () => {
  try {
    const admin = await Role.findOne({ role: "Admin" });
    const user = await User.findOne({ roleId: admin._id });
    if (!user) {
      const newAdmin = new User({
        email: "amirbashir@gmail.com",
        password: "123456789",
        roleId: admin._id,
      });
      await newAdmin.save();

      console.log("Admin user created successfully.");
    } else {
      console.log("Admin already exists.");
    }
  } catch (err) {
    console.log(err);
  }
};

seedAdmin();
