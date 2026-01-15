import { createClient } from "@sanity/client";

// Si un token est fourni, désactiver le CDN pour éviter les problèmes CORS
// L'API directe avec token contourne les restrictions CORS
const sanityToken = import.meta.env.VITE_SANITY_TOKEN;
const hasToken = !!sanityToken;

// Désactiver le CDN si :
// 1. Un token est présent (obligatoire pour éviter CORS avec token)
// 2. Ou si explicitement désactivé via VITE_SANITY_USE_CDN=false
const useCdn = !hasToken && import.meta.env.VITE_SANITY_USE_CDN !== "false";

// Log pour déboguer en développement
if (import.meta.env.DEV) {
  console.log('[Sanity Client]', {
    hasToken,
    useCdn,
    tokenLength: sanityToken?.length || 0,
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "z8eiwrv2",
  });
}

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
