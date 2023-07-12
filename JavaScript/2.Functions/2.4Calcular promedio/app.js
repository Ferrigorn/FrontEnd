
const numbers = [12, 21, 38, 5, 45, 37, 6];

function sumAll(numeros) {
    let sumaValors = 0;
  
    for (let i = 0; i < numeros.length; i++){
      sumaValors = sumaValors + numeros[i];
      
    }
    return sumaValors;
  }


function average(param) {
  let suma = sumAll(param);
  let media = suma / param.length;

  return media;
}

console.log(average(numbers))