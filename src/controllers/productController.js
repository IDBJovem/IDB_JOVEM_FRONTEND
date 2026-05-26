import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel";

export function fetchAllProducts() {
  return getAllProducts();
}

export function fetchProductById(id) {
  return getProductById(id);
}

export function handleCreateProduct(data) {
  if (!data.name || !data.name.trim()) {
    return { success: false, error: "Nome do produto é obrigatório." };
  }

  const product = createProduct({
    ...data,
  });

  return { success: true, product };
}

export function handleUpdateProduct(id, data) {
  if (!data.name || !data.name.trim()) {
    return { success: false, error: "Nome do produto é obrigatório." };
  }

  const updated = updateProduct(id, {
    ...data,
  });

  if (!updated) {
    return { success: false, error: "Produto não encontrado." };
  }

  return { success: true, product: updated };
}

export function handleDeleteProduct(id) {
  const deleted = deleteProduct(id);
  return { success: deleted, error: deleted ? null : "Produto não encontrado." };
}
