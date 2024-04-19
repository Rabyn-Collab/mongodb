const mongoose = require('mongoose');

const productSchhema = new mongoose.Schema({

  product_name: {
    type: String,
    required: true
  },
  product_detail: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },

  product_image: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  },
  reviews: [{
    username: { type: String, required: true },
    comment: { type: Number, required: true },
    rating: { type: Number, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },

  ]

}, { timestamps: true });


const Product = mongoose.model('Product', productSchhema);

module.exports = Product;
