import { prodContainer } from "../../routes/products.js";

export async function deleteProducts(req, res) {
  const id = await prodContainer.deleteById(req.params.id);
  res.status(200).json({ status: "ok", deletedProduct: id });
}
