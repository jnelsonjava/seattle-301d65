'use strict';

// Jquery Getters `get` information from the page

// Basic getter just uses $
// the returned element looks like an Array, but it is just an Object
// it is an array like object
// it is considered a jquery object if we are talking to each other

// the getter syntax is $('CSS-OR-CSS-LIKE-SELECTORS')
const $h1Element = $('h1');
console.log($h1Element);

const h1ElementVanilla = document.getElementById('title');
console.log('vanilla html :' , h1ElementVanilla);

let $secondListItem = $('li:nth-child(2)');
// let two = 2;
// let $two = $('.two');

console.log('second list item', $secondListItem );

let $secondListItemById = $('#pineapples');
console.log('selected with jquery `$\'#pineapples\')`', $secondListItemById);


// get the text of the h1
// .text() with no arguments, returns the text of an element
const h1Text = $('h1').text();
console.log('h1text', h1Text);

// Setters
// the jquery methods that change something
// almost all jquery methods have dual purpose they can be used to READ data or to CREATE / MODIFY data, the only difference is mainly whether arguments are provided or not

$('h1').text('We love Pizza!!!!!');


function text(message){
  const hawaiian = document.getElementById('pineapples');

  if(message){
    hawaiian.textContent = message;
  } else {
    return hawaiian.textContent;
  }
}

console.log(text());

console.log($('h1').height());
$('h1').height(100);

console.log($('p').attr('class'));

$('p').attr('class', 'orangePotato');

console.log($('p').css('color'));
$('p').css('color', 'green');




// Event listeners

const title = document.getElementById('title');
title.addEventListener('click', function(event){
  if(event.target.className !== 'orangePotato'){

    event.target.className = 'orangePotato';
  } else {
    event.target.className = 'blue';

  }
});


$('p').on('click', function(event) {
  console.log(event);
  console.log(event.target);
  console.log(this);
  console.log($(event.target));
  console.log($(this)); // $(this) is the jquery version of event.target
  $(this).text('cool');
});

$('body').on('mouseover', 'li', function(){ // add an event listener to the body that only targets list items
  console.log('moused over', $(this));
});

// if(event.target.tagName === 'img')


// arrow functions have no contextual this of their own


// arrow function to function is easy to convert

// (a,b) => { // delete arrow add function before parens
// // function (a,b)
// }

// function(a, b){ // delete function and add `=> after parens
// // (a, b) => {

// }
