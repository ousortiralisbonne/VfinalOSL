import { ReactNode, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MobileCarouselProps {
  children: ReactNode[];
  showDots?: boolean;
  className?: string;
  slideClassName?: string;
  arrowsPosition?: "bottom" | "sides";
}

const MobileCarousel = ({
  children,
  showDots = true,
  className = "",
  slideClassName = "",
  arrowsPosition = "bottom",
}: MobileCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={`md:hidden ${className}`}>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={showDots ? { clickable: true } : false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mobile-carousel-swiper"
        >
          {children.map((child, index) => (
            <SwiperSlide key={index} className={slideClassName}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows - bottom centered */}
        {arrowsPosition === "bottom" && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-gray-200"
              aria-label="Slide précédent"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-gray-200"
              aria-label="Slide suivant"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .mobile-carousel-swiper .swiper-pagination {
          position: relative;
          margin-top: 1rem;
        }
        .mobile-carousel-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
        }
        .mobile-carousel-swiper .swiper-pagination-bullet-active {
          background: #10b981;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default MobileCarousel;
