const Product = require('../models/Product');
const mongoose = require('mongoose');



module.exports.CategoryData = async (req, res, next) => {
  const { category } = req.params;
  req.query.category = category.toLowerCase();
  next();
}

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
    const queryObj = { ...req.query };
    const extraFields = ['search', 'sort', 'fields', 'page', 'search'];
    extraFields.forEach((val) => delete queryObj[val]);

    //searching

    if (req.query.search) {
      queryObj.product_name = { $regex: req.query.search, $options: 'i' }
    }

    let query = Product.find(queryObj);

    // dataBySpecificFields
    if (req.query.fields) {
      const selectField = req.query.fields.split(',').join(' ');
      query = query.select(selectField);
    }

    // sorting
    if (req.query.sort) {
      const sorting = req.query.sort.split(',').join(' ');
      query = query.sort(sorting);
    }


    // pagination
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    // 1-10,  10-20, 20-30
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    const count = await Product.countDocuments(query);


    const products = await query;
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

