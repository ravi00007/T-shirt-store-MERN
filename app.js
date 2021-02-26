require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParse =  require("body-parser");
const cookieParse =  require("cookie-parser");
const cors =  require("cors");
const authRouts =  require('./routes/auth')
// db connection

mongoose.connect(process.env.MongoDBurl, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(()=>{
    console.log("Database Connected !")
})
const app = express();
//setting middleware
app.use(bodyParse.json());
app.use(cookieParse());
app.use(cors());





const port = 8000;

app.get("/", (req, res) => {
  return res.send("Home page");
});

const admin = (req, res) => {
  return res.send("this is admin dashboard");
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin is running");
  next();
};

app.get("/admin", isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("You are visiting login route");
});

app.use("/api",authRouts);

app.listen(port, () => {
  console.log(`Server is up and running... at ${port}`);
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
