/**
 * Script de génération du sitemap dynamique
 * Inclut les pages statiques et les articles de blog depuis Sanity
 *
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://ousortiralisbonne.com';
const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'votre-project-id';
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production';

// Pages statiques avec leur priorité et fréquence de mise à jour
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/restaurants', priority: '0.9', changefreq: 'weekly' },
  { path: '/bars', priority: '0.9', changefreq: 'weekly' },
  { path: '/clubs', priority: '0.8', changefreq: 'weekly' },
  { path: '/hotels', priority: '0.8', changefreq: 'weekly' },
  { path: '/events', priority: '0.9', changefreq: 'daily' },
  { path: '/visites-guidees', priority: '0.9', changefreq: 'weekly' },
  { path: '/croisieres', priority: '0.9', changefreq: 'weekly' },
  { path: '/transferts', priority: '0.7', changefreq: 'monthly' },
  { path: '/sports', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/a-propos', priority: '0.6', changefreq: 'monthly' },
  { path: '/voyages-sur-mesure', priority: '0.8', changefreq: 'monthly' },
  { path: '/plus-dactivites', priority: '0.7', changefreq: 'weekly' },
  { path: '/plus-a-explorer', priority: '0.7', changefreq: 'weekly' },
  { path: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
  { path: '/politique-confidentialite', priority: '0.3', changefreq: 'yearly' },
  { path: '/cgv', priority: '0.3', changefreq: 'yearly' },
];

// Fonction pour récupérer les articles de blog depuis Sanity
async function fetchBlogPosts() {
  try {
    const query = encodeURIComponent('*[_type == "blog"] | order(publishedAt desc) { "slug": slug.current, _updatedAt }');
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${SANITY_DATASET}?query=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.result) {
      return data.result.map(post => ({
        path: `/blog/${post.slug}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: post._updatedAt ? post._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]
      }));
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
}

// Fonction pour récupérer les visites guidées depuis Sanity
async function fetchGuidedTours() {
  try {
    const query = encodeURIComponent('*[_type == "guidedTours"] { "slug": slug.current, _updatedAt }');
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${SANITY_DATASET}?query=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.result) {
      return data.result.filter(tour => tour.slug).map(tour => ({
        path: `/visites-guidees/${tour.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: tour._updatedAt ? tour._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]
      }));
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des visites:', error);
    return [];
  }
}

// Génère l'entrée XML pour une URL
function generateUrlEntry(page) {
  const lastmod = page.lastmod || new Date().toISOString().split('T')[0];

  return `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}

// Génère le sitemap complet
async function generateSitemap() {
  console.log('Génération du sitemap...');

  // Récupérer le contenu dynamique
  const blogPosts = await fetchBlogPosts();
  const guidedTours = await fetchGuidedTours();

  console.log(`- ${staticPages.length} pages statiques`);
  console.log(`- ${blogPosts.length} articles de blog`);
  console.log(`- ${guidedTours.length} visites guidées`);

  // Combiner toutes les pages
  const allPages = [...staticPages, ...blogPosts, ...guidedTours];

  // Générer le XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(generateUrlEntry).join('\n')}
</urlset>`;

  // Écrire le fichier
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');

  console.log(`\nSitemap généré avec succès: ${outputPath}`);
  console.log(`Total: ${allPages.length} URLs`);
}

// Exécuter le script
generateSitemap().catch(console.error);
