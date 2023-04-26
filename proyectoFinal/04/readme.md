Ecommerce-Api
=============
Esta API comercio electrónico es un conjunto de endpoints que permiten a los desarrolladores interactuar y consumir datos de un relacionados a comercio electrónico. Proporciona acceso a la información de los productos, a las órdenes, usuarios, y carritos de compra.

Endpoints
-------------
Rutas de consumo de datos agrupados por Tipos.

### Productos ####

###### Rutas Disponibles
-------------

- ###### GET /api/productos

La ruta `/productos` devuelve una lista de todos los productos disponibles en la tienda en línea. Esta ruta utiliza el método `GET` y es manejada por el controlador `getProducts` definido en `Controllers.js`.

Ejemplo de devolucion.
```json
[
  {
    "id": "644531f4df0335197fe4ff48",
    "timestamp": "1682256372678",
    "nombre": "Remera Iron Man",
    "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
    "codigo": "sku225",
    "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
    "precio": 5500,
    "stock": 20
  },
]
```
- ###### GET /api/productos/:id

La ruta `/productos/:id` devuelve la información del producto específico identificado por el parámetro `id`. Esta ruta utiliza el método `GET` y es manejada por el controlador `getProductById` definido en `Controllers.js`.

Ejemplo de devolución.
```json
[
  {
    "id": "644531f4df0335197fe4ff48",
    "timestamp": "1682256372678",
    "nombre": "Remera Iron Man",
    "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
    "codigo": "sku225",
    "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
    "precio": 5500,
    "stock": 20
  },
]
```
Además, esta ruta hace uso de la función middleware `validMongoId` para asegurarse de que el valor de `id` proporcionado en la URL sea un string válido de MongoDB (En el caso que su persistencia configurada sea en MongoDB).

- ###### POST /api/productos

La ruta `/productos` permite la creación de nuevos productos en la tienda en línea. Esta ruta utiliza el método `POST` y es manejada por el controlador `postProduct` definido en `Controllers.js`.

El cuerpo de la solicitud debe contener los detalles del producto que se está agregando, siguiendo el siguiente esquema.

Ejemplo de Json en Body.
```json
{
  "nombre":"Remera Iron Man",
  "descripcion":"Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
  "codigo":"sku225",
  "foto":"https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
  "precio":5500,
  "stock":20
}
```
Ejemplo de devolución.
```json
{
  "status": "ok",
  "newProductId": "6449335119a8b45fa5ce35dd"
}
```

- ###### DELETE /api/productos/:id

La ruta `/productos/:id` permite la eliminación de un producto específico identificado por el parámetro `id`. Esta ruta utiliza el método `DELETE` y es manejada por el controlador `deleteProduct` definido en `Controllers.js`.

Ejemplo de devolución.
```json
{
  "deletedId": "64453226df0335197fe4ff4d"
}
```

Además, esta ruta hace uso de la función middleware `validMongoId` para asegurarse de que el valor de `id` proporcionado en la URL sea un string válido de MongoDB (En el caso que su persistencia configurada sea en MongoDB).

- ###### PUT /api/productos/:id

La ruta `/productos/:id` permite la actualización de los detalles de un producto específico identificado por el parámetro `id`. Esta ruta utiliza el método `PUT` y es manejada por el controlador `updateProduct` definido en `Controllers.js`.
Debe enviarse en el body un objeto solo con los atributos que desea cambiarse/agregarse.

Ejemplo de Json en Body.
```json
{
  "codigo":"sku256",
  "stock":50
}
```
Ejemplo de devolución.
```json
{
  "id": "6449335119a8b45fa5ce35dd",
  "timestamp": "1682518865854",
  "nombre": "Remera Iron Man",
  "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
  "codigo": "sku225",
  "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
  "precio": 5500,
  "stock": 50
}
```

Además, esta ruta hace uso de la función middleware `validMongoId` para asegurarse de que el valor de `id` proporcionado en la URL sea un ObjectId válido de MongoDB.

-------------

-------------
### Usuarios ####

###### Rutas Disponibles
-------------

- ###### POST /api/usuario/login

La ruta `/usuario/login` permite a los usuarios iniciar sesión en la plataforma de comercio electrónico. Esta ruta utiliza el método `POST` y es manejada por el controlador `login` definido en `Controllers.js`.

El cuerpo de la solicitud debe contener las credenciales del usuario (email de usuario y contraseña) para poder iniciar sesión. Si las credenciales son válidas, la ruta devuelve el User ID y un token de autenticación que debe ser incluido en las solicitudes subsiguientes en el encabezado en un key value Authorization: Token.

Ejemplo de Json en Body.
```json
{
  "email": "tonystark@starkindustries.com",
  "password": "potts"
}
```
Ejemplo de devolución.
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY2MGU0YmUwMTIyN2Q1NDM2MjlkZCIsImlhdCI6MTY4MjUxOTc1NCwiZXhwIjoxNjgyNTIxNTU0fQ.isDCT0EQjILyB33GkthH3kAfv9xfwBn8vXdE8uQnadI",
  "userId": "644660e4be01227d543629dd"
}
```

- ###### POST /api/usuario/register

La ruta `/usuario/register` permite a los usuarios registrarse en la plataforma de comercio electrónico. Esta ruta utiliza el método `POST` y es manejada por el controlador `register` definido en `Controllers.js`.

El cuerpo de la solicitud debe contener la información necesaria para crear una cuenta de usuario (ver ejemplo). Si la información es válida, la ruta crea una nueva cuenta de usuario, genera un nuevo carrito de compras y asigna su ID al usuario recien creado.

Ejemplo de Json en Body.
```json
{
  "email": "brucebanner@virginiauniversitylab.com",
  "nombre": "Bruce Banner",
  "direccion": "2715 N Vermont Canyon Rd, Los Angeles, CA 90027, USA.",
  "edad": 41,
  "telefono": "+541137920000",
  "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Mark_Ruffalo_%2836243137665%29_%28cropped%29.jpg/190px-Mark_Ruffalo_%2836243137665%29_%28cropped%29.jpg",
  "password": "brucedontlikeradiation"
}
```
Ejemplo de devolución.
```json
{
  "id": "6449383b19a8b45fa5ce35ee",
  "timestamp": "1682520123988",
  "email": "brucebanner@virginiauniversitylab.com",
  "nombre": "Bruce Banner",
  "direccion": "2715 N Vermont Canyon Rd, Los Angeles, CA 90027, USA.",
  "edad": 41,
  "telefono": "+541137920000",
  "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Mark_Ruffalo_%2836243137665%29_%28cropped%29.jpg/190px-Mark_Ruffalo_%2836243137665%29_%28cropped%29.jpg",
  "carritoId": "6449383b19a8b45fa5ce35ec",
  "hash": "c688e47ad231147745303d32eecbaf1ff2a1f25bcfb4399dc3fce98852bff4a5ad1fdc27bd7f11bed40c05913f23e213acb97f6441213e2f067b9484e64ea6dc",
  "salt": "914259bba6dd8ce65143b7cc90e9300d0e14c69ad3fc10830fe542b6f068cde8"
}
```

- ###### GET /api/usuario/

La ruta `/usuario/` devuelve una lista de todos los usuarios registrados en la plataforma de comercio electrónico. Esta ruta utiliza el método `GET` y es manejada por el controlador `getUsers` definido en `Controllers.js`.

> <span style="color:red;">Esta ruta esta creada con el fin educativo de poder controlar los usuarios, y no existiria en una api real, o seria solo accesible por un token de administrador.</span>

-------------

-------------
### Carritos ####

###### Rutas Disponibles
> Se requiere un token de autenticación válido para acceder a todas las rutas de Carritos. 

-------------

- ###### GET /api/carrito/

La ruta `/carrito/` devuelve una lista de todos los carritos creados por los usuarios. Esta ruta utiliza el método `GET` y es manejada por el controlador `getCarts` definido en `Controllers.js`.

Ejemplo de devolución.
```json
[
   {
    "id": "6449375d19a8b45fa5ce35e7",
    "timestamp": "1682519901432",
    "productos": [
					{
			  "id": "6449335119a8b45fa5ce35dd",
			  "timestamp": "1682518865854",
			  "nombre": "Remera Iron Man",
			  "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
			  "codigo": "sku225",
			  "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
			  "precio": 5500,
			  "stock": 50
			}
		]
  },
  {
    "id": "6449383b19a8b45fa5ce35ec",
    "timestamp": "1682520123939",
    "productos": []
  }
]
```
- ###### GET /api/carrito/:id/productos

La ruta `/carrito/:id/productos` devuelve una lista de todos los productos en un carrito especificado por su `id`. Esta ruta utiliza el método `GET` y es manejada por el controlador `getProductsInCart` definido en `Controllers.js`.

Ejemplo de devolución.
```json
[
	{
	  "id": "6449335119a8b45fa5ce35dd",
	  "timestamp": "1682518865854",
	  "nombre": "Remera Iron Man",
	  "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
	  "codigo": "sku225",
	  "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
	  "precio": 5500,
	  "stock": 50
	}
]
```
- ###### POST /api/carrito/:id/productos/:id_producto

La ruta `/carrito/:id/productos/:id_producto` agrega un producto especificado por su `id_producto` a un carrito especificado por su `id`. Esta ruta utiliza el método `POST` y es manejada por el controlador `postProductInCart` definido en `Controllers.js`.

Ejemplo de devolución.
```json
{
  "id": "644660e4be01227d543629db",
  "timestamp": "1682333924808",
  "productos": [
    {
      "id": "6449335119a8b45fa5ce35dd",
      "timestamp": "1682518865854",
      "nombre": "Remera Iron Man",
      "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
      "codigo": "sku225",
      "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
      "precio": 5500,
      "stock": 50
    }
  ]
}
```

- ###### DELETE /api/carrito/:id/productos/:id_producto

La ruta `/carrito/:id/productos/:id_producto` elimina un producto especificado por su `id_producto` de un carrito especificado por su `id`. Esta ruta utiliza el método `DELETE` y es manejada por el controlador `deleteProductInCart` definido en `Controllers.js`. Devuelve el carrito completo, sin el producto eliminado.

Ejemplo de devolución.
```json
{
  "id": "644660e4be01227d543629db",
  "timestamp": "1682333924808",
  "productos": []
}
```
- ###### POST /api/carrito/

La ruta `/carrito/` crea un nuevo carrito en la plataforma de comercio electrónico. Esta ruta utiliza el método `POST` y es manejada por el controlador `postCart` definido en `Controllers.js`.

> <span style="color:red;">Esta ruta esta creada con el fin educativo de poder controlar los carritos, y no existiria en una api real, ya que los carritos se crean al crear un usuario.</span>

- ###### DELETE /api/carrito/:id

La ruta `/carrito/:id` elimina un carrito especificado por su `id` de la plataforma de comercio electrónico. Esta ruta utiliza el método `DELETE` y es manejada por el controlador `deleteCart` definido en `Controllers.js`.

> <span style="color:red;">Esta ruta esta creada con el fin educativo de poder controlar los carritos, y no existiria en una api real, ya que no es conveniente eliminar carritos porque se encuetran asignados a un usuario.</span>

-------------

-------------
### Pedidos ####

###### Rutas Disponibles
> Se requiere un token de autenticación válido para acceder a todas las rutas de Pedidos.

-------------

- ###### POST /api/pedidos/:userId

Crea un nuevo pedido para el usuario especificado por `userId`.
Devuelve la info de usuario que realiza el pedido, y el carrito. Ademas vacia los productos del carrito asignado al usuario

Ejemplo de devolución.
```json
{
  "id": "644942a119a8b45fa5ce3602",
  "timestamp": "1682522785749",
  "usuario": {
    "id": "644660e4be01227d543629dd",
    "timestamp": "1682333924862",
    "email": "leticia@leticia.com",
    "nombre": "Leticia",
    "direccion": "Avenida Siempre Viva 322",
    "edad": 41,
    "telefono": "+541137920000",
    "foto": "ticket.jpg",
    "carritoId": "64468d21aee37c224131b2da",
  },
  "carrito": {
    "id": "64468d21aee37c224131b2da",
    "timestamp": "1682345249918",
    "productos": [
		{
		  "id": "6449335119a8b45fa5ce35dd",
		  "timestamp": "1682518865854",
		  "nombre": "Remera Iron Man",
		  "descripcion": "Espectacular remera estampada de la memorable frase de Iron Man, I Love you 3000",
		  "codigo": "sku225",
		  "foto": "https://www.qualityartworks.com.ar/wp-content/uploads/re/re1417/1417re_verde_producto.jpg",
		  "precio": 5500,
		  "stock": 50
		}
	]
  }
}
```
-------------
#Variables de entorno
Existen las siguientes variables de entorno para configurar el proyecto.

- `PERSISTENCE`

	Se setea con dos estados `mem` o `mongo` y especifica si la API usara DAOs de MongoDB o Mem (Para pruebas rapidas).
	(Por defecto en `mem` si no se setea).

- `JWT_TOKEN_DURATION`

	Tiempo de duracion de los tokens JWT.
	Ej 30m, 24h

- `JWT_SECRET`

	String secreto para firmar tokens de JWT.

- `MONGO_DB_STRING_CONN`

	Especifica el string de conexion para el uso de permanencia MongoDB

- `SEND_EMAIL_SUPPORT`

	Se setea con dos estados `true` o `false` y especifica si la API enviará emails, en los registros de usuarios y pedidos. (Por defecto en `false` si no se tienen los datos de SMTP).

- `ADMIN_EMAIL`

	Direccion de email del usuario administrador.

- `SMTP_SENDER`

	Servidor SMTP de envio.

- `SMTP_PORT`

	Puerto SMTP.

- `SMTP_USER`

	Usuario SMTP.

- `SMTP_PASS`

	Contraseña SMTP.

- `TWILIO_SUPPORT`

	Se setea con dos estados `true` o `false` y especifica si la API enviará mensajes SMS y WHATSAPP,  en los registros de usuarios y pedidos. (Por defecto en `false` si no se tienen servicio PRO de Twilio).

- `TWILIO_ACCOUNT_SID`

	SID de la cuenta de Twilio.

- `TWILIO_AUTH_TOKEN`

	Token de autorización de la cuenta de Twilio.

- `TWILIO_REG_PHONE_SMS`

	Numero telefonico celular de SMS registrado en Twillio que es usado como sender.

- `TWILIO_REG_PHONE_WHATSAPP`

	Numero telefonico celular de WhatsApp registrado en Twillio que es usado como sender.
