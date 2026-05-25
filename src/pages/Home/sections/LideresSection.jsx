import { useState } from "react";
import { mockCurrentLeaders, mockPastLeaders } from "../../../data/mockLeaders";

function LeaderCard({ leader, isPast }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-2xl mb-4 overflow-hidden ${isPast ? 'bg-[#D2691E]' : 'bg-[#E85A1B]'}`}>
        {leader.image ? (
          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover mix-blend-overlay opacity-80" />
        ) : null}
      </div>
      <h4 className={`font-handwriting text-2xl leading-none ${isPast ? 'text-white' : 'text-black'}`}>
        {leader.name}
      </h4>
      <p className={`text-xs md:text-sm text-center font-semibold mt-1 max-w-[140px] leading-tight ${isPast ? 'text-white/80' : 'text-[#D5650D]'}`}>
        {leader.role}
      </p>
    </div>
  );
}

export default function LideresSection() {
  const [showPast, setShowPast] = useState(false);

  const currentDirectors = mockCurrentLeaders.slice(0, 2);
  const currentOthers = mockCurrentLeaders.slice(2, 6);

  const pastDirectors = mockPastLeaders.slice(0, 2);
  const pastOthers = mockPastLeaders.slice(2, 6);

  return (
    <section className="w-full py-16 md:py-24 px-4 bg-[#D5650D]">
      <div className={`max-w-[1200px] mx-auto rounded-[3rem] p-8 md:p-16 transition-colors duration-500 relative ${showPast ? 'bg-[#7A3614]' : 'bg-[#FF7F11]'}`}>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10">
          <h2 className="text-white font-black text-4xl md:text-5xl text-center md:text-left flex flex-col md:flex-row items-center gap-2">
            {showPast ? (
              "Antigos líderes"
            ) : (
              <>
                Nosso <span className="font-handwriting font-normal text-5xl md:text-6xl tracking-wide">Organograma</span>
              </>
            )}
          </h2>
          
          <button
            onClick={() => setShowPast(!showPast)}
            className="mt-6 md:mt-0 bg-white text-sm md:text-base text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            {showPast ? "Líderes Atuais" : "Antigos Líderes"}
          </button>
        </div>

        {showPast ? (
          <div className="flex flex-col items-center gap-12 relative z-10">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {pastDirectors.map(leader => <LeaderCard key={leader.id} leader={leader} isPast />)}
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {pastOthers.map(leader => <LeaderCard key={leader.id} leader={leader} isPast />)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center relative z-10">
            {/* Container principal */}
            <div className="bg-[#FFFDF9] rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col items-center max-w-[800px] w-full">
              <div className="flex flex-wrap justify-center gap-8 md:gap-24 mb-12">
                {currentDirectors.map(leader => <LeaderCard key={leader.id} leader={leader} />)}
              </div>
            </div>
            {/* Container secundário */}
            <div className="bg-[#FFFDF9] rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col items-center w-full max-w-full -mt-8 pt-16">
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {currentOthers.map(leader => <LeaderCard key={leader.id} leader={leader} />)}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
