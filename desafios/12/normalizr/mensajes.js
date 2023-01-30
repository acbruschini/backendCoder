import util from "util";
import { normalize, schema } from "normalizr";

//const mensajesCont = new Contenedor("mensajes.txt");
// const mensajes = {
//   id: "backendCoder09",
//   messages: [
//     {
//       author: {
//         email: "bruschini@gmail.com",
//         nombre: "Ariel",
//         apellido: "Bruschini",
//         edad: "41",
//         alias: "cute3",
//         avatar: "http://ariel.jpg",
//       },
//       dateAndTime: "7/1/2023, 17:41:36",
//       text: "Este es el primer mensaje de Ariel",
//       id: 0,
//     },
//     {
//       author: {
//         email: "bruschini@gmail.com",
//         nombre: "Ariel",
//         apellido: "Bruschini",
//         edad: "41",
//         alias: "cute",
//         avatar: "http://ariel.jpg",
//       },
//       dateAndTime: "8/1/2023, 17:00:11",
//       text: "Este es el mensjae 2 de Ariel",
//       id: 1,
//     },
//     {
//       author: {
//         email: "anabel@gmail.com",
//         nombre: "Anabel",
//         apellido: "Bruschini",
//         edad: "43",
//         alias: "fsdfsd",
//         avatar: "http://ariel.jpg",
//       },
//       dateAndTime: "8/1/2023, 17:00:46",
//       text: "Primer mensaje de Anabel",
//       id: 2,
//     },
//     {
//       author: {
//         email: "anabel@gmail.com",
//         nombre: "Anabel",
//         apellido: "Bruschini",
//         edad: "43",
//         alias: "fsdfsd",
//         avatar: "http://ariel.jpg",
//       },
//       dateAndTime: "8/1/2023, 17:01:07",
//       text: "segundo mensaje de Anabel",
//       id: 3,
//     },
//     {
//       author: {
//         email: "anabel@gmail.com",
//         nombre: "Anabel",
//         apellido: "Bruschini",
//         edad: "43",
//         alias: "fsdfsd",
//         avatar: "http://ariel.jpg",
//       },
//       dateAndTime: "8/1/2023, 17:01:11",
//       text: "tercer mensaje de Anabel",
//       id: 4,
//     },
//   ],
// };

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
