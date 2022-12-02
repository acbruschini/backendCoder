import { prodContainer } from "../../routes/products.js";

export async function postProducts(req, res) {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const newProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  const idNew = await prodContainer.save(newProduct);
  res.status(201).json({ status: "ok", newProductId: idNew });
}
