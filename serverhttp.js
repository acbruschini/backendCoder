const objeto = [
    {
        titulo: "titulovalue",
        precio: "preciovalue",
        thumb: "thumbvalue",
        id: "34"
    }
];

objeto.forEach(element => {
    for (const [key, value] of Object.entries(element)) {
        if (key != "id") {
            console.log(`${key}: ${value}`);
        }
    }
});
