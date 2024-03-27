const express = require('express');
const { getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProducts).post(getAllProducts);

router.route('/products/:id').patch(getAllProducts).delete(getAllProducts);



module.exports = router;

