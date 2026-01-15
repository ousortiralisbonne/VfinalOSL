import React from "react";
import { Clock, Users, ChevronRight } from "lucide-react";
import Card from "../shared/Card";
import InfoItem from "../shared/InfoItem";
import HighlightList from "../shared/HighlightList";
import { useTranslation } from "react-i18next";

interface CruiseCardProps {
  cruise: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    duration: string;
    capacity: string;
    highlights: string[];
    features?: Array<{
      icon: any;
      text: string;
    }>;
    departures?: string[];
    schedule?: string;
    food?: string;
    drinks?: string;
    embarkation?: string;
  };
  onSelect: (cruise: any) => void;
  actionLabel: string;
}

const CruiseCard = ({ cruise, onSelect, actionLabel }: any) => {
  const { t } = useTranslation();
  const redirectToFareHarbor = () => {
    window.open(
      "https://fareharbor.com/embeds/book/ousortiralisbonne/items/?flow=1119867&full-items=yes",
      "_blank"
    );
  };

  const globalRedirect = () => {
    if (cruise?.url) {
      window.open(cruise.url, "_blank");
    }
  };
  return (
    <Card
      id={cruise.id}
      name={cruise.name}
      type="Croisière"
      image={cruise.image}
      price={
        cruise.price === t("onquote")
          ? cruise.price
          : cruise.type === "private" && cruise.location === "Nouvel an"
          ? `À partir de ${cruise.price}`
          : `À partir de ${cruise.price} par personne`
      }
      onAction={() =>
        cruise.id === "peche-mer"
          ? redirectToFareHarbor()
          : cruise.url
          ? globalRedirect()
          : onSelect({ ...cruise, type: "Croisière" })
      }
      actionLabel={actionLabel}
    >
      <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
        {cruise.name}
      </h3>

      <p className="text-gray-600 mb-4">{cruise.description}</p>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <InfoItem icon={Clock} text={`Durée : ${cruise.duration}`} />
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <InfoItem icon={Users} text={`Capacité : ${cruise.capacity}`} />
      </div>

      {/* Affichage des departures (points de départ/inclus) */}
      {cruise?.departures && cruise.departures.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {cruise.departures.map((departure: string, index: number) => (
            <div
              key={index}
              className="inline-block bg-[#37b7ab] text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
              {departure.toUpperCase()}
            </div>
          ))}
        </div>
      )}

      {/* Affichage des features (pour compatibilité avec l'ancien système) */}
      {cruise?.features && cruise.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {cruise.features.map((feature: { text: any }) => (
            <div
              key={feature.text}
              className="inline-block bg-[#37b7ab] text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
              {feature?.text?.toUpperCase()}
            </div>
          ))}
        </div>
      )}

      {/* Informations spéciales pour Nouvel An */}
      {(cruise?.schedule || cruise?.food || cruise?.drinks || cruise?.embarkation) && (
        <div className="space-y-2 mb-4">
          {cruise?.schedule && (
            <div className="inline-block bg-[#37b7ab] text-white px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              🕐 {cruise.schedule}
            </div>
          )}
          {cruise?.embarkation && (
            <div className="inline-block bg-[#37b7ab] text-white px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              📍 {cruise.embarkation}
            </div>
          )}
          {cruise?.food && (
            <div className="inline-block bg-[#37b7ab] text-white px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              🍽️ {cruise.food}
            </div>
          )}
          {cruise?.drinks && (
            <div className="inline-block bg-[#37b7ab] text-white px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              🍷 {cruise.drinks}
            </div>
          )}
        </div>
      )}

      <HighlightList highlights={cruise.highlights} />
    </Card>
  );
};

export default CruiseCard;
