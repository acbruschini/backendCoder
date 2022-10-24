class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        libros ? this.libros = libros : this.libros = [];
        mascotas ? this.mascotas = mascotas : this.mascotas = [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    
    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        if (this.libros.length > 0) {
            return this.libros.map(libro => libro.nombre);
        }
    }

}

let usuario1 = new Usuario("Ariel","Bruschini",[{nombre: "Primer Libro", autor: "Primer Autor"}],["Gene"]);

console.log(usuario1.getFullName());
usuario1.addMascota("Paul");
console.log(usuario1.countMascotas());
usuario1.addBook("Back To The Future","Bob Gale");
usuario1.addBook("Star Wars","George Lucas");
console.log(usuario1);
console.log(usuario1.getBookNames());