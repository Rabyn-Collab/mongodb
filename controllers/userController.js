const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      const pass = bcrypt.compareSync(password, existUser.password);
      if (!pass) return res.status(401).json({ status: 'error', message: 'invalid credential' })

      const token = jwt.sign({
        id: existUser._id,
        isAdmin: existUser.isAdmin
      }, 'jwtsecret');

      return res.status(200).json({
        status: 'successfully login',
        data: {
          token,
          id: existUser._id,
          isAdmin: existUser.isAdmin,
          email: existUser.email,
          fullname: existUser.fullname,
          shippingAddress: existUser.shippingAddress
        }
      });


    } else {
      return res.status(401).json({
        status: 'error',
        message: `user doesn't exist`
      });
    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }

}

module.exports.useRegister = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        status: 'error',
        message: `user already exist`
      });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);

      await User.create({
        email,
        password: hashPassword,
        fullname
      });
      return res.status(201).json({
        status: 'success',
        message: 'user successfully registered'
      });
    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }
}




module.exports.userUpdate = async (req, res) => {
  const { fullname, shippingAddress } = req.body;
  try {
    const existUser = await User.findOne({ _id: req.userId });
    if (existUser) {
      return res.status(200).json(existUser);
    } else {

      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }
}