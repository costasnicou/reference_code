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

// const movementsEl = document.querySelector('.movements');

// Display movements function
// we will pass an array of movements
const displayMovements = function(movements,sort=false){
  // empty the existing containerMovement content
  containerMovements.innerHTML ='';

  // we use slice for a shalow copy of the movements array
  const movs = sort ? movements.slice().sort((a,b)=> a-b):movements
  movs.forEach((mov,index) => {

      const type = mov > 0 ? 'deposit': 'withdrawal';
      const html = ` 
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
      // .insertAdjacentHTML accepts two strings
      // fist string is the position to attach html
      // second string is the template string
      containerMovements.insertAdjacentHTML('afterbegin',html)
  });
}


//computing usernames
const createUsernames = function(accs){

    accs.forEach(function(acc){
        const user = acc.owner;
        const username = user
        .toLowerCase()
        .split(' ')
        .map(initials => initials[0])
        .join('');
        acc.username = username;
      });
};

// we are not returning anything we just doing something to the objects inside accounts array
createUsernames(accounts);

const calcDisplayBalance = function(mov){

  const balance = mov.reduce(function(acc,cur,i,arr){
      return acc+cur;
  },0);

  labelBalance.textContent = `€${balance}`;

}

// calculating summary data
const calcDisplaySummary = function(account){

    const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc,mov)=> acc+mov,0);

    labelSumIn.textContent = incomes;

    const expenses = account.movements
    .filter(mov => mov < 0)
    .reduce((acc,mov)=> acc+mov,0);

    labelSumOut.textContent = Math.abs(expenses);

    const interest = account.movements.filter(mov=>mov>0)
    .map(deposit => deposit * account.interestRate/100)
    .filter(int => int>=1)
    .reduce((acc,int)=> acc+int,0);

    labelSumInterest.textContent = interest;


}

// Implementing Login - event handlers
let currentAccount;

// update ui is calling the data population functions
const updateUI = function(account){

 // display movements
    displayMovements(account.movements);

    // display balance
    calcDisplayBalance(account.movements);
    
    // display summary
    calcDisplaySummary(account)


}


// Event hadnlers
btnLogin.addEventListener('click',function(e){
  // prevents the form from submitting which is the default behavior
  e.preventDefault();
  currentAccount = accounts.find(acc=> acc.username === inputLoginUsername.value );

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    
    // display ui and welcome message
    labelWelcome.textContent =  `Welcome Back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

   
    updateUI(currentAccount);

  }

});


btnTransfer.addEventListener('click',function(e){
  e.preventDefault();

  // get current user movements push an expense

  const movedMoney = Number(inputTransferAmount.value);
   // get destination user movement push an income
  const destinationAccountUsername = inputTransferTo.value;
  const destinationAccount = accounts.find(acc=> acc.username === destinationAccountUsername);

  const currentAccountExistingMoney = currentAccount.movements.reduce((acc,mov)=>acc+mov,0);


  if (
    movedMoney >0 
    && currentAccountExistingMoney > movedMoney 
    && destinationAccount?.username !== currentAccount.username
  ){

    currentAccount.movements.push(-movedMoney) 
    destinationAccount.movements.push(movedMoney);
    // call update ui
    updateUI(currentAccount);
  }
  else{
    console.log("Transfered money less or equal to zero / existing current account money not enough");
  }







})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount>0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){

    currentAccount.movements.push(amount);

    // update the ui
    updateUI(currentAccount);
  }
    


});

btnClose.addEventListener('click',function(e){

    e.preventDefault();

    const inputedUsername = inputCloseUsername.value;
    const inputedPin = Number(inputClosePin.value);

    if (currentAccount.pin === inputedPin && currentAccount.username === inputedUsername){
      const indexOfAccount = accounts.findIndex( acc => acc.username === currentAccount.username )
      accounts.splice(indexOfAccount,1);

      containerApp.style.opacity = 0;
    }




});

// state of  sorting
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted = !sorted;
})


















/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// data transformations with map, filter and reduce
  // map is similar to the forEach method but it creates a brand new array
  // conversion to us dolors using map
  // does not mutate the original array
    // const eurToUsd = 1.1;
    // const usdarray = movements.map(function(mov){
    //  return mov*eurToUsd;
    // })
    // console.log(usdarray);


  // reduce method
    // boils down all elements in an array to one single value
    // const globalBalance = movements.reduce(function(accumulator,cur,index,arr){
    //     // add the current value to the accumulator
    //   return accumulator + cur;
    // },0); 
    //0 is the initial value of the accumulator
    // console.log(globalBalance);

    // Get maximum value of an array with reduce
    // const max = movements.reduce(function(acc,cur){
    //   if(acc>cur) 
    //     return acc;
    //   else
    //     return cur;
    // },movements[0])

    // console.log(max);



// sorting
// with strings
// const owners = ['Jonas','Zach','Adam','Martha'];
// // mutates the original array
// // console.log(owners.sort());

// // with numbers doesn't quite work because sort method works with strings
// console.log(movements)
// console.log(movements.sort());
// solution that works


// return < 0 A will be before B (keep order)
// return > 0 B will be before A (switch order)

// ascending sort
// movements.sort((a,b)=>{
//   // small to large numbers
//   if (a>b)
//     return 1;
//   else if(b > a)
//     return -1;
// })


// console.log(movements);

// // descending sort

// movements.sort((a,b)=>{
//   // small to large numbers
//   if (a>b)
//     return -1;
//   else if(b > a)
//     return 1;
// })
// console.log(movements);

// array grouping allow us to group values into an array based on a condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// recieves two parameters the array and a callback function
//
const groupedMovements = Object.groupBy(movements, movement =>
  // creates keys on objects
  movement >0?'deposits':'withdrawals'
);

// create an object with keys and values
// key is the deposits or withdrawals and values are the values that belong to that group
console.log(groupedMovements.deposits);
console.log(groupedMovements.withdrawals);

const groupedByActivity = Object.groupBy(accounts,acc=>{
  const movementCount = acc.movements.length

  if (movementCount >= 8) return 'very_active';
  else if (movementCount >= 4) return 'active';
  else if (movementCount >= 1) return 'moderate';
  else return 'inactive'
})

console.log(groupedByActivity);

/////////////////////////////////////////////////
