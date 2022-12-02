import { prodContainer } from "../../routes/products.js";

export async function getProducts(req, res) {
  console.log(req.params.id);
  res
    .status(200)
    .json(
      !req.params.id
        ? await prodContainer.getAll()
        : prodContainer.getById(req.params.id)
    );
}
