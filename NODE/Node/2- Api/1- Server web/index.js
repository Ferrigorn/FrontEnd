//  Requerir protocolo http

const http = require("http");

// Crear servidor web

const app = http.createServer((req, res) => {

    // configurar respuesta del servidor

    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("Bien hecho! 💋")
});

// Asignar Puerto y "escucharlo"

app.listen(8080, ()=>{
    console.log("Server listening 👂 on port http://localhost:8080")
})