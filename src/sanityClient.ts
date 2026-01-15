import { createClient } from "@sanity/client";

// FORCER la désactivation du CDN en production pour éviter les problèmes CORS
// Le CDN Sanity nécessite que le domaine soit dans les CORS origins
// L'API directe avec token contourne cette restriction
const sanityToken = import.meta.env.VITE_SANITY_TOKEN;
const isProduction = import.meta.env.PROD;

// TOUJOURS désactiver le CDN en production ou si un token est présent
// Le CDN cause des problèmes CORS, l'API directe les résout
const useCdn = false; // FORCER à false pour éviter CORS

// Log pour déboguer (développement et production)
console.log('[Sanity Client Config]', {
  hasToken,
  useCdn,
  isProduction,
  tokenLength: sanityToken?.length || 0,
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "z8eiwrv2",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiUrl: useCdn ? 'CDN (apicdn.sanity.io)' : 'API directe (api.sanity.io)',
});

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "z8eiwrv2",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2023-05-03",
  useCdn: useCdn,
  token: sanityToken,
  // Ignorer les erreurs CORS en développement
  ignoreBrowserTokenWarning: true,
});

export default sanityClient;
