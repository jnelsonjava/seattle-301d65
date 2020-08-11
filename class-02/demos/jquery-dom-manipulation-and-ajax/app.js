'use strict';

const pets = [];

function Pet (name, src, alt){
  this.name = name;
  this.src = src;
  this.altTextContent = alt;

  pets.push(this);
}

Pet.prototype.renderWithJquery = function() {
  // get a clone of a preexisting `good` html copy
  // replace the values
  // put it where you want it

  const $clonedListItemElement = $('li:first-child').clone();
  console.log($clonedListItemElement);

  $clonedListItemElement.find('h2').text(this.name);
  $clonedListItemElement.find('img').attr('src', this.src).attr('alt', this.altTextContent);
  $clonedListItemElement.find('p').text(this.altTextContent);

  $('ul').append($clonedListItemElement);
};


new Pet('Moe', 'triplets.jpg', 'mosing');


// asynchronous javascript and xml - takes a million years
// javascript does it asynchronously - it does it in the background
// $.ajax('data.json', {
//   method: 'get',
//   dataType: 'json'
// }).then(function(){
//   console.log('we did it, we got the file');
// });



// $.ajax('data.json', optionObject)
//   .then(dataPotato => {
//     console.log(dataPotato);
//   });

// reconstitutue - pass it (back) through the constructor

const handleThePetsFromTheFile = dataPotato => {
  console.log(dataPotato);
  dataPotato.forEach(lamePet => {
    new Pet (lamePet.name, lamePet.image_url, lamePet.hobbies);
  });

  pets.forEach(petValue => petValue.renderWithJquery());

};

// const optionObject = {
//   method: 'get',
//   dataType: 'json'
// };
// $.ajax('data.json', optionObject)
//   .then(handleThePetsFromTheFile);

$.get('data.json')
  .then(handleThePetsFromTheFile);





