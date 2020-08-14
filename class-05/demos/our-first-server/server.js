'use strict';

// Packages
const express = require('express'); // load express
require('dotenv').config(); // load dotenv and configure it
const app = express(); // makes a server for us app === server
// definition of server - something that listens for and responds to requests

// Global variables
const PORT = process.env.PORT;
let counter = 0;

app.use(express.static('./public'));

// $.get is sending a get request
// app.get is listening for a get request - one thing it listens for is $.get

// localhost:3001 visits my server
// localhost:3001/hello visits the server, then EXPRESS triggers the appropriate route's callback
// /hello is like event delegation
// pretending the server was a dom element $('server').on('visit', '/hello', callback);
app.get('/hello', (request, response) => {
  console.log('oh hey there, nice of you to talk to the server');
  response.send('hello world'); // used to send anything to the client
});

app.get('/counter', (request, response) => {
  counter++;
  response.send(`you are the ${counter} visitor`);
});

app.get('/student', (req, res) => {
  res.send({
    name : 'Marchael',
    class : '301d65'
  });
});

app.get('/animals', (req, res) => {
  res.send(['dog', 'cat', 'bird']);
});

setInterval(countUp, 333);
function countUp(){
  counter++;
}




app.listen(PORT, () => console.log(`app is up on port ${PORT}`));


// 5050 - vscode's live server
// 8080 - live server, 8081
// 3000 - servers running on your machine ( dev servers )
// 5432 - postgres lives

