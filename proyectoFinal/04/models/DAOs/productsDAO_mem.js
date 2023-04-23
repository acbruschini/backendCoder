import { transformarADTO } from "../DTOs/productDTO.js";

export default class ProductsDAOMem {
    constructor() {
        if (!ProductsDAOMem.instance) {
            ProductsDAOMem.instance = this;
            this.productos = []
        }
        return ProductsDAOMem.instance;
      }

    #generateID() {
        return String(Date.now() + Math.floor(Math.random() * 100));
    }

    #getIndex(id) {
        return this.productos.findIndex(p => p.id == id);
    }

    getAll() {
        return transformarADTO(this.productos);
    }

    getById(id) {
        return transformarADTO(this.productos[this.#getIndex(id)]);
    }

    save(object) {
        object.id = this.#generateID();
        this.productos.push(object)
        return object
    }

    deleteById(id) {
        const deleted = transformarADTO(this.productos.splice(this.#getIndex(id), 1));
        console.log(deleted);
        return id
    }

    deleteAll() {
        this.productos = [];
    }

    update(id, producto) {
        const updated = {...this.productos[this.#getIndex(id)],...producto};
        this.productos.splice(this.#getIndex(id), 1, updated)
        return transformarADTO(updated);
    }
}