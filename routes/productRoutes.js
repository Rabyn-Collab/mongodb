const express = require('express');
const { getAllProducts, addProduct, updateProduct, getProductById, aliasTopProducts } = require('../controllers/productController');
const { fileCheck, updateCheck } = require('../middlewares/fileCheck');
const { adminCheck } = require('../middlewares/authCheck');
const router = express.Router();



router.route('/').get(getAllProducts).post(adminCheck, fileCheck, addProduct);

router.route('/topProducts').get(aliasTopProducts, getAllProducts);
router.route('/:id').get(getProductById).patch(updateCheck, updateProduct).delete(getAllProducts);



module.exports = router;

