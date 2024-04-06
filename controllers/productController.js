const Product = require('../models/Product');
const mongoose = require('mongoose');


exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating';
  next();
}

exports.getAllProducts = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludeFields.forEach((e) => delete queryObj[e]);
  let query = Product.find(queryObj);

  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    //query.sort('product_price rating');
  } else {
    query.sort('-createdAt')
  }

  // fields limiting
  if (req.query.fields) {
    const fieldsBy = req.query.fields.split(',').join(' ');
    query = query.select(fieldsBy);
    //query.select('product_price rating');
  }

  //searching

  if (req.query.search) {
    query = query.find({ product_name: { $regex: req.query.search, $options: 'i' } });
  }


  // pagination
  //page=2&limit=10, 1-10, page 1 -- 11-20, page2
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const counts = await Product.countDocuments(query);

  try {
    const products = await query;
    return res.status(200).json({
      status: 'success',
      data: products,
      page,
      results: counts
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}

exports.getProductById = async (req, res) => {
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




exports.addProduct = async (req, res) => {
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


exports.updateProduct = async (req, res) => {
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


exports.removeProduct = async (req, res) => {
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

