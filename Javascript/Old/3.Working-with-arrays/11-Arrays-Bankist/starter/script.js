'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;


// get account movements into a function
const displayMovements = function(movements,sort=false){
  containerMovements.innerHTML = '';

  // we use slice because we want a shallow copy of the array
  const movs = sort ? movements.slice().sort((a,b)=>a-b) : movements;

  movs.forEach(function(movement,i){
    // console.log(movement);
    
    const type = movement > 0 ? 'deposit' : 'withdrawal'; 
    const movementHtml = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div> 
    `;

    containerMovements.insertAdjacentHTML("afterbegin",movementHtml);
    
  });
};

const createUsernames = function(user){
 

  const username = user.toLowerCase().split(' ').map(name => name.at(0)).join('')
  // username
  return username;
}
// loop over accounts array of objects and create a new property username
for (let acc of accounts){
  acc.username = createUsernames(acc.owner);
}
// console.log(accounts);


const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov=> mov > 0)
  .reduce((acc,curr)=> acc+curr,0)

  labelSumIn.innerText = incomes + '€';

  const expenses = acc.movements.filter(mov=> mov<0)
  .reduce((acc,cur)=>acc+cur,0);

  labelSumOut.innerText = Math.abs(expenses) + '€';

  const interest = acc.movements.filter((mov,i,arr) => 
    {
      
      return mov >0;

    })
  .map(deposit => deposit * acc.interestRate/100)
  .reduce((acc,int)=>acc+int,0);

  labelSumInterest.textContent= `${interest}€`;


}

const displayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,cur)=> acc+cur,0); 
 
  labelBalance.innerText = acc.balance + ' €';
};

const updateUI = function(acc){
   // display movements  
   displayMovements(acc.movements);
   // display balance
   displayBalance(acc);
   // display summary
   calcDisplaySummary(acc);
}

// event listeners
btnLogin.addEventListener('click',function(e){
  // prevents form from submitting the default refresh page functionality
  e.preventDefault();
  currentAccount =  accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)  ){
    // display ui and welcome message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginPin.value= inputLoginUsername.value="";
    inputLoginPin.blur();
    updateUI(currentAccount);

  }
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc=>acc.username===inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';
  // recieverAccount.movements.push(-amount)
  if (amount > 0 && currentAccount.balance >= amount &&  recieverAccount && recieverAccount?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    updateUI(currentAccount);
    
  }




});

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(
    Number(inputClosePin.value) === currentAccount.pin 
    && inputCloseUsername.value === currentAccount.username 
  ){
    inputClosePin.value = inputCloseUsername.value ='';
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index,1);
    
    containerApp.style.opacity = 0;
   
  }

});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)
  


  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
});















// <div class="movements__date">3 days ago</div>


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





// let arr = ['a','b','c','d','e'];
// // -----SLICE METHOD--------------------------
// // slice method does not mutate the initial arr
// // slice the arry from the position 2
// console.log(arr.slice(2));
// // the end parameter is not included
// console.log(arr.slice(2,4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// // can be used to make a shallow copy of an arrary

// let arr2 = arr.slice()
// console.log('Array 2',arr2)
// // same as
// const movements = [200,450,-400,3000,-650,-130,70,1300];
// // // first parameter is the accumulator like a snowball
// const balance = movements.reduce(function(accumulator,cur,i,arr){
//   return accumulator + cur
// },0)

// // using arrow function
// const balance = movements.reduce((acc,cur)=> acc+cur,0)

// console.log(balance);
// //  arr3 = [...arr];

// // -----SPLICE METHOD--------------------------
// // will output the same result as .slice(2) but will remove the elements that are output
// // mutates the original array
// // console.log(arr.splice(2));
// // removes the last element from the array
// // arr.splice(-1);
// // start at position one remove 2 elements
// arr.splice(1,2)
// console.log(arr);

// // -----REVERSE METHOD--------------------------
// const reversedArray = ['d','c','b','a'];
// // mutates the original array
// reversedArray.reverse();
// console.log(reversedArray);

// // -----CONCAT METHOD--------------------------
// arr2 = ['e','f','g'];
// const letters = reversedArray.concat(arr2)
// console.log(letters);


// // -----JOIN METHOD--------------------------
// console.log(letters.join('-'));
// // -----at METHOD--------------------------

// const arrae = [23,11,64];
// console.log(arrae.at(2));
// // last element of ther array
// console.log(arrae.at(-1));
// console.log('kostas'.at(0));
// console.log('kostas'.at(-1));


// // -----forEach METHOD ON ARRAYS--------------------------
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function(movement,index,array){
//   if(movement>0) console.log(`Movement ${index+1}: You deposited ${movement} amount of money`);
//   else console.log(`Movement ${index+1}: You withdrew ${Math.abs(movement)} amount of money`);
//   console.log(array)
// });

// // // -----forEach METHOD with maps and sets--------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// // // using MAP
// // const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function(value,key,map){
//   console.log(`Value: ${value}, Key: ${key}`);
// })

// // USING SET

// SET is used to store unique values
const currenciesUnique = new Set(['USD','GBP','USD','EUR']);
// console.log(currenciesUnique);
currenciesUnique.forEach(function(value, _, set){
  console.log(value);
  console.log(set);
})





// movements// const movements = [200,450,-400,3000,-650,-130,70,1300];
// // first parameter is the accumulator like a snowball
// // const balance = movements.reduce(function(accumulator,cur,i,arr){
// //   return accumulator + cur
// // },0)

// // using arrow function
// const balance = movements.reduce((acc,cur)=> acc+cur,0)

// console.log(balance);100
// // // 
// nt > 0) ? console.log(`${i}: You deposited ${movement}`):console.log(`${i}: You withdrew ${Math.abs(movement)}`);
// // });




// -----------THE MAP METHOD-------------------
// map method will give us a brand new array
// const movements = [200,450,-400,3000,-650,-130,70,1300];

// const eurToUsd = 1.1;100
// // console.log(movementsUsd);

// // using arrow function for map
// // const movementsUsdArrow = movements.map(mov => mov * eurToUsd );
// // console.log(movements);
// // console.log(movementsUsdArrow);
// const moveDesc = movements.map( (mov,i)=>{

//   // if its positive if its negative
//   return `Movement ${i+1}: You ${mov>0?'deposited':'withdrew'} ${Math.abs(mov)} money from the account`

// });
// 100
// console.log(fir)drawls = movements.filter(function(mov){
//   // all withdrawls that above zero
//   return mov < 0;

// });const movements = [200,450,-400,3000,-650,-130,70,1300];
// // first parameter is the accumulator like a snowball
// // const balance = movements.reduce(function(accumulator,cur,i,arr){
// //   return accumulator + cur
// // },0)

// // using arrow function
// const balance = movements.reduce((acc,cur)=> acc+cur,0)

// console.log(balance);
// // og(withdrawls);
// ---------END--THE FILTER METHOD-------------------

// -----------THE REDUCE METHOD-------------------
// reducconsole.log(movements);
// console.log(fir)drawls = movements.filter(function(mov){)

// // using arrow function
// const balance = movements.reduce((acc,cur)=> acc+cur,0)

// console.log(balance);

// // ---------END--THE REDUCE METHOD-------------------



// ----------THE FIND METHOD-------------------
// const movements = [200,450,-400,3000,-650,-130,70,1300];
// // accepts a callback function 
// // to retrieve an element of the array based on a condition
// // retrieves the first element of the array that sattisfies the condition
// const firstwithdrawl = movements.find(mov=> mov <0)
// console.log(movements);
// console.log(firstwithdrawl);
// const account = accounts.find(acc => acc.owner==="Jessica Davis");
// console.log(account);




// includes
// const movements = [200,450  inputLoanAmount.value = '';mov => mov > 1000));

// every
// if every element in the array sattisfies a condition it returns true
// const movements = [200,450,-400,3000,-650,-130,70,1300];
// console.log(account4.movements.every(mov=>mov>0));



// writing the callback function separately
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));


// FLAT AND FLATMAP

// const arr = [[1,2,[8,9]],[3,4],5,6]
// // using depth for level of nesting
// console.log(arr.flat(2));

// using flat on map
// const overallBalance=accounts.map(mov=>mov.movements).flat().reduce((acc,mov)=>acc+mov,0);
// console.log(overallBalance);

// using flatmap
// const overallBalance2=accounts.flatMap(mov=>mov.movements).reduce((acc,mov)=>acc+mov,0);
// console.log(overallBalance2);

// sorting
// const owners =['kostas','marios','giorkos','marinos'];
// // mutates the original array
// console.log(owners.sort());
// console.log(owners);

// sort method sorts strings by default
// const movements = [200,450,-400,3000,-650,-130,70,1300];
// // console.log(movements.sort());

// // return < 0, A,B (keep order)
// // return > 0 B,A (switch order)
// // sorting in ascending order
// // movements.sort((a,b)=>{
// //   if(a>b) return 1;
// //   if (b>a) return -1;
// // })
// movements.sort((a,b)=>a-b)
// console.log(movements);


// // sorting in descending oreder
// // movements.sort((a,b)=>{
// //   if(a>b) return -1;
// //   if (b>a) return 1;
// // })
// movements.sort((a,b)=>b-a);
// console.log(movements);



// FILLING ARRAYS PROGRAMATICALLY 
// creates an array with 7 empty elements
// const x = new Array(7);
// console.log(x);

// // mutates the array

// // specifing the value to fill in the start parameter
// // and the end parameter which is not going to 
// // be included
// x.fill(1,3,5)
// console.log(x);

// const y = Array.from({length:7},()=> 1);y
// console.log("----Array FROM method----");
// console.log(y);

// // imagine you are calling the callback function  
// // in an empty array
// //  _ through away parameter 
// const z = Array.from({length:7},(_,i)=>i+1);
// console.log(z);
// labelBalance.addEventListener('click',function(){
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'),el=>Number(el.textContent.replace('€','')));
//   console.log(movementsUI.filter(mov=>mov<0));
// });




/////////////////////////////////////////////////

