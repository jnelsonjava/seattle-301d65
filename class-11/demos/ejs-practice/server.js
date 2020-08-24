'use strict';

//packages
const express = require('express');

// global vars
const app = express();
const PORT = process.env.PORT || 3000;

// express configs
app.set('view engine', 'ejs'); // NEW

app.get('/', (request, response) => {
  response.render('index'); // NEW // build a file FROM the views folder
  // response.render('index.ejs'); // NEW // build a file
});

const cartItemNames = ['avocados', 'mangos', 'limes', 'tortillas', 'chicken', 'beef', 'potatoes', 'sour cream'];

const cartItems = [
  { name: 'avocados', quantity: 5 },
  {name: 'mangoes', quantity: 51},
  {name: 'limes', quantity: 15},
  {name: 'tortillas', quantity: 25},
  {name: 'chicken', quantity: 52},
  { name: 'beef', quantity: 53 },
  { name: 'potatoes', quantity: 35 },
  { name: 'sour cream', quantity: 45 }

];

app.get('/cart', (req, res) => {

  res.render('shopping-cart.ejs', {
    itemsPotato : cartItemNames,
    storeName : 'Costco Wholesale Goods',
    itemObjectArray : cartItems
  });
  // the keys are just variables in the ejs file
  // second argument for render is an object
});

app.listen(PORT, () => console.log(`running the server on PORT : ${PORT}  yay`));
