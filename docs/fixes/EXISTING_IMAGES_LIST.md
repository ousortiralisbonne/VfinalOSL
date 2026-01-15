# Liste des images existantes à migrer vers Sanity

## Images dans `src/images/`

### Images principales
- `bridge-portugal-beautiful-sunset.jpg` → **imageId**: `hero-bridge`
- `Logo.png` → **imageId**: `site-logo`

### Images dans `newpics/`
- `about-personal-image.jpg` → **imageId**: `about-personal`
- `about-portugal-flag.jpg` → **imageId**: `about-portugal-flag`
- `pic1.png` → **imageId**: `general-pic1`
- `sintra.jpg` → **imageId**: `sintra-palace`

## Images utilisées dans les composants

### Hero.tsx
- **Image actuelle** : `bridge-portugal-beautiful-sunset.jpg`
- **ImageId Sanity** : `hero-bridge`
- **Catégorie** : `hero`
- **Composant** : ✅ Mis à jour avec `SanityImage`

### About.tsx
- **Image actuelle** : `about-personal-image.jpg`
- **ImageId Sanity** : `about-personal`
- **Catégorie** : `about`
- **Composant** : ✅ Mis à jour avec `SanityImage`

### PopularExperiences.tsx
- **Image actuelle** : `sintra.jpg`
- **ImageId Sanity** : `sintra-palace`
- **Catégorie** : `experiences`
- **Composant** : ⏳ À mettre à jour

## Images de bannières des pages

### Pages avec bannières hardcodées
- **Restaurants** : URL Google Drive → **imageId**: `banner-restaurants`
- **Bars** : URL Unsplash → **imageId**: `banner-bars`
- **Clubs** : URL Google Drive → **imageId**: `banner-clubs`
- **Events** : URL Unsplash → **imageId**: `banner-events`
- **Hotels** : URL Unsplash → **imageId**: `banner-hotels`
- **Blog** : URL Google Drive → **imageId**: `banner-blog`
- **Transfers** : URL Google Drive → **imageId**: `banner-transfers`
- **Boat Trips** : URL Google Drive → **imageId**: `banner-boat-trips`
- **Guided Tours** : URL Google Drive → **imageId**: `banner-guided-tours`
- **Sports** : URL Unsplash → **imageId**: `banner-sports`
- **More Activities** : URL Unsplash → **imageId**: `banner-more-activities`
- **More Explore** : URL Unsplash → **imageId**: `banner-more-explore`
- **Custom Tours** : URL Unsplash → **imageId**: `banner-custom-tours`

## Plan de migration

### Phase 1 : Images principales ✅
- [x] Hero image
- [x] About personal image
- [x] Schéma Sanity créé
- [x] Composants mis à jour

### Phase 2 : Images restantes
- [ ] Sintra image (PopularExperiences)
- [ ] Logo du site
- [ ] Images générales

### Phase 3 : Bannières de pages
- [ ] Toutes les bannières de pages
- [ ] Mise à jour des composants PageBanner

## Configuration Sanity Studio

### Images à créer dans "Site Images"

1. **hero-bridge**
   - Category: `hero`
   - Title: "Lisbon Bridge Sunset"
   - Image: `bridge-portugal-beautiful-sunset.jpg`

2. **about-personal**
   - Category: `about`
   - Title: "Personal Photo"
   - Image: `about-personal-image.jpg`

3. **sintra-palace**
   - Category: `experiences`
   - Title: "Sintra Palace"
   - Image: `sintra.jpg`

4. **site-logo**
   - Category: `general`
   - Title: "Site Logo"
   - Image: `Logo.png`

### Bannières à créer dans "Page Banners"

1. **restaurants**
   - Page ID: `restaurants`
   - Title: "Best Restaurants in Lisbon"
   - Banner Image: Référencer `banner-restaurants`

2. **bars**
   - Page ID: `bars`
   - Title: "Best Bars in Lisbon"
   - Banner Image: Référencer `banner-bars`

3. **clubs**
   - Page ID: `clubs`
   - Title: "Best Clubs in Lisbon"
   - Banner Image: Référencer `banner-clubs`

... (continuer pour toutes les pages)

## Avantages de la migration

- **Gestion centralisée** des images
- **Optimisation automatique** par Sanity
- **Support multilingue** pour les alt text
- **Fallbacks** vers les images locales
- **Hotspots** pour les zones d'intérêt
- **CDN** pour de meilleures performances
