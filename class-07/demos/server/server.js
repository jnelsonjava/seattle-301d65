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
const superagent = require('superagent');

// ============= Global variables =====================

const PORT = process.env.PORT || 3003; // short cuircuiting and choosing PORT if it exists in the env, otherwise 3003
const app = express();
app.use(cors()); // enables the server to talk to local things

// ================ Routes =============================

app.get('/location', (request, response) =>{

  // The `request` parameter for our endpoint's callback contains information from the front end
  // `request.query` contains all query info in server
  // console.log('request.query: ', request.query);
  // console.log('request.query.city: ', request.query.city);

  const thingToSearchFor = request.query.city;
  const urlToSearch = `https://us1.locationiq.com/v1/search.php?key=81856beb786a51&q=${thingToSearchFor}&format=json`;

  superagent.get(urlToSearch)
    .then(whateverComesBack => {
      // throw new Error('stuff is broke y\'all'); // if this error is thrown, it bumps to the .catch
      const superagentResultArray = whateverComesBack.body;
      const constructedLocation = new Location(superagentResultArray);
      response.send(constructedLocation);
      console.log('this is being sent from /location to client :', constructedLocation);
    })
    .catch(error => {
      console.log(error);
      response.status(500).send(error.message);
    });

});


// Process for a route
// if we are given example data that works, just try sending it, if it works, you are going in the right path

app.get('/restaurants', sendRestaurantData);

function sendRestaurantData(request, response){

  // I find my data in request.query

  console.log('restaurant req.query : ', request.query);

  const urlToSearch = `https://developers.zomato.com/api/v2.1/geocode?lat=${request.query.latitude}&lon=${request.query.longitude}`;

  superagent.get(urlToSearch)
    .set('user-key', '7613659076c2f8dd68681a20851120c0')
    .then(resultFromZomato => {
      // console.log(resultFromZomato.body);
      // const jsonObj = require('./data/restaurants.json');
      const jsonObj = resultFromZomato.body;
      const arrFromJson = jsonObj.nearby_restaurants;
      const newArr = [];

      arrFromJson.forEach(objInTheJSON => {
        const newRest = new Restaurant(objInTheJSON);
        newArr.push(newRest);
      });
      // for each obj in the json file, make a constructed obj and put it in arr
      // send arr
      response.send(newArr);

    });


}

// =================== All other functions ===================

function Location(jsonObject){
  this.formatted_query = jsonObject[0].display_name;
  this.latitude = jsonObject[0].lat;
  this.longitude = jsonObject[0].lon;

}

function Restaurant(jsonObject){
  this.restaurant = jsonObject.restaurant.name;
  this.cuisines= jsonObject.restaurant.cuisines;
  this.locality = jsonObject.restaurant.location.locality_verbose;
}

// ================ Start the server ==========================

app.listen(PORT, () => console.log(`we are running on PORT : ${PORT}`));
