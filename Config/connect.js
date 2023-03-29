const mongoose = require("mongoose");

// connect to DB

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/contact");
    console.log("Connected To the database ✅");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
