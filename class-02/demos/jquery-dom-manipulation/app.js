'use strict';

const pets = [];

function Pet (name, src, alt){
  this.name = name;
  this.src = src;
  this.altTextContent = alt;

  pets.push(this);
}

Pet.prototype.renderVanilla = function(){
  const ulElement = document.getElementById('pets');

  const newLiElement = document.createElement('li');
  const h2El = document.createElement('h2');
  h2El.textContent = this.name;
  const imgEl = document.createElement('img');
  imgEl.src = this.src;
  imgEl.alt = this.alt;
  const pEl = document.createElement('p');
  pEl.textContent = this.alt;

  newLiElement.appendChild(h2El);
  newLiElement.appendChild(imgEl);
  newLiElement.appendChild(pEl);

  ulElement.appendChild(newLiElement);
};

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

new Pet('Ginger', 'ginger.JPG', 'Ginger is chillin on the floor');
new Pet('Augustus', 'augustus.jpg', 'Dreaming');
new Pet('Gracie', 'gracie.JPG', 'Sniffin');
new Pet('Dash', 'triplets.jpg', 'dashing');
new Pet('Sly', 'triplets.jpg', 'slinking');
new Pet('Moe', 'triplets.jpg', 'mosing');

// pets.forEach(pet => {
//   pet.renderVanilla();
// });

// pets.forEach(pet => pet.renderVanilla());


pets.forEach(petValue => petValue.renderWithJquery());
