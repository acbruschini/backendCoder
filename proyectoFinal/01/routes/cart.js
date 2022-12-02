import express from "express";
import fs from "fs";


const { Router } = express;
const cartRouter = Router();

cartRouter.get("/", (req, res) => {
    res.send("sent from router cart")
})

cartRouter.post("/", (req, res) => {
    
})

cartRouter.put("/:id?", (req, res) => {
    
})

cartRouter.delete("/:id?", (req, res) => {
    
})


export default cartRouter;
