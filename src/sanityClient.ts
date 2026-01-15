import { createClient } from "@sanity/client";

// Désactiver le CDN si problème CORS (utiliser l'API directe)
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== "false";

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "z8eiwrv2",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2023-05-03",
  useCdn: useCdn,
  token: import.meta.env.VITE_SANITY_TOKEN,
  // Ignorer les erreurs CORS en développement
  ignoreBrowserTokenWarning: true,
});

export default sanityClient;
