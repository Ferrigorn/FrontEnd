const placesToTravel = [{id: 5, name: 'Japan'}, {id: 11, name: 'Venecia'}, {id: 23, name: 'Murcia'}, {id: 40, name: 'Santander'}, {id: 44, name: 'Filipinas'}, {id: 59, name: 'Madagascar'}]

// for (i = 0; i < placesToTravel.length; i++ ){
// console.log(placesToTravel[i])
// console.log(placesToTravel[i].id)
// console.log(placesToTravel[i].name)
// } 
let newArray = []
for (i = 0; i < placesToTravel.length; i++) {
    let currentObject = placesToTravel[i];
    let currentId = placesToTravel[i].id;

    if (currentId != 11 && currentId != 40) {
        newArray.push(currentObject);
    }
}
console.log(newArray)