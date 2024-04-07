const Product = require('../models/Product');
const mongoose = require('mongoose');



module.exports.getTopProducts = async (req, res) => {


  try {
    const products = await Product.find({ rating: { $gt: 4.5 } }).limit(5).sort('-product_price');
    return res.status(200).json({
      status: 'success',
      data: products
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}

module.exports.getAllProducts = async (req, res) => {


  try {
    // const products = await Product.find({}).sort('-rating');
    //const products = await Product.find({ rating: { $lt: 4 } });
    // const products = await Product.find({}).select('product_name product_price');
    const products = await Product.find({});
    const count = await Product.countDocuments();
    return res.status(200).json({
      status: 'success',
      data: products,
      results: count,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}

module.exports.getProductById = async (req, res) => {
  // console.log(req.params);
  //   console.log(req.query);
  const { id } = req.params;
  try {
    const isValid = mongoose.isValidObjectId(id);
    if (isValid) {
      const product = await Product.findById(id);
      return res.status(200).json({
        status: 'success',
        data: product
      });
    } else {
      return res.status(400).json({
        status: 'error',
        data: 'please provide valid id'
      });
    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}




module.exports.addProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock,
  } = req.body;

  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      brand,
      category,
      countInStock,
      product_image: req.imagePath
    });

    return res.status(201).json({
      status: 'success',
      message: `product added successfully`
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }

}


module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock,
  } = req.body;

  try {
    if (req.imagePath) {
      await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock,
        product_image: req.imagePath
      });
    } else {
      await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock,
      });
    }

    return res.status(201).json({
      status: 'success',
      message: `product update successfully`
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }

}



module.exports.removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      status: 'success',
      message: `product remove successfully`
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }

}

