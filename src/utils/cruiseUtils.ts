export const getCruisesByLocation = (location: string, cruiseData: any) => {
  switch (location) {
    case "lisbon":
      return [
        ...(cruiseData.lisbon.groupCruises || []),
        ...(cruiseData.lisbon.privateCruises || []),
      ];
    case "cascais":
      return cruiseData.cascais.fishingCruises;
    case "setubal":
      return cruiseData.setubal.natureCruises;
    case "nouvel-an":
      return [
        ...(cruiseData["nouvel-an"].groupCruises || []),
        ...(cruiseData["nouvel-an"].privateCruises || []),
      ];
    default:
      return [];
  }
};

// Fonction utilitaire pour normaliser les IDs de location (minuscules, sans espaces ni tirets)
const normalizeLocationId = (id: string) => {
  if (!id) return '';
  return id.toLowerCase().replace(/[\s-]/g, '');
};

export const getCruisesByType = (
  selectedType: string,
  selectedLocation: string,
  cruiseData: any[]
) => {
  const normalizedSelectedLocation = normalizeLocationId(selectedLocation);

  const filtered = cruiseData.filter((cruise) => {
    const typeMatch = selectedType === "all" || cruise.type === selectedType;
    const normalizedCruiseLocation = normalizeLocationId(cruise.location);
    const locationMatch = normalizedCruiseLocation === normalizedSelectedLocation;

    return typeMatch && locationMatch;
  });

  return filtered;
};
