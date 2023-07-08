


const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
function findLongestWord(listOfStrings) {
  
  let longestWord = "";
  let longestLength = 0;
  
  for (let i = 0; i < listOfStrings.length; i++) {

    if(listOfStrings[i].length > longestLength){
      longestWord = listOfStrings[i]
      longestLength = listOfStrings[i].length
    }
    
  }
  console.log(longestWord);
}

findLongestWord(avengers);



