import { mockProducts } from "../data/mockProducts";

const STORAGE_KEY = "idb_admin_products";

/**
 * Carrega produtos do localStorage ou usa o mock como fallback.
 */
function loadProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* fallback to mock */
  }
  return [...mockProducts];
}

/**
 * Persiste produtos no localStorage.
 */
function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/**
 * Retorna todos os produtos.
 */
export function getAllProducts() {
  return loadProducts();
}

/**
 * Busca um produto pelo ID.
 */
export function getProductById(id) {
  const products = loadProducts();
  return products.find((p) => p.id === Number(id)) || null;
}

/**
 * Cria um novo produto.
 */
export function createProduct(productData) {
  const products = loadProducts();
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    image: "/images/produtos/camiseta-igreja.jpg",
    ...productData,
  };

  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

/**
 * Atualiza um produto existente.
 */
export function updateProduct(id, updates) {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

/**
 * Remove um produto pelo ID.
 */
export function deleteProduct(id) {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== Number(id));
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}
