'use strict';

// const greet = function(greeting){
//     return function(name){
//         console.log(`${greeting} ${name}`)
//     }
// }

//if its one line of code no neet to explicity return 
const greet = greeting => name => console.log(`${greeting} ${name}`)

const greeterHey = greet('Hey');
greeterHey('Kostas');

greet('Hello')('Marios');  





// const oneWord = function(str){
//     return str.replace(/ /g,'').toLowerCase();
// }


// const upperFirstWord = function(str){
//     const [first,...others] = str.split(' ');
//     return [first.toUpperCase(),...others].join(' ');
// }

// // higher order function
// const transformer = function(str,fn){
//     console.log(`Original String ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);

//     console.log(`Trasformed by ${fn.name}`)
// }

// // calling higher order function
// transformer('Javascript is the best',upperFirstWord);
// transformer('Javascript is the best',oneWord);