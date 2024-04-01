const express = require('express');
const { userLogin, useRegister, userUpdate } = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');
const { authCheck } = require('../middlewares/authCheck');
const router = express.Router();



const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'somes must be a string',
  }),
  password: Joi.string().min(5).max(20).required().messages({
    'string.min': 'somes must be a string',
  })
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
  fullname: Joi.string().required(),
});





router.route('/users/login').post(validator.body(loginSchema), userLogin);
router.route('/users/register').post(validator.body(registerSchema), useRegister);
router.route('/users/single').patch(authCheck, userUpdate);




module.exports = router;

