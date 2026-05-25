import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel";

/**
 * Busca todos os produtos.
 */
export function fetchAllProducts() {
  return getAllProducts();
}

/**
 * Busca um produto por ID.
 */
export function fetchProductById(id) {
  return getProductById(id);
}

/**
 * Cria um novo produto com validação básica.
 */
export function handleCreateProduct(data) {
  if (!data.name || !data.name.trim()) {
    return { success: false, error: "Nome do produto é obrigatório." };
  }

  const product = createProduct({
    ...data,
  });

  return { success: true, product };
}

/**
 * Atualiza um produto com validação básica.
 */
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

/**
 * Exclui um produto.
 */
export function handleDeleteProduct(id) {
  const deleted = deleteProduct(id);
  return { success: deleted, error: deleted ? null : "Produto não encontrado." };
}
