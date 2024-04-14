const express = require('express');
const { adminCheck, authCheck } = require('../middlewares/authCheck');
const router = express.Router();



router.route('/').get().post(adminCheck);
router.route('/:id').get().patch(authCheck)


module.exports = router;

