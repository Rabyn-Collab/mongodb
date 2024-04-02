const express = require('express');
const { getAllProducts, addProduct, updateProduct } = require('../controllers/productController');
const { fileCheck, updateCheck } = require('../middlewares/fileCheck');
const router = express.Router();



router.route('/').get(getAllProducts).post(fileCheck, addProduct);

router.route('/:id').patch(updateCheck, updateProduct).delete(getAllProducts);



module.exports = router;

