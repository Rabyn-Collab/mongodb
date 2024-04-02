const path = require('path');
const fs = require('fs');

module.exports.fileCheck = (req, res, next) => {
  const file = req.files?.product_image;
  if (file) {
    const exts = ['.png', '.jpg', 'jpeg', '.webp'];
    const fileExt = path.extname(file.name);
    if (exts.includes(fileExt)) {
      file.mv(`./uploads/${file.name}`, (err) => {

      });
      req.imagePath = `/uploads/${file.name}`;
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid image'
      });
    }

  } else {
    return res.status(400).json({
      status: 'error',
      message: 'please provide valid image'
    });
  }



}


module.exports.updateCheck = (req, res, next) => {
  const file = req.files?.product_image;
  if (file) {
    const exts = ['.png', '.jpg', 'jpeg', '.webp'];
    const fileExt = path.extname(file.name);

    if (exts.includes(fileExt)) {
      fs.unlink(`.${req.body.prevImage}`, (err) => {

      });

      file.mv(`./uploads/${file.name}`, (err) => {

      });
      req.imagePath = `/uploads/${file.name}`;
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid image'
      });
    }


  } else {
    next();
  }



}