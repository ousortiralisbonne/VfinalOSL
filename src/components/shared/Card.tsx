import React from "react";
import { ChevronRight } from "lucide-react";
import FavoriteButton from "../FavoriteButton";

interface CardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  price: string;
  children: React.ReactNode;
  onAction: () => void;
  actionLabel: string;
}

const Card = ({
  id,
  name,
  type,
  image,
  price,
  children,
  onAction,
  actionLabel,
}: CardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
      <div className="relative">
        <div
          className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
          style={
            ["sunset-cruise", "faeton-930", "rodman-1100"].includes(id)
              ? {
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "top",
                }
              : ["romantic"].includes(id)
              ? {
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                }
              : {
                  backgroundImage: `url(${image})`,
                }
          }
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
          {price}
        </div>
        <FavoriteButton
          item={{
            id,
            name,
            type,
            image,
            price,
          }}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">{children}</div>

        <button
          onClick={onAction}
          className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group mt-4"
        >
          <span>{actionLabel}</span>
          <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Card;
