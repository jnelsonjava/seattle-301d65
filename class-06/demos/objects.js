'use strict';

const people = {
  'tif' : { name: 'Tif Taylor', superpower: 'energy'},
  krystian: {name: 'Krystian Francuz-Harris', superpower: 'mind reading'},
  chandler: {name: 'Chandler Pucket', superpower: 'fly'},
  'mike' : {name: 'Michael Wohl', superpower: 'speaking with sea creatures'}
};




// console.log(people);

// Object iteration
// goal: iterate over the keys, the values, and the key value pairs as if an object were an array

// keys

for(let potatoKey in people){
  console.log(potatoKey);
}

const falseArray = {
  0: 9,
  1: 10,
  2: 13
};

const realArray = [9, 10, 13];

for(let i in falseArray){
  console.log(i);
}

for(let i in realArray){
  console.log(i);
}

console.log(Object.keys(people));
// Object.keys returns an array of the keys passed to it

console.log(Object.keys(people).sort());

console.log(Object.keys(people).join(' is friends with  '));

// Iterating over the values

for(let valuePotato of realArray){
  // console.log(valuePotato);
}

// Object.values returns a list of the values in the object
console.log(Object.values(people));


const listeningOnPort = true;
while(listeningOnPort === true){

}
