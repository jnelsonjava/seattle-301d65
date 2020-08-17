// Creating a server
// 1. touch server.js
// 1.5 touch .eslintrc.json
// 1.5 touch .env
// 2. run `npm init` (say yes to everything) (creates package.json)
// 3. GET THE SERVER RUNNING
// 4. install the packages (libraries) `npm install <PACKAGENAME> <PACKAGENAME> <ETC>`
//    on day 6- those are express and dotenv
//    dotenv : loads the environment file (".env") for us
//    express: the app itself - runs the server (http requests, responses, cookies, servery things)
//    cors: allows local testing of our server
// 5. in the js file - load the packages
// 6. configure the `app`
// 7. tell the server to listen on the port
// 8. start writing routes to handle requests from the client

// ================ Packages =======================

const express = require('express');
require('dotenv').config(); // reads the file : `.env`
const cors  = require('cors');

// ============= Global variables =====================

const PORT = process.env.PORT || 3003; // short cuircuiting and choosing PORT if it exists in the env, otherwise 3003
const app = express();
app.use(cors()); // enables the server to talk to local things

// ================ Routes =============================

// from the front end : $.ajax('http://localhost:3000/location', options)
// because my front end makes a request to the /location route, my route needs the name `/location`

app.get('/location', (request, response) =>{
  response.send({
    'id': 1,
    'search_query': 'seattle',
    'formatted_query': 'Seattle, WA, USA',
    'latitude': '47.606210',
    'longitude': '-122.332071',
    'created_at': null
  });
});


// Process for a route
// if we are given example data that works, just try sending it, if it works, you are going in the right path

app.get('/restaurants', sendRestaurantData);

function sendRestaurantData(request, response){
  response.send([
    {
      'restaurant': 'Pink Door',
      'cuisines': 'Italian',
      'locality': 'Pike Place Market'
    },
    {
      'restaurant': 'Serious Pie',
      'cuisines': 'Pizza, Italian',
      'locality': 'Belltown'
    },
    {
      'restaurant': 'Salumi',
      'cuisines': 'Sandwich, Deli, Italian',
      'locality': 'Pioneer Square'
    },
    {
      'restaurant': 'Lola',
      'cuisines': 'Greek, Mediterranean, Pacific Northwest',
      'locality': 'Hotel Andra'
    },
    {
      'restaurant': 'Wild Ginger',
      'cuisines': 'Vietnamese, Chinese, Asian',
      'locality': 'Downtown'
    },
    {
      'restaurant': 'Purple Cafe and Wine Bar',
      'cuisines': 'Pacific Northwest, American',
      'locality': 'Downtown'
    },
    {
      'restaurant': 'Le Pichet',
      'cuisines': 'Cafe, French',
      'locality': 'Pike Place Market'
    },
    {
      'restaurant': 'Cafe Campagne',
      'cuisines': 'French, Cafe',
      'locality': 'Pike Place Market'
    },
    {
      'restaurant': 'Dahlia Lounge',
      'cuisines': 'Seafood, Pacific Northwest',
      'locality': 'Belltown'
    }
  ]
  );
}

// ================ Start the server ==========================

app.listen(PORT, () => console.log(`we are running on PORT : ${PORT}`));
