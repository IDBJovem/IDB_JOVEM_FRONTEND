import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#FDF3EA]">
      <h1 className="text-6xl md:text-8xl font-black text-[#D5650D] mb-4">401</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-6 text-center">Acesso Negado</h2>
      <p className="text-neutral-600 mb-8 text-center max-w-md">
        Você não tem permissão para acessar esta página. Por favor, faça login com uma conta de administrador.
      </p>
      <Link
        to="/login"
        className="bg-[#FF6D2C] hover:bg-[#e65c18] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md hover:scale-105"
      >
        Ir para Login
      </Link>
    </div>
  );
}
