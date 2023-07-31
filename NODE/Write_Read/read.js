const { error } = require("console");
const fs = require("fs");

// fs.readFile("./libros.json", (error, libros)=>{
//     if (error) {
//         console.log("Ups! Algo falla")
//     } else {
//         const parsedLibros = JSON.parse(libros);
//         console.log(parsedLibros)
//     };
// });

fs.readFile("./libros.json", (error, libros)=>{
    const libro = [];
    error ? console.log(error) : libro.push(JSON.parse(libros));

    printLibro(JSON.parse(libros))
})

const printLibro = (libro)=>{
 console.log(libro)
}

