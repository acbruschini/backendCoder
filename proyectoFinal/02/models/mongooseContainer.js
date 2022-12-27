import mongoose from "mongoose";
//import * as model from "./schemas/products.js";
//mongoose.set("strictQuery", false);

class mongooseContainer {
  constructor(stringConn, model) {
    this.stringConn = stringConn;
    this.model = model;
  }

  #connectDb() {
    return mongoose.connect(this.stringConn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async #disconnectDb() {
    await mongoose.disconnect();
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      this.#connectDb();
      const saveModel = new this.model(object);
      return await saveModel.save();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#disconnectDb();
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      this.#connectDb();
      return await this.model.find({ _id: id });
    } catch (error) {
      console.log(error);
    } finally {
      await this.#disconnectDb();
    }
  }

  async update(id, newObject) {
    // RETURNS LIKE THIS OBJ
    /*
        {
        acknowledged: true,
        modifiedCount: 1, THIS COULD BE USEFULL
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1
        }
    */
    try {
      this.#connectDb();
      return await this.model.updateOne({ _id: id }, newObject);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#disconnectDb();
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      this.#connectDb();
      return await this.model.find();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#disconnectDb();
    }
  }

  async deleteById(id) {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      this.#connectDb();
      return await this.model.deleteOne({_id: id});
    } catch (error) {
      console.log(error);
    } finally {
      await this.#disconnectDb();
    }
  }

  async deleteAll() {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      this.#connectDb();
      return await this.model.deleteMany({});
    } catch (error) {
      console.log(error);
    } finally {
      await this.#disconnectDb();
    }
  }
}
// TEST INFO
//const URL = "mongodb://localhost:27017/ecommerce";
//const productsMongoose = new mongooseContainer(URL, model.products);

// const testObj = {
//   timestamp: Date.now(),
//   nombre: "utlimonombre",
//   descripcion: "descripcion numero ultmo",
//   codigo: "re1111",
//   foto: "http://foto1.jpg",
//   precio: 30,
//   stock: 20,
// };

/*
async function test() {
  console.log(await productsMongoose.deleteAll());
}

test();
*/
