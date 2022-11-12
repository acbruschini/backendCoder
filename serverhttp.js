const http = require("http");

const server = http.createServer((request, response) => {
    response.end("Conectado");
})

const connectedServer = server.listen(2020, () => {
    console.log("Escuchando en el 2020");
})