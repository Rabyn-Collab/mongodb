const express = require('express');
const { adminCheck, authCheck } = require('../middlewares/authCheck');
const { getAllOrder, getOrderByUser, createOrder, getOrderDetail, removeOrder } = require('../controllers/orderController');
const router = express.Router();



router.route('/').get(adminCheck, getAllOrder).post(authCheck, createOrder);
router.route('/:id').get(authCheck, getOrderByUser).delete(authCheck, removeOrder);
router.route('/detail/:id').get(getOrderDetail);


module.exports = router;

