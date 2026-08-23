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

app.get("/getData", async (req, res) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const data = await User.findOne({ _id: decoded._id });
      if (data) {
        res.send(data);
      } else {
        res.status(400).send("invalid credentials");
      }
    } else {
      res.status(400).send("token not found");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.delete("/delete", async (req, res) => {
  await User.findOneAndDelete({ email: req.body.email });
  res.send("data deleted");
});

app.patch("/update", async (req, res) => {
  try {
    const ALLOWED_UPDATES = [
      "class",
      "email",
      "Age",
      "password",
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
    await User.findOneAndUpdate({ email: req.body.email }, { ...req.body });
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