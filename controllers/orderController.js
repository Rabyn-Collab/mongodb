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

module.exports.getOrderDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id });
    return res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}




module.exports.createOrder = async (req, res, next) => {
  const { totalAmount, orderItems } = req.body;
  try {
    await Order.create({
      totalAmount,
      orderItems,
      user: req.userId
    });
    return res.status(200).json({
      status: 'success',
      message: 'order successfully added'
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


