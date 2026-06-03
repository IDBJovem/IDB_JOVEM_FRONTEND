import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function EventosProximos() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FDF3EA] pt-[82px] flex flex-col">
      <div className="w-full bg-[#D5650D] py-8 px-4 md:px-12 flex items-center relative overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-md z-10 absolute left-4 md:left-12"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-[#D5650D]" />
        </button>
        <div className="flex-1 text-center px-12 md:px-16">
          <h1
            className="font-handwriting text-white pt-2"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.1 }}
          >
            Eventos mais Próximos de Você
          </h1>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col">
        <div className="flex-1 w-full bg-white rounded-3xl border-4 border-white shadow-xl overflow-hidden relative min-h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110190.49000188617!2d-92.08389772274483!3d30.22409028828551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86249c5e317cdaab%3A0xc6a8274d754cf21!2sLafayette%2C%20LA%2C%20USA!5e0!3m2!1sen!2sbr!4v1716839352924!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            title="Mapa de Eventos Próximos"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
