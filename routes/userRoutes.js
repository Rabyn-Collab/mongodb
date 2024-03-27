const express = require('express');
const router = express.Router();



router.route('/users/login').post();
router.route('/users/register').post();
router.route('/users').get();
router.route('/users/:id').get().patch();




module.exports = router;

