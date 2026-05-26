export default function SpeakerCard({ speaker }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square bg-gray-50 overflow-hidden">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=Sem+Foto";
          }}
        />
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold text-sm text-[#1E1E1E]">{speaker.name}</p>
        <p className="text-xs text-[#1E1E1E]/50 mt-1">{speaker.role}</p>
      </div>
    </div>
  );
}
