


const numbers = [1, 2, 3, 5, 45, 37, 58];

function sumAll(numeros) {
  let sumaValors = 0;

  for (let i = 0; i < numeros.length; i++){
    sumaValors = sumaValors + numeros[i];
    
  }
  console.log(sumaValors);
}

sumAll(numbers)