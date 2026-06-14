// setting the this keyword manually

const luftansa = {
    airline: 'Luftansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum,name){
        // console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        // push an object into bookings array
        this.bookings.push({flight:`${this.iataCode}${flightNum}, ${name}`});
    }
}


luftansa.book(14,'Kostas');
luftansa.book(315,'Marios');


console.log(luftansa.bookings);

// we are going to save into a variable the book method externally
// to be used by other objects, at first it wont work because the 
// 'this' keyword on strict mode does not work on normal functions
const book = luftansa.book;


const eurowings = {
    airline: 'Luftansa',
    iataCode: 'EUR',
    bookings: [],
    
}
// in the first argument we define the object for
//  the this keyword to point to(the object),
// the next arguments are the arguments of the 
// function it self
book.call(eurowings,300,'Kostas');
console.log(eurowings.bookings);


// ---------APPLY METH0D---------
// works the same way as call but recieves an array
// of arguments
// the array can be saved as a variable and then use the variable as an argument

const swiss = {
    airline: 'Swiss',
    iataCode: 'swiss',
    bookings: [],
    
}
book.apply(swiss,[300,'GIORKOS ALEXANDROU']);
console.log(swiss.bookings);

// BIND ALLOW US TO SET THE THIS KEYWORD
// BUT DOES NOT IMMEDIATELY CALL THE FUNCTION
// BUT IT RETURNS A NEW FUNCTION which can be saved into a var

const eurowingsfn = book.bind(eurowings);
eurowingsfn(23,'Steven Williams');
// console.log(eurowings.bookings);

// we can use bind with parameters to set them in stone

// for example a specific flight number
const EW45 = book.bind(eurowings,45);
EW45('Giakomis Krikos');
EW45('Giorkos Krikou');
console.log(eurowings.bookings);

// WITH EVENT LISTENERS
luftansa.planes=300;
luftansa.buyplane = function(){
    this.planes++
    console.log(this.planes)
};

const btn = document.querySelector('.btn');
console.log(btn);

// in an event handler function the this keyword always
// points to the dom element that the event handler is attached to object
// we will use bind method becuase it returns a function and it is 
// not calling the function like call method
btn.addEventListener('click',luftansa.buyplane.bind(luftansa));



// PARTIAL APPLICATION

const addTax = (rate,value) => value + value * rate;
console.log(addTax(0.10,200));

// preset a vat function with bind not caring about the this keyword
const addVAT = addTax.bind(null,19/100);
console.log(addVAT(200));

// rewriting the above function so it returns another function
const addTaxRate = function(rate){

    return function(value){
        return value +value * rate;
    }

}

const addVAT2 = addTaxRate(0.19);
console.log(addVAT2(200));