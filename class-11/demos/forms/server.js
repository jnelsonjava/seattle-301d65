'use strict';
// serve a file with forms, have the forms talk to the server

//packages
const express = require('express');

// global variables
const app = express();
const PORT = process.env.PORT || 3001; // dotenv the package loads the file `.env`

// configuring express
app.use(express.static('./public'));
// express.static('./public') tells express to open one folder as publicly available static files (on the / get route)
app.use(express.urlencoded({extended: true}));

// routes // app.get(/talk-to-nich) => I live at /talk-to-nich AND I accept GET method requests
app.get('/talk-to-nich', (req, res) => {
  console.log(req.query);
  // res.send('thanks for sending me a message');
  res.sendFile('./thanks.html', { root: './public' });
});

// app.post is exactly like an app.get except it only allows post methods
app.post('/login', (request, response) => {
  console.log('anything');
  console.log('req.query', request.query);
  console.log('req.body', request.body);
  // console.log('req', request);
  response.sendFile('./thanks.html', {root: './public'});
});

// start the app
app.listen(PORT, () => console.log(`app is running on port : ${PORT} yay`));
