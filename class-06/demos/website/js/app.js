'use strict';

// 1. ask for a location
// 2. server gives us a location //TODO:
// 3. use coordinates to render the map
// 4. send the coordinates to the server asking for restaurants (arouond the coordinates)
// 5. receive restaurants // TODO:
// 6. and render them

$('form').on('submit', function(event){
  event.preventDefault();
  const cityValueJQDirect = $('input:nth-child(2)').val();
  console.log('cityValueJQ', cityValueJQDirect);

  // $.get('fake-data/location.json')
  //   .then(dataFromTheFile => {
  //     console.log(dataFromTheFile);
  //   });

  const options = {
    method : 'get',
    dataType : 'json',
    data : { city : cityValueJQDirect}
  };
  // $.ajax('fake-data/location.json', options)
  $.ajax('http://localhost:3000/location', options)
    .then(dataFromTheFile => {
      console.log(dataFromTheFile);
      const lat = dataFromTheFile.latitude;
      const lng = dataFromTheFile.longitude;

      // const mapSrc = 'images/maplat=' + lat +'&lng=' + lng +'.png';
      // const mapSrcLiteral = `images/maplat=${lat}&lng=${lng}.png`;
      // map?lat=47.606210&lng=-122.332071.png
      $('img').attr('src', 'images/map.png');


      const restaurantOptions = {
        method: 'get',
        dataType : 'json',
        data : dataFromTheFile
      };

      $.ajax('http://localhost:3000/restaurants', restaurantOptions)
        .then(renderRests);

    });


});


function renderRests(restData){
  restData.forEach(restaurant => {
    $('main').append(Mustache.render( $('#template').html(), restaurant));
  });
}
