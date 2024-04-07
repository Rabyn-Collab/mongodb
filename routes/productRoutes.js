const express = require('express');
const { getAllProducts, addProduct, updateProduct, getProductById, getTopProducts, getProductByAlias } = require('../controllers/productController');
const { fileCheck, updateCheck } = require('../middlewares/fileCheck');
const { adminCheck } = require('../middlewares/authCheck');
const router = express.Router();



router.route('/').get(getAllProducts).post(adminCheck, fileCheck, addProduct);
router.route('/top').get(getTopProducts);
router.route('/category/:category').get(getProductByAlias, getAllProducts);
router.route('/:id').get(getProductById).patch(updateCheck, updateProduct).delete(getAllProducts);



module.exports = router;
