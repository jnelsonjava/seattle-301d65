'use strict';

// Packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pg = require('pg');

// Global Variables
const app = express();
const PORT = process.env.PORT || 3003;
const DATABASE_URL = process.env.DATABASE_URL;
// postgres://username:password@localhost:<PORT === 5432>/<DATABASENAME>
const iceCreams = [];

// Express configs
app.use(cors());
// client definition is anything that asks a server for anything
const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.error(error));

// Routes
app.get('/', handleHome);
app.get('/add', addIceCream);
app.get('/getFlavors', getFlavors);

// Route Callbacks

function handleHome(req, res){
  res.status(200).send('home');
}

function addIceCream(request, response){
  const flavor = request.query.flavor;
  const price = request.query.price;

  // const newFlavor = new IceCream(flavor, price);

  // client.query('INSERT INTO icecream2 (flav, price) VALUES (\'carrot\', 2)');
  // client.query('INSERT INTO icecream2 (flav, price) VALUES ($1, $2)', [flavor, price])

  const queryString = 'INSERT INTO icecream2 (flav, price) VALUES ($1, $2)';
  const valueArray = [flavor, price];
  client.query(queryString, valueArray)
    .then(() => {
      response.status(201).send('you have added new ice cream');
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('The sql insertion failed');
    });
}

function getFlavors(request, response){
  client.query('SELECT * FROM icecream2')
    .then(resultFromSql => {
      response.send(resultFromSql.rows);
    });
}

// Functions
function IceCream(flavor, price){
  this.flav = flavor;
  this.price = price;
}

// Listen
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`up on ${PORT} : woo!`));
  });
