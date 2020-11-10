require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const Admin_controller = require("./controller/Admin_controller");
const User_controller = require("./controller/User_controller");
const Products_controller = require("./controller/Products_controller");
const Cloudinary_controller = require("./controller/Cloudinary_controller");

//PORT
const PORT = 5000 || process.env.PORT;

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Database Connection
require("./db-connection");

//Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);

setTimeout(() => {
  //Routes
  app.get("/", (req, res) => {
    res.send("Hello world...");
  });

  // User routes
  //for getting user data >>>>>
  // app.get("/api/user-data", User_controller.readUserData);
  // app.post("/api/user-data/cart", User_controller.addToCart);
  // app.delete("/api/user-data/cart/:id", User_controller.removeFromCart);
  app.get("/auth/callback", User_controller.login);
  // app.post("/api/logout", User_controller.logout);

  //Products routes
  // >>>>>>>>>>
  app.get("/api/products", Products_controller.readAllProducts);
  app.get("/api/products/:_id", Products_controller.readProduct);

  // Admin Routes
  //>>>>>>>>>>>>
  app.get("/api/users", Admin_controller.getAdminUsers);
  app.post("/api/products", Admin_controller.createProduct);
  app.put("/api/products/:id", Admin_controller.updateProduct);
  app.delete("/api/products/:id", Admin_controller.deleteProduct);
}, 200);

//server
app.listen(PORT, () => console.log("Server running on port 5000..."));
