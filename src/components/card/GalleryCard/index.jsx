export default function GalleryCard({ image, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-50 overflow-hidden">
        <img
          src={image.src}
          alt={image.alt || "Imagem da galeria"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}
