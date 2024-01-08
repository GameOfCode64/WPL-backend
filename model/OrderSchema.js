const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  Username: {
    type: String,
    require: true,
  },
  TabelNo: {
    type: Number,
    require: true,
  },
  cartData: [
    {
      name: {
        type: String,
        require: true,
      },
      desc: {
        type: String,
        require: true,
      },
      imgUrl: {
        type: String,
        require: true,
      },
      cartQuantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
});
const Order = mongoose.model("ORDERS", orderSchema);
module.exports = Order;
