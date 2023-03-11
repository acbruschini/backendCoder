import util from "util";
import { normalize, schema } from "normalizr";

const mensajes = {
  id: 'backendCoder09',
  messages: [
    {
      author: {
        email: 'bruschini@gmail.com',
        nombre: 'Ariel',
        apellido: 'Bruschini',
        edad: '41',
        alias: 'cute',
        avatar: 'http://ariel.jpg'
      },
      dateAndTime: '8/1/2023, 19:44:03',
      text: 'Primer mensaje de Ariel',
      id: 0
    },
    {
      author: {
        email: 'bruschini@gmail.com',
        nombre: 'Ariel',
        apellido: 'Bruschini',
        edad: '41',
        alias: 'cute',
        avatar: 'http://ariel.jpg'
      },
      dateAndTime: '8/1/2023, 19:44:13',
      text: '2 mensaje de Ariel',
      id: 1
    },
    {
      author: {
        email: 'bruschini@gmail.com',
        nombre: 'Ariel',
        apellido: 'Bruschini',
        edad: '41',
        alias: 'Jorge',
        avatar: 'http://jorge.jpg'
      },
      dateAndTime: '8/1/2023, 19:45:27',
      text: 'Unico mensaje de Jorge',
      id: 5
    }
  ]
}

console.log(JSON.stringify(mensajes));

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

// SCHEMAS

const authorSchema = new schema.Entity("author",{},{idAttribute: 'email'});

const messageSchema = new schema.Entity("message", {
  author: authorSchema,
});

const messagesSchema = new schema.Entity("messages", {
  messages: [messageSchema],
});

const messagesNorm = normalize(mensajes, messagesSchema);
print(messagesNorm);
