const express = require('express');
const app = express();

const products = require('./routers/products');



app.listen(3000, () => {
  console.log('Server started on port 3000');
});