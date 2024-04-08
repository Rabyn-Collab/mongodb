const express = require('express');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors');
const fileUpload = require('express-fileupload');


// let r = 90;

// const person = {
//   name: 'per'
// };
// person.name = r || person.name;
// console.log(person);

// const person = {
//   name: 'shyam',
//   age: 90
// };

// const m = {...person, a: 90};

// delete person['age'];




app.use(cors());

mongoose.connect('mongodb+srv://teams700:moles900@cluster0.no9horl.mongodb.net/Shops').then((res) => {
  app.listen(port, () => {
    console.log('app listening server err');
  })
}).catch((err) => {
  console.log(`${err}`);
});


// axios.get('http://www.themealdb.comjiosandlsanjdklnasdndom.php').then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });



app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true
}));


app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'Welcome',
    message: 'ecommerce app api'
  });
});



app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

app.use((req, res) => {
  return res.status(404).json({
    staus: 'error',
    message: 'url not found'
  });
});


