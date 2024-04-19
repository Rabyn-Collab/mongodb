const express = require('express');
const { getAllProducts, addProduct, updateProduct, getProductById, getTopProducts, CategoryData, addReview } = require('../controllers/productController');
const { fileCheck, updateCheck } = require('../middlewares/fileCheck');
const { adminCheck, authCheck } = require('../middlewares/authCheck');
const router = express.Router();



router.route('/').get(getAllProducts).post(adminCheck, fileCheck, addProduct);
router.route('/reviews').patch(authCheck, addReview);
router.route('/top').get(getTopProducts);
router.route('/category/:category').get(CategoryData, getAllProducts);
router.route('/:id').get(getProductById).patch(updateCheck, updateProduct).delete(getAllProducts);



module.exports = router;

