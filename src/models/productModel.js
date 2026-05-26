import { mockProducts } from "../data/mockProducts";

const STORAGE_KEY = "idb_admin_products";

function loadProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
  }
  return [...mockProducts];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getAllProducts() {
  return loadProducts();
}

export function getProductById(id) {
  const products = loadProducts();
  return products.find((p) => p.id === Number(id)) || null;
}

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

export function updateProduct(id, updates) {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id) {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== Number(id));
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}
