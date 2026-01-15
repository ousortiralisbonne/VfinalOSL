/**
 * Barrel exports for hooks
 */

// Core hooks
export { useFetch } from "./useFetch";
export { useNewsletterSubscription } from "./useNewsletterSubscription";
export { useScrollAnimation } from "./useScrollAnimation";

// Sanity data hooks
export {
  useRestaurants,
  useBars,
  useClubs,
  useEvents,
  useHotels,
  useBlogPosts,
  useBlogPost,
  useGuidedTours,
  useSports,
  useBoatTrips,
  useTransfers,
  useMoreActivities,
  useExploreMore,
  usePageBanners,
  usePageBanner,
  useSiteImages,
  useSiteImagesByCategory,
  useSiteImage,
} from "./useSanityData";

// Re-export resend hooks
export * from "./resend";
