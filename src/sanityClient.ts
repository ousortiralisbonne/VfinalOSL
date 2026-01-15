import { createClient } from "@sanity/client";

// Si un token est fourni, désactiver le CDN pour éviter les problèmes CORS
// L'API directe avec token contourne les restrictions CORS
const hasToken = !!import.meta.env.VITE_SANITY_TOKEN;
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== "false" && !hasToken;

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
