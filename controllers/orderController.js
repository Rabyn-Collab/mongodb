const Order = require('../models/Order');



module.exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


module.exports.getOrderByUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id });
    return res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}



