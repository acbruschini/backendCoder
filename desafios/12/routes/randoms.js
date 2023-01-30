import { Router } from "express";
import { fork } from "child_process";

const randomsRouter =  Router();

randomsRouter.get("/randoms/:cant?", (req, res) => {
    const cantidad = Number(req.query.cant) || 3000000;
    //CREO EL FORK
    const forked = fork("./lib/calculoFork.js");

    //COMIENZO A ESCUCHAR SI EL FORK MANDA "PREPADADO" QUE QUIERE DECIR QUE SE CARGO
    //EN EL CASO QUE ESTO OCURRA, MANDO AL FORK UN OBJ CON INICIO (PARA QUE ARRANQUE) Y CANTIDAD
    forked.on("message", msg => {
        if(msg == "preparado") {
          forked.send({msg: "inicio", cantidad: cantidad});
        } else {
            res.json(JSON.stringify(msg));
        }
    })   
});

export default randomsRouter