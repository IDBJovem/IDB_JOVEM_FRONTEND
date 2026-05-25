import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#FDF3EA]">
      <h1 className="text-6xl md:text-8xl font-black text-[#D5650D] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-6 text-center">Página não encontrada</h2>
      <p className="text-neutral-600 mb-8 text-center max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="bg-[#FF6D2C] hover:bg-[#e65c18] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md hover:scale-105"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
