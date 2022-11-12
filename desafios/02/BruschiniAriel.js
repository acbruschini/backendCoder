const fs = require('fs');

class Contenedor {

    nextId;
    arrayObj = new Array();

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        if(fs.existsSync(nombreArchivo)) {
            this.arrayObj = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
            this.nextId = this.#getNextId();
            console.log("existe");
        } else {
            this.nextId = 0;
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.arrayObj));
            console.log("No existe");
        }
    }

    async save(object) {
        try {
            if (!this.#isInFile(object)) {
                object["id"] = this.nextId;
                this.nextId++;
                this.arrayObj.push(object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.arrayObj));
                console.log("se guardo" + object.id);
                return Promise.resolve(object.id);
            }
            else
            {
                console.log("El objeto ya existe");
            }
        }
        catch (err) {
            console.log (err);
        }
    }

    getById(id) {
        let obj = null;
        this.arrayObj.map((element) => {
            if (element.id == id)
            {
                obj = element;
            }
        })
        return obj;
    }

    #isInFile(obj) {
        let response = false;
        this.arrayObj.forEach(element => {
            if (element.title == obj.title && element.price == obj.price && element.thumbnail == obj.thumbnail) {
                response = true;
            }
        });
        return response;
    }

    #getNextId () {
        if (this.arrayObj.length > 0) {
            let maxId = this.arrayObj.reduce((acc,current) => {
                return Math.max(acc, current.id)
            }, 0)
            return maxId + 1;
        } else {
            return 0;
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo,"utf-8");
            this.arrayObj = JSON.parse(data);
            return this.arrayObj;
        }
        catch (err){
            console.log (err);
        }
    }

    async deleteById(id) {
        let flag = false;
        for( let i = 0; i < this.arrayObj.length; i++){     
            if ( this.arrayObj[i].id === id) {
                flag = true;
                this.arrayObj.splice(i, 1); 
                i--; 
            }
        }
        //console.log ("flag: " + flag)
        if (flag){
            try {
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(this.arrayObj))
                console.log("borro");
            }
            catch (err) {
                console.log(err);
            }
        } else {
            console.log ("No se borro objeto pq no existe el ID");
        }

    }

    async deleteAll() {
        this.arrayObj = [];
        try {
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(this.arrayObj))
            console.log("borro todo");
        }
        catch (err) {
            console.log(err);
        }
    }
}

let objetoAgregar = {title: "Sierra Circular", price: 123.45, thumbnail: "https://unarchivo.jpg"};
let objetoAgregar2 = {title: "Amoladora", price: 45, thumbnail: "https://unarchivo2.jpg"};
let objetoAgregar3 = {title: "Nivel", price: 1233, thumbnail: "https://unarchivo3.jpg"};
let objetoAgregar4 = {title: "Nivel Laser", price: 2123, thumbnail: "https://unarchivo3.jpg"};
let objetoAgregar5 = {title: "Martillo", price: 6123, thumbnail: "https://unarchivo3.jpg"};
let objetoAgregar6 = {title: "Sierra Caladora", price: 1323, thumbnail: "https://unarchivo3.jpg"};
let objetoAgregar7 = {title: "Lapiz Carpintero", price: 1223, thumbnail: "https://unarchivo3.jpg"};

const productosContenedor = new Contenedor("./productos.txt");

function test() {
    productosContenedor.getAll()
    // .then((array) => console.log(array))
    .then(() => productosContenedor.save(objetoAgregar))
    .then(() => productosContenedor.save(objetoAgregar2))
    .then(() => productosContenedor.save(objetoAgregar3))
    .then(() => productosContenedor.save(objetoAgregar4))
    .then(() => productosContenedor.save(objetoAgregar5))
    .then(() => productosContenedor.save(objetoAgregar6))
    .then(() => productosContenedor.save(objetoAgregar7))
    // .then(() => productosContenedor.getAll())
    .then(array => {
        console.log(array)
        console.log(productosContenedor.getById(5));
    })
    //.then(() => productosContenedor.deleteById(1))
    //.then(productosContenedor.deleteAll())
}

test();