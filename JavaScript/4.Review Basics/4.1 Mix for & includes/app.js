const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]

let arrayCategoria = [];

for (pelicula of movies) {
    let categoriasPeliculaActual = pelicula["categories"];

    for (categoria of categoriasPeliculaActual) {
        if (!arrayCategoria.includes(categoria)) {
            arrayCategoria.push(categoria);
        }
    }
}

console.log(arrayCategoria);