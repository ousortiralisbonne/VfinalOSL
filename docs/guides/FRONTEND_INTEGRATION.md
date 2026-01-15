# Intégration Frontend avec Sanity

## Vue d'ensemble

Le frontend a été mis à jour pour utiliser des hooks spécialisés qui récupèrent les données depuis Sanity CMS. Ces hooks simplifient l'utilisation des données et assurent la cohérence entre les pages.

## Hooks disponibles

### `useRestaurants()`
Récupère les restaurants et leurs catégories.

```typescript
const { restaurants, cuisines, isLoading, error } = useRestaurants();
```

**Retourne :**
- `restaurants`: Liste des restaurants avec images optimisées
- `cuisines`: Catégories de cuisine disponibles
- `isLoading`: État de chargement
- `error`: Erreurs éventuelles

### `useBars()`
Récupère les bars et leurs types.

```typescript
const { bars, types, isLoading, error } = useBars();
```

### `useClubs()`
Récupère les clubs et leurs catégories.

```typescript
const { clubs, types, isLoading, error } = useClubs();
```

### `useEvents()`
Récupère les événements et leurs catégories.

```typescript
const { events, categories, isLoading, error } = useEvents();
```

### `useHotels()`
Récupère les hôtels et leurs catégories.

```typescript
const { hotels, categories, isLoading, error } = useHotels();
```

### `useBlogPosts()`
Récupère les articles de blog et leurs catégories.

```typescript
const { blogPosts, categories, isLoading, error } = useBlogPosts();
```

### `useGuidedTours()`
Récupère les tours guidés.

```typescript
const { tours, isLoading, error } = useGuidedTours();
```

### `useSports()`
Récupère les activités sportives.

```typescript
const { sports, isLoading, error } = useSports();
```

### `useBoatTrips()`
Récupère les croisières avec leurs types et localisations.

```typescript
const { cruises, locations, types, isLoading, error } = useBoatTrips();
```

### `useTransfers()`
Récupère les véhicules et services de transfert.

```typescript
const { vehicles, services, isLoading, error } = useTransfers();
```

### `useMoreActivities()`
Récupère les activités supplémentaires.

```typescript
const { activities, isLoading, error } = useMoreActivities();
```

### `useExploreMore()`
Récupère les contenus "Explore More".

```typescript
const { exploreItems, isLoading, error } = useExploreMore();
```

## Fonctionnalités

### Support multilingue automatique
Tous les hooks récupèrent automatiquement le contenu dans la langue actuelle de l'utilisateur (EN, FR, PT).

### Images optimisées
Les images sont automatiquement optimisées via `imgUrlBuilder` avec support des hotspots Sanity.

### Gestion d'erreurs
Chaque hook retourne un état d'erreur pour une gestion robuste des erreurs.

### État de chargement
Les hooks fournissent un état de chargement pour améliorer l'UX.

## Pages mises à jour

Les pages suivantes ont été mises à jour pour utiliser les nouveaux hooks :

- ✅ **Restaurants** - `useRestaurants()`
- ✅ **Bars** - `useBars()`
- ✅ **Blog** - `useBlogPosts()`
- ✅ **Hotels** - `useHotels()`
- ✅ **Transfers** - `useTransfers()`

## Avantages

1. **Code plus propre** : Moins de code dupliqué dans les pages
2. **Cohérence** : Même structure de données partout
3. **Performance** : Requêtes optimisées
4. **Maintenabilité** : Centralisation de la logique de récupération
5. **Type safety** : Types TypeScript complets

## Utilisation

```typescript
import { useRestaurants } from '../hooks/useSanityData';

const RestaurantsPage = () => {
  const { restaurants, cuisines, isLoading, error } = useRestaurants();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
```

## Migration

Pour migrer une page existante :

1. Remplacer `useFetch` par le hook spécialisé approprié
2. Supprimer la logique de transformation des données
3. Utiliser directement les données retournées
4. Mettre à jour les props du composant `Wrapper`

## Configuration

Les hooks utilisent automatiquement :
- Le client Sanity configuré (`sanityClient.ts`)
- La langue actuelle de l'utilisateur
- Les types TypeScript mis à jour
- L'optimisation d'images Sanity
