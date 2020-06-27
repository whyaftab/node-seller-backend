const mongoose = require("./models/mongodb");

//Import the necessary packages
const express = require("express");
var app = express();
const path = require("path");
const exphb = require("express-handlebars");
const bodyparser = require("body-parser");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var flash = require("express-flash");
const webAuth = require("./middleware/webauth");

// const userController = require("./controllers/admin/userController");
const adminAuthentication = require("./controllers/admin/authentication");

app.use(
  session({
    secret: "1828968049",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ url: "mongodb://localhost:27017/tazweed" }),
  })
);

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(flash());

//Create a welcome message and direct them to the main page

app.get("/", webAuth, (req, res) => {
  res.send(
    '<h2 style="font-family: Malgun Gothic; color: midnightblue ">Welcome to Edureka Node.js MongoDB Tutorial!!</h2>'
  );
});

app.use("/public", express.static("public"));
app.use(bodyparser.json());
//Configuring Express middleware for the handlebars
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphb({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutDir: __dirname + "views/layouts/",
  })
);
app.set("view engine", "hbs");

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Set the Controller path which will be responding the user actions
app.use("/", adminAuthentication);
