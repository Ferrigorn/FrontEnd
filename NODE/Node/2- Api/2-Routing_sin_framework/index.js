// Requerir protocolo http
const http = require("http");

// Crear el servidor

const requestHandler = (req, res) => {
    console.log("Yujuu", req.url)

    if (req.url === "/welcome") res.end("<h1>Bienvenido!</h1>");
    if (req.url === "/close") res.end("<h1>¿Ya te vas? </h1>");
    if (req.url === "/users" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify({ welcome: "buenaas", close: "adios"}));
    }
    res.end("<h1>Quedate bonic@ </h1>");
}

const app = http.createServer(requestHandler);

// Asignar Puerto y "escuchar"

app.listen(8080, ()=> {
    console.log("Nuestro server nos escucha en el puerto http://localhost:8080");
});