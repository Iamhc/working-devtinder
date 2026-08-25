require("dotenv").config(); // Essential: Sabse top line par hona zaruri hai

const express = require("express");
const validate = require("validator");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const database = require("./config/database");
const User = require("./config/model");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.use(cookieparser());

const signup=require("./routes/auth");
app.use("/",signup);

const login=require("./routes/login");
app.use("/",login);
const middleware=require("./routes/middleware");

const getData=require("./routes/getData")
app.use("/",getData);

const updatePassword = require("./routes/updatePassword");   // apni file ka naam check kar lo
app.use("/", updatePassword);

app.delete("/delete", middleware,async (req, res) => {
  await User.findOneAndDelete({ email: req.body.email });
  res.send("data deleted");
});

app.patch("/update",middleware, async (req, res) => {
  try {
    const ALLOWED_UPDATES = [
      "class",
      "email",
      "Age",
      "about",
      "ProfilePic",
      "hobbies",
      "gender",
    ];
    Object.keys(req.body).forEach((key) => {
      if (!ALLOWED_UPDATES.includes(key)) {
        throw new Error("invalid updates");
      }
    });
    await User.findOneAndUpdate({ _id: req.user._id }, { ...req.body });
    res.send("data update");
    console.log("data updated");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;

database()
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`server is running on the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database not connected");
    console.log(err);
  });