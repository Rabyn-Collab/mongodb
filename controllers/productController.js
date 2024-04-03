const Product = require('../models/Product');

const products = [
  { id: 1, name: 'shoes', price: 200 },
  { id: 2, name: 'clothes', price: 500 },
];



module.exports.getAllProducts = async (req, res) => {
  try {

    const products = await Product.find({});
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

