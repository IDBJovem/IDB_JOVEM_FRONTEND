/* istanbul ignore file */
import { Link } from "react-router-dom";
import bgGif from "../../../assets/gifs/IDB_Jovem.gif";

const CountdownBox = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center bg-[#D9D9D9]/50 w-16 h-20 md:w-20 md:h-24 rounded-sm shadow-lg">
    <span className="text-white font-black text-2xl md:text-4xl tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-white text-[10px] md:text-xs font-bold mt-1 md:mt-2 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default function HeroSection({ countdown, nextEvent }) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgGif}
          alt=""
          className="w-full h-full object-cover opacity-60"
          aria-hidden="true"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto">
        {/* Título principal */}
        <h1
          className="text-white font-black uppercase leading-none tracking-tight"
          style={{
            fontSize: "clamp(3rem, 12vw, 9rem)",
            textShadow: "-6px 3px 0px #D5650D",
          }}
        >
          IDB JOVEM & TEENS
        </h1>

        {/* Countdown */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center">
            <span className="text-white font-bold uppercase tracking-widest text-2xl md:text-4xl whitespace-nowrap">
              PROXIMO EVENTO:
            </span>
            <div className="flex items-center gap-2 md:gap-3">
              <CountdownBox value={countdown.days} label="dias" />
              <CountdownBox value={countdown.hours} label="horas" />
              <CountdownBox value={countdown.minutes} label="min" />
              <CountdownBox value={countdown.seconds} label="seg" />
            </div>
          </div>
        </div>

        {/* CTA */}
        {nextEvent && (
          <Link
            to={`/eventos/${nextEvent.slug}`}
            className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold px-8 py-3 rounded-sm uppercase tracking-wider text-sm shadow-xl"
          >
            Ver evento
          </Link>
        )}
      </div>
    </section>
  );
}

