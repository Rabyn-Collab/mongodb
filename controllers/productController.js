
const products = [
  { id: 1, name: 'shoes', price: 200 },
  { id: 2, name: 'clothes', price: 500 },
];



module.exports.getAllProducts = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: products
  });
}