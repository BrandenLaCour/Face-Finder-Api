const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controller/register");
const signIn = require("./controller/signIn");
const profile = require("./controller/profile");
const image = require("./controller/image");

const app = express();
var corsOptions = {
  origin: 'https://brandenlacour.github.io/face-finder/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});



app.use(bodyParser.json());
app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
