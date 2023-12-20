//jshint esversion: 9

const path = require("path");
const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const dotenv = require("dotenv")
const moment = require('moment-timezone');

dotenv.config();


// Setting variables for the different views
const publicDir = path.join(__dirname, "./public");
const viewsDir = path.join(__dirname, "./templates/views");
const partialsDir = path.join(__dirname, "./templates/partials");

// Setting up the templating engine => Register '.mustache' extension with The Mustache Express
// Setting up the partials engine passed to mustacheExpress(....)
app.engine("html", mustacheExpress(partialsDir, '.html'));
// Setting the view engine to html
app.set("view engine", "html");
//Setting up the views 
app.set("views", viewsDir);
// Setting up the public files
app.use(express.static(publicDir));
// response.body that comes in as a json object
app.use(express.json());


// custom middleware to verify the time of the request
const middleware = ((req, res, next) => {
  const timezone = 'Africa/Lagos';
  // Get the current time in the specified timezone
  const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
  const time = new Date(currentTime).getHours()

  if(time >= 9 && time <= 16) {  
    next()
  }else {
    res.status(200).json({message: "This webpage is only accessible between working hours (09:00 to 17:00) using GMT+0"})
  }
  
})


app.get("/", middleware, (req, res) => {
 res.render("index", {
  title: "Home",
  year: new Date().getFullYear(),
  reqTime: req.time,
  route: "/home"
 });
});

app.get("/service", middleware, (req, res) => {
 res.render("service", {
  title: "Service",
  year: new Date().getFullYear(),
  reqTime: req.time,
  route: "/service"

 });
});

app.get("/contact",middleware, (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    year: new Date().getFullYear(),
    reqTime: req.time,
    route: "/contact"
  });
});


app.get("*",middleware, (req, res) => {
  res.render("404", {
    title: "404",
    year: new Date().getFullYear(),
    reqTime: req.time,
    route: "non-routable"
  });
});
const port = process.env.PORT;
app.listen(port, () => {
 console.log(`Server is listening on port ${port}`);
});