# Guide de migration des images vers Sanity

## Vue d'ensemble

Toutes les images existantes du projet peuvent maintenant être gérées via Sanity CMS. Le système utilise des composants avec fallback vers les images locales.

## Images existantes identifiées

### Images locales dans `src/images/`
- `bridge-portugal-beautiful-sunset.jpg` - Image hero principale
- `Logo.png` - Logo du site
- `newpics/about-personal-image.jpg` - Image personnelle page About
- `newpics/about-portugal-flag.jpg` - Drapeau portugais
- `newpics/pic1.png` - Image générale
- `newpics/sintra.jpg` - Image Sintra

### Images utilisées dans les composants
- **Hero** : `bridge-portugal-beautiful-sunset.jpg`
- **About** : `about-personal-image.jpg`, `about-portugal-flag.jpg`
- **PopularExperiences** : `sintra.jpg`
- **PageBanner** : Images de bannière pour chaque page

## Schéma Sanity créé

### `siteImages`
- **imageId** : Identifiant unique (ex: "hero-bridge", "about-personal")
- **title** : Titre multilingue de l'image
- **description** : Description multilingue
- **image** : Image Sanity avec hotspot
- **category** : Catégorie (hero, about, experiences, banners, general)
- **altText** : Texte alternatif multilingue
- **isActive** : Statut actif/inactif
- **order** : Ordre d'affichage

## Composants créés

### `SanityImage`
Composant réutilisable qui charge une image depuis Sanity avec fallback :

```typescript
<SanityImage
  imageId="hero-bridge"
  fallbackSrc={heroImgSrc}
  alt="Description de l'image"
  className="w-full h-auto"
/>
```

### `PageBanner`
Composant pour les bannières de pages avec support Sanity.

## Hooks disponibles

- `useSiteImages()` - Toutes les images actives
- `useSiteImagesByCategory(category)` - Images par catégorie
- `useSiteImage(imageId)` - Image spécifique

## Migration dans Sanity Studio

### 1. Accéder au studio
```bash
npm run sanity:dev
```

### 2. Créer les images dans "Site Images"

#### Image Hero
- **Image ID** : `hero-bridge`
- **Title** : 
  - EN: "Lisbon Bridge Sunset"
  - FR: "Coucher de soleil sur le pont de Lisbonne"
  - PT: "Pôr do sol na ponte de Lisboa"
- **Category** : `hero`
- **Image** : Uploader `bridge-portugal-beautiful-sunset.jpg`

#### Image About Personnelle
- **Image ID** : `about-personal`
- **Title** :
  - EN: "Personal Photo"
  - FR: "Photo personnelle"
  - PT: "Foto pessoal"
- **Category** : `about`
- **Image** : Uploader `about-personal-image.jpg`

#### Image Sintra
- **Image ID** : `sintra-palace`
- **Title** :
  - EN: "Sintra Palace"
  - FR: "Palais de Sintra"
  - PT: "Palácio de Sintra"
- **Category** : `experiences`
- **Image** : Uploader `sintra.jpg`

#### Images de bannières
Pour chaque page, créer une image de bannière :

- **Image ID** : `banner-restaurants`
- **Title** :
  - EN: "Restaurants Banner"
  - FR: "Bannière Restaurants"
  - PT: "Banner Restaurantes"
- **Category** : `banners`
- **Image** : Uploader l'image de bannière correspondante

### 3. Créer les bannières de pages

Dans "Page Banners", créer une bannière pour chaque page :

#### Restaurants
- **Page ID** : `restaurants`
- **Title** :
  - EN: "Best Restaurants in Lisbon"
  - FR: "Meilleurs restaurants de Lisbonne"
  - PT: "Melhores restaurantes de Lisboa"
- **Subtitle** :
  - EN: "Discover authentic Portuguese cuisine"
  - FR: "Découvrez la cuisine portugaise authentique"
  - PT: "Descubra a culinária portuguesa autêntica"
- **Banner Image** : Référencer `banner-restaurants`

## Composants mis à jour

### ✅ Hero
- Utilise `SanityImage` avec imageId "hero-bridge"
- Fallback vers `bridge-portugal-beautiful-sunset.jpg`

### ✅ About
- Utilise `SanityImage` avec imageId "about-personal"
- Fallback vers `about-personal-image.jpg`

### ✅ PageBanner
- Composant réutilisable pour toutes les pages
- Support Sanity avec fallbacks

## Avantages de la migration

1. **Gestion centralisée** : Toutes les images dans Sanity
2. **Optimisation automatique** : Images optimisées par Sanity
3. **Multilingue** : Alt text et descriptions multilingues
4. **Fallbacks** : Images locales en cas de problème
5. **Hotspots** : Zones d'intérêt sur les images
6. **Performance** : CDN Sanity pour les images

## Prochaines étapes

1. **Démarrer le studio Sanity** : `npm run sanity:dev`
2. **Uploader les images** dans "Site Images"
3. **Créer les bannières** dans "Page Banners"
4. **Tester les composants** avec les nouvelles images
5. **Mettre à jour les autres composants** qui utilisent des images

## Commandes utiles

```bash
# Démarrer le studio Sanity
npm run sanity:dev

# Build du studio
npm run sanity:build

# Déployer le studio
npm run sanity:deploy
```

## Structure des images dans Sanity

```
Site Images/
├── hero-bridge (bridge-portugal-beautiful-sunset.jpg)
├── about-personal (about-personal-image.jpg)
├── sintra-palace (sintra.jpg)
├── banner-restaurants
├── banner-bars
├── banner-clubs
└── ...

Page Banners/
├── restaurants
├── bars
├── clubs
├── events
└── ...
```
