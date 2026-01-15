import { useFetch } from './useFetch';
import { useTranslation } from 'react-i18next';
import { imgUrlBuilder } from '../utils/imgUrlBuilder';
import { 
  BlogPost, 
  Restaurant, 
  Bar, 
  Club, 
  Event, 
  Hotel, 
  GuidedTour, 
  Sport, 
  BoatTripCruise, 
  Vehicle, 
  Service,
  Category,
  PageBanner,
  SiteImage
} from '../types';

// Hook pour récupérer les restaurants
export const useRestaurants = () => {
  const { i18n } = useTranslation();
  
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useFetch(`*[_type == "restaurantCategories"] | order(order asc)`);

  const {
    data: restaurantsData,
    isLoading: isLoadingRestaurants,
    error: errorRestaurants,
  } = useFetch(`*[_type == "restaurants"] | order(order asc)`);

  const cuisines = categoriesData?.map((category: any) => ({
    id: category.id,
    name: category.name[i18n.language],
  })) || [];

  const restaurants = restaurantsData?.map((restaurant: any) => {
    const cuisineCategory = (categoriesData as any)?.find(
      (cat: any) => cat._id === restaurant.cuisine?._ref
    );

    return {
      id: restaurant.id,
      name: restaurant.name,
      cuisine: cuisineCategory?.id,
      priceRange: restaurant.priceRange,
      rating: restaurant.rating,
      reviews: restaurant.reviews,
      address: restaurant.address,
      openingHours: restaurant.openingHours,
      phone: restaurant.phone,
      image: imgUrlBuilder(restaurant.image).url(),
      specialties: restaurant.specialties[i18n.language],
    };
  }) || [];

  return {
    restaurants,
    cuisines,
    isLoading: isLoadingCategories || isLoadingRestaurants,
    error: errorCategories || errorRestaurants,
  };
};

// Hook pour récupérer les bars
export const useBars = () => {
  const { i18n } = useTranslation();
  
  const {
    data: typesData,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useFetch(`*[_type == "barCategories"] | order(order asc)`);

  const {
    data: barsData,
    isLoading: isLoadingBars,
    error: errorBars,
  } = useFetch(`*[_type == "bars"] | order(order asc)`);

  const types = typesData?.map((type: any) => ({
    id: type.id,
    name: type.name[i18n.language],
  })) || [];

  const bars = barsData?.map((bar: any) => ({
    id: bar._id,
    name: bar.name,
    type: (typesData as any)?.find((type: any) => type._id === bar.type._ref)?.id,
    priceRange: bar.priceRange,
    rating: bar.rating,
    reviews: bar.reviews,
    address: bar.address,
    openingHours: bar.openingHours,
    phone: bar.phone,
    image: imgUrlBuilder(bar.image).url(),
    tags: bar.tags[i18n.language],
  })) || [];

  return {
    bars,
    types,
    isLoading: isLoadingTypes || isLoadingBars,
    error: errorTypes || errorBars,
  };
};

// Hook pour récupérer les clubs
export const useClubs = () => {
  const { i18n } = useTranslation();
  
  const {
    data: typesData,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useFetch(`*[_type == "clubCategories"] | order(order asc)`);

  const {
    data: clubsData,
    isLoading: isLoadingClubs,
    error: errorClubs,
  } = useFetch(`*[_type == "clubs"] | order(order asc)`);

  const types = typesData?.map((type: any) => ({
    id: type.id,
    name: type.name[i18n.language],
  })) || [];

  const clubs = clubsData?.map((club: any) => ({
    id: club._id,
    name: club.name,
    type: (typesData as any)?.find((type: any) => type._id === club.type._ref)?.id,
    priceRange: club.priceRange,
    rating: club.rating,
    reviews: club.reviews,
    address: club.address,
    openingHours: club.openingHours,
    phone: club.phone,
    image: imgUrlBuilder(club.image).url(),
    tags: club.tags[i18n.language],
  })) || [];

  return {
    clubs,
    types,
    isLoading: isLoadingTypes || isLoadingClubs,
    error: errorTypes || errorClubs,
  };
};

// Hook pour récupérer les événements
export const useEvents = () => {
  const { i18n } = useTranslation();
  
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useFetch(`*[_type == "eventCategories"] | order(order asc)`);

  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useFetch(`*[_type == "events"] | order(order asc)`);

  const categories = categoriesData?.map((category: any) => ({
    id: category.id,
    name: category.name[i18n.language],
  })) || [];

  const events = eventsData?.map((event: any) => ({
    id: event._id,
    title: event.title[i18n.language],
    category: (categoriesData as any)?.find(
      (cat: any) => cat._id === event.category._ref
    )?.id,
    date: event.date,
    time: event.time,
    location: event.location,
    image: imgUrlBuilder(event.image).url(),
    price: event.price,
  })) || [];

  return {
    events,
    categories,
    isLoading: isLoadingCategories || isLoadingEvents,
    error: errorCategories || errorEvents,
  };
};

// Hook pour récupérer les hôtels
export const useHotels = () => {
  const { i18n } = useTranslation();
  
  const {
    data: hotelsData,
    isLoading: isLoadingHotels,
    error: errorHotels,
  } = useFetch(`*[_type == "hotels"] | order(order asc)`);

  const {
    data: hotelCategories,
    isLoading: isLoadingHotelCategories,
    error: errorHotelCategories,
  } = useFetch(`*[_type == "hotelCategories"] | order(order asc)`);

  const categories = hotelCategories?.map((category: any) => ({
    id: category.id,
    name: category.name[i18n.language],
  })) || [];

  const hotels = hotelsData?.map((hotel: any) => ({
    id: hotel._id,
    name: hotel.name,
    category: (hotelCategories as any)?.find(
      (cat: any) => cat._id === hotel.category._ref
    )?.id,
    priceRange: hotel.priceRange,
    rating: hotel.rating,
    reviews: hotel.reviews,
    address: hotel.address,
    checkIn: hotel.checkIn,
    checkOut: hotel.checkOut,
    phone: hotel.phone,
    image: imgUrlBuilder(hotel.image).url(),
    amenities: hotel.amenities[i18n.language],
    bookingUrl: hotel.bookingUrl,
  })) || [];

  return {
    hotels,
    categories,
    isLoading: isLoadingHotelCategories || isLoadingHotels,
    error: errorHotelCategories || errorHotels,
  };
};

// Hook pour récupérer les blogs
export const useBlogPosts = () => {
  const { i18n } = useTranslation();
  
  const queryCategories = `*[_type == "blogCategories"] | order(order asc) {
    id,
    name
  }`;

  const queryBlogs = `*[_type == "blogPosts"] {
    id,
    title,
    excerpt,
    content,
    image,
    date,
    readTime,
    author,
    slug,
    category->{
      id,
      name
    }
  }`;

  const {
    isLoading: isLoadingCategories,
    error: errorCategories,
    data: categoriesData,
  } = useFetch(queryCategories);
  

  const {
    isLoading: isLoadingBlogs,
    error: errorBlogs,
    data: blogsData,
  } = useFetch(queryBlogs);
  

  const categories = categoriesData?.map((item: any) => ({
    id: item?.id || 'uncategorized',
    name: item?.name?.[i18n.language] || item?.name?.en || 'Non catégorisé',
  })) || [];

  // Helper function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const blogPosts = blogsData?.map((item: any) => {
    try {
      return {
        id: item.id,
        title: item.title?.[i18n.language] || item.title?.en || 'Titre manquant',
        excerpt: item.excerpt?.[i18n.language] || item.excerpt?.en || 'Extrait manquant',
        content: item.content?.[i18n.language] || item.content?.en || [],
        image: item.image ? imgUrlBuilder(item.image).url() : '/placeholder-image.jpg',
        date: item.date || new Date().toISOString(),
        readTime: item.readTime || '5',
        author: item.author || 'Auteur inconnu',
        slug: item.slug?.current || item.id, // Utiliser l'ID comme fallback pour les articles existants
        category: item.category?.id || 'uncategorized',
        categoryName: item.category?.name?.[i18n.language] || item.category?.name?.en || 'Non catégorisé',
      };
    } catch (error) {
      console.error('Error processing blog post:', item, error);
      return null;
    }
  }).filter(Boolean) || [];
  

  return {
    blogPosts,
    categories,
    isLoading: isLoadingBlogs || isLoadingCategories,
    error: errorBlogs || errorCategories,
  };
};

// Hook pour récupérer un seul article de blog par slug/id
export const useBlogPost = (slugOrId: string) => {
  const { i18n } = useTranslation();
  
  const query = `*[_type == "blogPosts" && (slug.current == $slugOrId || id == $slugOrId)][0] {
    id,
    title,
    excerpt,
    content,
    image,
    date,
    readTime,
    author,
    slug,
    category->{
      id,
      name
    }
  }`;

  const {
    isLoading,
    error,
    data: blogData,
  } = useFetch(query, { slugOrId });

  // Helper function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const blogPost = blogData ? {
    id: blogData.id,
    title: blogData.title[i18n.language],
    excerpt: blogData.excerpt[i18n.language],
    content: blogData.content[i18n.language],
    image: imgUrlBuilder(blogData.image).url(),
    date: blogData.date,
    readTime: blogData.readTime,
    author: blogData.author,
    slug: blogData.slug?.current || blogData.id, // Utiliser l'ID comme fallback
    category: blogData.category.id,
    categoryName: blogData.category.name[i18n.language],
  } : null;


  return {
    blogPost,
    isLoading,
    error,
  };
};

// Hook pour récupérer les tours guidés
export const useGuidedTours = () => {
  const { i18n } = useTranslation();
  
  const {
    data: toursData,
    isLoading: isLoadingTours,
    error: errorTours,
  } = useFetch(`*[_type == "guidedTours"] | order(order asc)`);

  const tours = toursData?.map((tour: any) => ({
    id: tour._id,
    title: tour.title[i18n.language],
    description: tour.description[i18n.language],
    duration: tour.duration,
    price: tour.price,
    rating: tour.rating,
    reviews: tour.reviews,
    image: imgUrlBuilder(tour.image).url(),
    highlights: tour.highlights[i18n.language],
  })) || [];

  return {
    tours,
    isLoading: isLoadingTours,
    error: errorTours,
  };
};

// Hook pour récupérer les sports
export const useSports = () => {
  const { i18n } = useTranslation();
  
  const {
    data: sportsData,
    isLoading: isLoadingSports,
    error: errorSports,
  } = useFetch(`*[_type == "sports"] | order(order asc)`);

  const sports = sportsData?.map((sport: any) => ({
    id: sport._id,
    name: sport.name,
    description: sport.description[i18n.language],
    price: sport.price,
    rating: sport.rating,
    reviews: sport.reviews,
    image: imgUrlBuilder(sport.image).url(),
    location: sport.location,
  })) || [];

  return {
    sports,
    isLoading: isLoadingSports,
    error: errorSports,
  };
};

// Hook pour récupérer les croisières
export const useBoatTrips = () => {
  const { i18n } = useTranslation();
  
  const {
    data: cruisesData,
    isLoading: isLoadingCruises,
    error: errorCruises,
  } = useFetch(`*[_type == "boatTripCruise"] | order(order asc)`);

  const {
    data: locationsData,
    isLoading: isLoadingLocations,
    error: errorLocations,
  } = useFetch(`*[_type == "boatTripLocation"] | order(order asc)`);

  const {
    data: typesData,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useFetch(`*[_type == "boatTripCruiseType"] | order(order asc)`);

  const locations = locationsData?.map((location: any) => ({
    id: location.id,
    name: location.name[i18n.language],
  })) || [];

  const types = typesData?.map((type: any) => ({
    id: type.id,
    name: type.name[i18n.language],
  })) || [];

  const cruises = cruisesData?.map((cruise: any) => ({
    id: cruise._id,
    name: cruise.name,
    description: cruise.description[i18n.language],
    duration: cruise.duration,
    price: cruise.price,
    rating: cruise.rating,
    reviews: cruise.reviews,
    image: imgUrlBuilder(cruise.image).url(),
    location: (locationsData as any)?.find(
      (loc: any) => loc._id === cruise.location._ref
    )?.id,
    cruiseType: (typesData as any)?.find(
      (type: any) => type._id === cruise.cruiseType._ref
    )?.id,
  })) || [];

  return {
    cruises,
    locations,
    types,
    isLoading: isLoadingCruises || isLoadingLocations || isLoadingTypes,
    error: errorCruises || errorLocations || errorTypes,
  };
};

// Hook pour récupérer les véhicules et services de transfert
export const useTransfers = () => {
  const { i18n } = useTranslation();
  
  const {
    data: vehiculesData,
    isLoading: isLoadingVehicules,
    error: errorVehicules,
  } = useFetch(`*[_type == "vehicles"] | order(order asc)`);

  const {
    data: servicesData,
    isLoading: isLoadingServices,
    error: errorServices,
  } = useFetch(`*[_type == "services"] | order(order asc)`);

  const vehicles = vehiculesData?.map((vehicle: any) => ({
    id: vehicle.id,
    name: vehicle.name[i18n.language],
    capacity: vehicle.capacity,
    price: vehicle.price,
    image: imgUrlBuilder(vehicle.image).url(),
    features: vehicle.features[i18n.language],
  })) || [];

  const services = servicesData?.map((service: any) => ({
    title: service.title[i18n.language],
    description: service.description[i18n.language],
    price: service.price,
  })) || [];

  return {
    vehicles,
    services,
    isLoading: isLoadingVehicules || isLoadingServices,
    error: errorVehicules || errorServices,
  };
};

// Hook pour récupérer les activités supplémentaires
export const useMoreActivities = () => {
  const { i18n } = useTranslation();
  
  const {
    data: activitiesData,
    isLoading: isLoadingActivities,
    error: errorActivities,
  } = useFetch(`*[_type == "moreActivities"] | order(order asc)`);

  const activities = activitiesData?.map((activity: any) => ({
    id: activity._id,
    name: activity.name[i18n.language],
    description: activity.description[i18n.language],
    price: activity.price,
    rating: activity.rating,
    reviews: activity.reviews,
    image: imgUrlBuilder(activity.image).url(),
    location: activity.location,
  })) || [];

  return {
    activities,
    isLoading: isLoadingActivities,
    error: errorActivities,
  };
};

// Hook pour récupérer les contenus "Explore More"
export const useExploreMore = () => {
  const { i18n } = useTranslation();
  
  const {
    data: exploreData,
    isLoading: isLoadingExplore,
    error: errorExplore,
  } = useFetch(`*[_type == "exploreMore"] | order(order asc)`);

  const exploreItems = exploreData?.map((item: any) => ({
    id: item._id,
    title: item.title[i18n.language],
    description: item.description[i18n.language],
    image: imgUrlBuilder(item.image).url(),
    link: item.link,
  })) || [];

  return {
    exploreItems,
    isLoading: isLoadingExplore,
    error: errorExplore,
  };
};

// Hook pour récupérer les bannières de pages
export const usePageBanners = () => {
  const { i18n } = useTranslation();
  
  const {
    data: bannersData,
    isLoading: isLoadingBanners,
    error: errorBanners,
  } = useFetch(`*[_type == "pageBanners" && isActive == true] | order(order asc)`);

  const banners = bannersData?.map((banner: any) => ({
    id: banner._id,
    pageId: banner.pageId,
    title: banner.title[i18n.language],
    subtitle: banner.subtitle?.[i18n.language],
    bannerImage: imgUrlBuilder(banner.bannerImage).url(),
    isActive: banner.isActive,
    order: banner.order,
  })) || [];

  return {
    banners,
    isLoading: isLoadingBanners,
    error: errorBanners,
  };
};

// Hook pour récupérer une bannière spécifique par pageId
export const usePageBanner = (pageId: string) => {
  const { i18n } = useTranslation();
  
  const {
    data: bannerData,
    isLoading: isLoadingBanner,
    error: errorBanner,
  } = useFetch(`*[_type == "pageBanners" && pageId == "${pageId}" && isActive == true][0]`);

  const banner = bannerData ? {
    id: bannerData._id,
    pageId: bannerData.pageId,
    title: bannerData.title[i18n.language],
    subtitle: bannerData.subtitle?.[i18n.language],
    bannerImage: imgUrlBuilder(bannerData.bannerImage).url(),
    isActive: bannerData.isActive,
    order: bannerData.order,
  } : null;

  return {
    banner,
    isLoading: isLoadingBanner,
    error: errorBanner,
  };
};

// Hook pour récupérer toutes les images du site
export const useSiteImages = () => {
  const { i18n } = useTranslation();
  
  const {
    data: imagesData,
    isLoading: isLoadingImages,
    error: errorImages,
  } = useFetch(`*[_type == "siteImages" && isActive == true] | order(order asc)`);

  const images = imagesData?.map((image: any) => ({
    id: image._id,
    imageId: image.imageId,
    title: image.title[i18n.language],
    description: image.description?.[i18n.language],
    image: imgUrlBuilder(image.image).url(),
    category: image.category,
    altText: image.altText?.[i18n.language],
    isActive: image.isActive,
    order: image.order,
  })) || [];

  return {
    images,
    isLoading: isLoadingImages,
    error: errorImages,
  };
};

// Hook pour récupérer les images par catégorie
export const useSiteImagesByCategory = (category: string) => {
  const { i18n } = useTranslation();
  
  const {
    data: imagesData,
    isLoading: isLoadingImages,
    error: errorImages,
  } = useFetch(`*[_type == "siteImages" && category == "${category}" && isActive == true] | order(order asc)`);

  const images = imagesData?.map((image: any) => ({
    id: image._id,
    imageId: image.imageId,
    title: image.title[i18n.language],
    description: image.description?.[i18n.language],
    image: imgUrlBuilder(image.image).url(),
    category: image.category,
    altText: image.altText?.[i18n.language],
    isActive: image.isActive,
    order: image.order,
  })) || [];

  return {
    images,
    isLoading: isLoadingImages,
    error: errorImages,
  };
};

// Hook pour récupérer une image spécifique par imageId
export const useSiteImage = (imageId: string) => {
  const { i18n } = useTranslation();
  
  const {
    data: imageData,
    isLoading: isLoadingImage,
    error: errorImage,
  } = useFetch(`*[_type == "siteImages" && imageId == "${imageId}" && isActive == true][0]`);

  const image = imageData ? {
    id: imageData._id,
    imageId: imageData.imageId,
    title: imageData.title[i18n.language],
    description: imageData.description?.[i18n.language],
    image: imgUrlBuilder(imageData.image).url(),
    category: imageData.category,
    altText: imageData.altText?.[i18n.language],
    isActive: imageData.isActive,
    order: imageData.order,
  } : null;

  return {
    image,
    isLoading: isLoadingImage,
    error: errorImage,
  };
};
