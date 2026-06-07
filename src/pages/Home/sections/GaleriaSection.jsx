import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import galeria1Img from "../../../assets/images/galeria1.png";
import galeria2Img from "../../../assets/images/galeria2.png";
import galeria3Img from "../../../assets/images/galeria3.png";
import galeria4Img from "../../../assets/images/galeria4.png";

const tempGallery = [
  { id: 1, image: galeria1Img },
  { id: 2, image: galeria2Img },
  { id: 3, image: galeria3Img },
  { id: 4, image: galeria4Img },
];

export default function GaleriaSection({ gallery = [] }) {
  const displayGallery = tempGallery;

  return (
    <section className="w-full bg-[#DC6803] py-16 md:py-24">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16 px-4">
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <span className="text-[#93370D]">Galeria de fotos</span>{" "}
            <em className="not-italic text-white font-handwriting" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
              dos eventos
            </em>
          </h2>
        </div>

        {/* Lista de fotos */}
        <div className="w-full px-4 md:px-8 pb-8">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { spaceBetween: 24 }
            }}
            className="w-full"
          >
            {displayGallery.map((item) => (
              <SwiperSlide
                key={item.id}
                className="!w-[85vw] sm:!w-[45vw] md:!w-[32vw] overflow-hidden rounded-sm"
              >
                <img
                  src={item.image}
                  alt="Galeria"
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-sm"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center px-4">
          <Link
            to="/galeria"
            className="inline-block bg-white text-[#DC6803] hover:bg-neutral-100 transition-colors font-semibold px-10 py-3 rounded-full text-lg shadow-sm"
          >
            Ver mais +
          </Link>
        </div>
      </div>
    </section>
  );
}
