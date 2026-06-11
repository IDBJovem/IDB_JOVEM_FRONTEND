"use client";;
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered
}) => {
  const isOrange = index % 2 !== 0;

  const handleClick = () => {
    if (card.link) {
      window.open(card.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={handleClick}
      role={card.link ? "link" : undefined}
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden p-4 md:p-5 transition-all duration-300 ease-out",
        card.link ? "cursor-pointer" : "cursor-default",
        isOrange ? "bg-[#FF6D2C]" : "bg-[#FDF3EA]",
        hovered !== null && hovered !== index && "blur-[3px] scale-[0.96] opacity-70"
      )}>
      <div className="w-full bg-white flex items-center justify-center p-4 md:p-6 h-[220px] md:h-[260px] rounded-xl shadow-sm">
        <img
          src={card.src}
          alt={card.title}
          className="h-full w-auto object-contain drop-shadow-sm mix-blend-multiply transition-transform duration-300 ease-out"
          style={{ transform: hovered === index ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>
      <div className="w-full pt-6 pb-2 text-center">
        <p className="text-[1.1rem] md:text-xl font-bold text-neutral-800">
          {card.title}
        </p>
        {card.description && (
          <p className="text-xs md:text-sm font-medium mt-2 text-neutral-600">
            {card.description}
          </p>
        )}
      </div>
    </div>
  );
});

Card.displayName = "Card";

export function FocusCards({
  cards
}) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.id ?? index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered} />
      ))}
    </div>
  );
}
