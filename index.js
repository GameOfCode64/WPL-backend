const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const products = require("./model/products");
app.use(express.json());
app.use(cors());
const DB = process.env.DATABASE_URL;

//
const Order = require("./model/OrderSchema");

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connect Sucessfully");
  })
  .catch((error) => {
    console.log("Error to Connect DB", error);
  });
// Test API
app.get("/", (req, res) => {
  res.send("Welcome to our API");
});

// Get All Orders From Mongodb
app.get("/products", (req, res) => {
  res.send(products);
});
// Get All Orders From Mongodb
app.get("/getOrders", (req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.send(err));
});

// POST user  Cart Information to Mongodb
app.post("/cart", (req, res) => {
  const { Username, TabelNo } = req.body;
  if (!Username || !TabelNo) {
    return res.status(422).json("Place Fill the required Fileds");
  }
  const order = new Order(req.body);
  order
    .save()
    .then(() => {
      res.status(201).json("Order Place Sucessfuly");
    })
    .catch(() => {
      res.status(500).json("Internal Server Error");
    });
});

const port = process.env.PORT || 8888;
app.listen(port, console.log(`Server is Runing on Port ${port}`));
