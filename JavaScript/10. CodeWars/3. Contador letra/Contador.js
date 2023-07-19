const strCount = (str, letter) => {  
    let contador = 0;
    

    for (let i = 0; i < str.length; i++) {
        if (str[i] == letter) {
           
            contador++
        }
    }
    
    return contador;
//     for (let i = 0; i < str.length; i++);
//       if (str[i] == letter) {
//         console.log(str[i])
//         contador++;
//       }
//     return contador;
  }
  


  strCount("function", 't');
  console.log(strCount("function", 't'))
  strCount("string", 'z');
  console.log(strCount("string", 'z'))