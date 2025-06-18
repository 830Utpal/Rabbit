const mongoose = require('mongoose');

// Subdocument schema for individual cart items
const cartItemSchema = new mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
   },
   name: String,
   image: String,
   price: String,
   size: String,
   color: String,
   quantity: {
      type: Number,
      default: 1
   },
}, { _id: false }); // Prevents creation of separate _id for each item

// Main Cart schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for guest carts
    },
    guestId: {
        type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
