import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { fetchAllProducts, handleDeleteProduct } from "../../../services/productService";
import useModal from "../../../hooks/useModal";
import SectionTitle from "../../../components/ui/SectionTitle";
import EmptyState from "../../../components/ui/EmptyState";
import ProductCard from "../../../components/card/ProductCard";
import DeleteProductModal from "./components/DeleteProductModal";

/* Página principal: Listagem de Produtos */
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

  const rightContent = (
    <Link
      to="/admin/produtos/criar"
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
    >
      Cadastrar Produto
      <Plus size={18} />
    </Link>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <SectionTitle title="Produtos" rightContent={rightContent} />

      {/* Grid de Produtos */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="full"
              onEdit={handleEdit}
              onDelete={(p) => deleteModal.open(p)}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="Nenhum produto cadastrado." />
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
