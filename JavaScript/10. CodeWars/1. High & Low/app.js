const highAndLow = "1 2 3 4 5";  // return "5 1"

const newHighAndLow = (number) => { 
    const newNumber = number.split(" ") ;
    console.log(newNumber) 
    const maxNumber = Math.max(...newNumber);
    const minNumber = Math.min(...newNumber);
    return (`${maxNumber} ${minNumber}`)
} ;

console.log(newHighAndLow(highAndLow));

const highAndLow2 = "1 2 -3 4 5"; // return "5 -3"

console.log(newHighAndLow(highAndLow2));

const highAndLow3 = "1 9 3 4 -5"; // return "9 -5"

console.log(newHighAndLow(highAndLow3));

