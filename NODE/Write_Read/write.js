const fs = require('fs');


const libros = [
    {
        titulo: "Crimen y Castigo",
        autor: "Fiodor Dostoievski",
        año: 1866,
    },
    {
        titulo: "El camino de los reyes",
        autor: "Brandon Sanderson",
        año: 2010,
    },
    {
        titulo: "El Código DaVinci",
        autor: "Dan Brown",
        año: 2003,
    },
    {
        titulo: "La conjura de los necios",
        autor: "John Kennedy Toole",
        año: 1980,
    },
];

const librosToString = JSON.stringify(libros);

fs.writeFile("libros.json", librosToString, ()=>{
    console.log("libros.json creado :-p")
});