import { prodContainer } from "../../routes/products.js";

export async function putProducts(req, res) {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const updatedProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  const id = await prodContainer.update(req.params.id, updatedProduct);
  res
    .status(200)
    .json({ status: "ok", updatedProduct: [prodContainer.getById(id)] });
}
