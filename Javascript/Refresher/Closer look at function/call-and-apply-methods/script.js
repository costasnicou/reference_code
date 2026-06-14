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

// calling luftansa object method
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