const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}

for (let clave in alien){

    console.log(`Alien ${clave} ---> ${alien[clave]}`);
}
