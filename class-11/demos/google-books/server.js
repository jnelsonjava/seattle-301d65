'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();

app.get('/', (req, res) => {

  superagent.get('https://www.googleapis.com/books/v1/volumes?q=+intitle:dune')
  // superagent.get('https://www.googleapis.com/books/v1/volumes?q=+inauthor:frank herbert')
    .then(result => {
      console.log(result.body);
      res.send(result.body);
    });
});

app.listen(3000);
