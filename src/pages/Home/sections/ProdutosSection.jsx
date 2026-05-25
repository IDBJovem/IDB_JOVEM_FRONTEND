import { Link } from "react-router-dom";
import produto1Img from "../../../assets/images/produto1.png";
import produto2Img from "../../../assets/images/produto2.png";
import produto3Img from "../../../assets/images/produto3.png";
import { FocusCards } from "../../../components/ui/focus-cards";

const mockProducts = [
  { id: 1, name: "Camiseta igreja", description: "Descrição do produto", image: produto1Img },
  { id: 2, name: "Caneca", description: "Descrição do produto", image: produto2Img },
  { id: 3, name: "Brinco cruz", description: "Descrição do produto", image: produto3Img },
  { id: 4, name: "Caneca", description: "Descrição do produto", image: produto2Img },
  { id: 5, name: "Brinco cruz", description: "Descrição do produto", image: produto3Img },
  { id: 6, name: "Camiseta igreja", description: "Descrição do produto", image: produto1Img },
];

function ProductCard({ product, index }) {
  const isOrange = index % 2 !== 0;

  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden p-4 md:p-5 ${isOrange ? "bg-[#FF6D2C]" : "bg-[#FDF3EA]"
        }`}
    >
      <div className="w-full bg-white flex items-center justify-center p-4 md:p-6 h-[220px] md:h-[260px] rounded-xl shadow-sm">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-contain drop-shadow-sm mix-blend-multiply"
        />
      </div>
      <div className="w-full pt-6 pb-2 text-center">
        <p className="text-[1.1rem] md:text-xl font-bold text-neutral-800">
          {product.name}
        </p>
        <p className="text-xs md:text-sm font-medium mt-2 text-neutral-600">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default function ProdutosSection({ products = [] }) {
  // Ignoramos a prop e usamos o mock do design
  const displayProducts = mockProducts;

  return (
    <section id="produtos" className="w-full bg-[#FFFFFF] py-16 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <h2
            className="font-black text-[#2B2B2B] leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Conheça nossos produtos
          </h2>
          <p className="text-[#FF6D2C] font-handwriting mt-1" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
            À venda em nossos eventos ou online!
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#FF6D2C] hover:bg-[#E65C18] text-white font-bold px-8 py-3 rounded-full transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
            >
              Comprar na Hotmart
            </a>
          </div>
        </div>

        {/* Grid de produtos */}
        <FocusCards 
          cards={displayProducts.map(p => ({
            title: p.name,
            description: p.description,
            src: p.image
          }))} 
        />

      </div>
    </section>
  );
}
