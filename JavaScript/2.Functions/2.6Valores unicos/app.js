const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];
  function removeDuplicates(param) {
    let llistaBona = [];
    for (i = 0; i < param.length; i++){
      let currentElement = param[i];
      if (!llistaBona.includes(currentElement)) {
        llistaBona.push(currentElement);
      }
    }
    console.log(llistaBona)
  } 

  removeDuplicates(duplicates)