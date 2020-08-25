'use strict';

// A promise is what controls the things that take a million years in the background
// they declare functionality and when it should happen
// "go ahead and do your thing, but when your done THEN please do this next thing"

const longTask = taskName => new Promise((resolve, reject) => {
  const timer = Math.floor(Math.random() * 5);
  setTimeout( () => {
    if(taskName) {
      resolve(`Task : ${taskName} took ${timer} milliseconds`);
    } else {
      reject('BAD you need to give this a name');
    }
  }, timer);
});

const resultOfTask = longTask('Walk the dog');
console.log(resultOfTask);

longTask('swim the cat').then( resultOFSwimmingTheCat => {
  console.log(resultOFSwimmingTheCat);
});

// Running many async promises together
// longTask('task one').then(message => console.log(message));
// longTask('task two').then(message => console.log(message));
// longTask('task three').then(message => console.log(message));
// longTask('task four').then(message => console.log(message));


// Running async things in order

// longTask('in order one').then(message => {
//   console.log(message);
//   longTask('in order two').then(message => {
//     console.log(message);
//     longTask('in order three').then(message => {
//       console.log(message);
//       longTask('in order four').then(message => console.log(message));
//     });
//   });
// });

// chaining the return values of a .then
var startingInOrder = Date.now();
console.log(startingInOrder);
longTask('In order chained one')
  .then(message => { console.log(message); return longTask('In order chained two'); })
  .then(message => {console.log(message); return longTask('In order chained three');})
  .then(message => {console.log(message); return longTask('In order chained four');})
  .then(message => {console.log(message); return longTask('In order chained five');})
  .then(message => {console.log(message); return longTask('In order chained six');})
  .then(message => {console.log(message); return longTask('In order chained seven');})
  .then(message => { console.log(message); console.log(`in order took  ${Date.now() - startingInOrder} ms`);});

// run promises all at once, but wait til every single one finishes

const startingAnArrayOfThings = Date.now();
const promiseArray = [];
for(let i = 0; i < 100; i++){
  promiseArray.push(longTask('same time ' + i));
}
Promise.all(promiseArray)
  .then(() => console.log(`we finished all the things, it took ${Date.now() - startingAnArrayOfThings}ms`));


let counter = 1;
let target = 1010;

function callback(message){
  console.log(message);
  if(counter < target){
    longTask(counter++)
      .then(callback);
  }
}

longTask(counter)
  .then(callback);





