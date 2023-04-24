import { transformarADTO_Users } from "../DTOs/userDTO.js";

export default class UsersDAOMem {
  constructor() {
    if (!UsersDAOMem.instance) {
      UsersDAOMem.instance = this;
        this.users = [];
    }
    return UsersDAOMem.instance;
  }

  #generateID() {
    return String(Date.now() + Math.floor(Math.random() * 100));
  }

  #getIndex(id) {
    return this.users.findIndex((p) => p.id == id);
  }

  getAll() {
    return transformarADTO_Users(this.users);
  }

  getById(id) {
    return transformarADTO_Users(this.users[this.#getIndex(id)]);
  }

  getByEmail(email) {
    //crear bien la logica
    return transformarADTO_Users(this.users[this.#getIndex(id)]);
  }

  save(object) {
    object.id = this.#generateID();
    this.users.push(object);
    return object;
  }

  deleteById(id) {
    const deleted = transformarADTO_Users(
      this.users.splice(this.#getIndex(id), 1)
    );
    return id;
  }

  deleteAll() {
    this.users = [];
  }

  update(id, producto) {
    const updated = { ...this.users[this.#getIndex(id)], ...producto };
    this.users.splice(this.#getIndex(id), 1, updated);
    return transformarADTO_Users(updated);
  }
}
