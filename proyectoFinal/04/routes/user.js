import { Router } from "express";
import passport from "passport";
import UsersControllers from "../controllers/users.js";

const userRouter = Router();
const Controllers = new UsersControllers();

passport.use("login", Controllers.loginStrategy());
passport.use("register", Controllers.registerStrategy());

userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/loginError" }),Controllers.postUser);
userRouter.post("/register", passport.authenticate("register", { failureRedirect: "/registerError" }), Controllers.postUser);

export default userRouter;










// import express from "express";
// import { mongoContainer } from "../models/mongoContainer.js";
// import { users } from "../models/schemas/users.js";
// import passport from "passport";
// import { loginStrategy, registerStrategy } from "../controllers/users/usersHandlers.js";
// import { postUser } from "../controllers/users/usersHandlers.js";
// import { upload } from "../helpers/filesUtils.js";

// passport.use("login", loginStrategy);
// passport.use("register", registerStrategy);

// const { Router } = express;
// const userRouter = Router();

// export const userContainer = new mongoContainer(users);

 //userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/loginError" }), postUser);

//userRouter.post("/register", passport.authenticate("register", { failureRedirect: "/registerError" }), postUser);

// // SI FUNCIONARA MULTER CON PASSPORT, ESTO FUNCIONARIA (SOLO EXPLICARON MULTER PARA SUBIR ASI QUE NO TENGO OTRAS HERRAMIENTAS)
// userRouter.post("/register2", upload.single("userPicture"), passport.authenticate("register", { failureRedirect: "/registerError" }), postUser);

// userRouter.get("/logout") // hacer logout







// //userRouter.delete("/:id?", validId, existsCart, deleteCart);

// //userRouter.get("/:id/productos", validId, existsCart, getProductsInCart);

// //userRouter.post("/:id/productos/:id_prod", validId, existsCart, existsProductForCartPost, postProductInCart);

// //userRouter.delete("/:id/productos/:id_prod", validId, existsCart, existsProductInCart, deleteProductInCart);

// export default userRouter;