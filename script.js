const mongoose = require("./models/mongodb");

//Import the necessary packages
const express = require("express");
var app = express();
const path = require("path");
const exphb = require("express-handlebars");
const bodyparser = require("body-parser");
var session = require("express-session");
const Handlebars = require("handlebars");
const MongoStore = require("connect-mongo")(session);
var flash = require("express-flash");
const webAuth = require("./middleware/webauth");

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// const userController = require("./controllers/admin/userController");
const adminAuthentication = require("./controllers/admin/authentication");
const slotsController = require("./controllers/admin/slotsController");
const appointmentController = require("./controllers/admin/appointmentController");

//api
const apiAuthenticationController = require("./controllers/api/authenticationController");
const apiSellerController = require("./controllers/api/sellerController");
const token = require("./lib/token");
const loginAuth = require("./middleware/loginAuth");
const { database } = require("./keys");

app.use(
  session({
    secret: "1828968049",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ url: database.url }),
  })
);

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(flash());

//Create a welcome message and direct them to the main page

app.get("/", loginAuth, (req, res) => {
  res.redirect("/login");
});

app.get("/admin", webAuth, (req, res) => {
  res.redirect("/admin/slot");
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
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require("./lib/handlebar-helpers"),
  })
);
app.set("view engine", "hbs");

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Set the Controller path which will be responding the user actions
app.use("/", adminAuthentication);

app.use("/admin", webAuth, [slotsController, appointmentController]);

app.use("/api", apiAuthenticationController);
app.use("/api", token.verify, apiSellerController);
