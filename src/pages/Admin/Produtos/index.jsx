import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, Pencil } from "lucide-react";
import { fetchAllProducts, handleDeleteProduct } from "../../../controllers/productController";
import useModal from "../../../hooks/useModal";
import DeleteProductModal from "./components/DeleteProductModal";

/* ── Card de Produto ── */
function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-200">
      {/* Imagem */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=Sem+Imagem";
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <p className="font-semibold text-sm text-[#1E1E1E] truncate mb-3">
          {product.name}
        </p>

        {/* Botões */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(product.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Pencil size={13} />
            Editar
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
          >
            <Trash2 size={13} />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Página principal: Listagem de Produtos ── */
export default function AdminProdutos() {
  const navigate = useNavigate();
  const deleteModal = useModal();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    const all = fetchAllProducts();
    setProducts(all);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/produtos/${id}/editar`);
  };

  const handleConfirmDelete = () => {
    if (deleteModal.data) {
      handleDeleteProduct(deleteModal.data.id);
      deleteModal.close();
      loadProducts();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="font-black text-[#1E1E1E]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
        >
          Produtos
        </h1>
        <Link
          to="/admin/produtos/criar"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          Cadastrar Produto
          <Plus size={18} />
        </Link>
      </div>

      {/* Grid de Produtos */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={(p) => deleteModal.open(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
          <p className="text-sm text-[#1E1E1E]/40">
            Nenhum produto cadastrado.
          </p>
        </div>
      )}

      {/* Modal de exclusão */}
      <DeleteProductModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
