// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// §
// Data car 1: 'Ford' going at 120 km/h

class CarCl{
    constructor(make,speed){
        this.make=make;
        this.speed=speed;
    }

    accelerate(){
        this.speed += 10;
        console.log(`Accelerating by ${this.speed}KM/H`);
    }

    break(){
        this.speed -= 5;
        console.log(`Breaking by ${this.speed}KM/H`);
    }


    get speedUs(){
    //    this.speed = this.speed / 1.6;
       return this.speed / 1.6;
       // console.log(`SpeedUS: ${this.speed}`)
        
    }

   

    set speedUs(speed){
        this.speed = speed * 1.6;
    }

    // get ConvertedtoKm(){
    
    //    this.speed *= 1.6;
    //     return this.speed;
    // }
}

car1 = new CarCl('Ford',120);
car1.accelerate();
car1.break();
console.log(`Getter SpeedUs: ${car1.speedUs} mi/h`);
car1.speedUs=200;
console.log(car1.speed);
// console.log(`SPEED after setter: ${car1.ConvertedtoKm} km/h`)
// console.log(`Converted to KM ${car1.ConvertedtoKm} KM/H`);

