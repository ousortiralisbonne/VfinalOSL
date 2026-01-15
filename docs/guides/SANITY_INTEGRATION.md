# Intégration Sanity CMS

## Vue d'ensemble

Le projet a été intégré avec Sanity CMS pour la gestion de contenu. Le backend Sanity contient tous les schémas nécessaires pour gérer le contenu du site.

## Structure

### Dossier `sanity/`
- `sanity.config.js` - Configuration principale de Sanity
- `sanity.cli.js` - Configuration CLI de Sanity
- `schemaTypes/` - Tous les schémas de contenu

### Schémas disponibles
- **Blog** : `blogPosts`, `blogCategories`, `blockContent`
- **Restaurants** : `restaurants`, `restaurantCategories`
- **Bars** : `bars`, `barCategories`
- **Clubs** : `clubs`, `clubCategories`
- **Événements** : `events`, `eventCategories`
- **Hôtels** : `hotels`, `hotelCategories`
- **Tours guidés** : `guidedTours`
- **Sports** : `sports`
- **Croisières** : `boatTripCruise`, `boatTripCruiseType`, `boatTripLocation`
- **Transports** : `vehicles`, `services`
- **Activités** : `moreActivities`, `exploreMore`

## Configuration

### Project ID
- **Project ID** : `z8eiwrv2`
- **Dataset** : `production`

### Types TypeScript
Tous les types ont été mis à jour dans `src/types/index.ts` pour correspondre aux schémas Sanity :
- Support multilingue (EN, FR, PT)
- Types Sanity (images, références)
- Interfaces pour tous les contenus

## Commandes disponibles

```bash
# Démarrer le studio Sanity
npm run sanity:dev

# Build du studio Sanity
npm run sanity:build

# Déployer le studio Sanity
npm run sanity:deploy
```

## Utilisation

1. **Démarrer le studio** : `npm run sanity:dev`
2. **Accéder au studio** : http://localhost:3333
3. **Gérer le contenu** via l'interface Sanity
4. **Le frontend** récupère automatiquement les données via `sanityClient.ts`

## Multilingue

Tous les contenus supportent 3 langues :
- **EN** : Anglais
- **FR** : Français  
- **PT** : Portugais

Les champs multilingues utilisent la structure :
```typescript
{
  en: string,
  fr: string,
  pt: string
}
```

## Images

Les images sont gérées par Sanity avec support des hotspots et optimisations automatiques.

## Références

- [Documentation Sanity](https://www.sanity.io/docs)
- [Sanity Studio](https://www.sanity.io/studio)
