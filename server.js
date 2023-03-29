const exprees = require("express");
const mongoose = require("mongoose");
const connect = require("./Config/connect");
const UserSchema = require("./Models/UserSchema");
const app = exprees();
const port = 3200;

app.use(exprees.json());
//Call the connect funtion to db
connect();

// Add User object to the database
app.post("/addUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserSchema(user);
    await newUser.save();
    res.status(200).send("added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went Wrong ⛔");
  }
});

// Get Array of Users objects from the database
app.get("/getusers", async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Somethig went wrong ⛔");
  }
});
// Get  Users object by ID from the database

app.get("/getbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id);

    //If cannot find user will return error message , esle will return the user object
    user? res.status(200).send(user):res.status(404).send("cannot find user ⚠️")
    
  } catch (error) {
    console.log(error);
    res.status(500).send("cannot get ");
  }
});

app.put("/edituser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newuser = req.body;

    await UserSchema.findByIdAndUpdate(id, { $set: { ...newuser } });

    res.status(200).send("User has been edited ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot edit ");
  }
});

app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await UserSchema.findByIdAndRemove(id);
    res.status(200).send("User has been deleted ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot delete user ");
  }
});

//Running server
app.listen(port, (err) => {
  err
    ? console.log("something went wrong with the server")
    : console.log(`we are running on .. http://localhost:${port}`);
});
