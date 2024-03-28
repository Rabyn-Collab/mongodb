const express = require('express');
const { userLogin, useRegister } = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');
const router = express.Router();



const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required()
});

const registerSchema = Joi.object({
  email: Joi.string().email().required('mail is req'),
  password: Joi.string().min(5).max(20).required(),
  fullname: Joi.string().required(),
});





router.route('/users/login').post(validator.body(loginSchema), userLogin);
router.route('/users/register').post(validator.body(registerSchema), useRegister);
router.route('/users').get();
router.route('/users/:id').get().patch();




module.exports = router;

