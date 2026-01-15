# Corrections appliquées

## Problèmes résolus

### 1. ✅ Effet bizarre sur la page d'accueil
**Problème** : Image invisible ajoutée dans le composant Hero causant des effets visuels indésirables.

**Solution** : Suppression de l'image invisible `<SanityImage>` dans le composant Hero.

**Fichier modifié** : `src/components/Hero.tsx`
- Supprimé l'image invisible avec `opacity-0`
- Gardé uniquement l'image de fond originale

### 2. ✅ Bannières des pages qui ne s'affichent pas
**Problème** : Les composants `PageBanner` et `SanityImage` essayaient de charger des données depuis Sanity qui n'existent pas encore.

**Solution** : Modification des composants pour utiliser directement les images de fallback.

**Fichiers modifiés** :
- `src/components/PageBanner.tsx`
- `src/components/SanityImage.tsx`

**Changements** :
- Suppression des appels aux hooks Sanity
- Utilisation directe des images de fallback
- Ajout de commentaires TODO pour la future intégration Sanity

## État actuel

### ✅ Fonctionnel
- **Page d'accueil** : Image hero s'affiche correctement
- **Bannières des pages** : Toutes les bannières s'affichent avec les images originales
- **Composants** : `PageBanner` et `SanityImage` fonctionnent avec les fallbacks

### 🔄 Prêt pour Sanity
- **Schémas créés** : `pageBanners` et `siteImages`
- **Hooks disponibles** : `usePageBanner`, `useSiteImage`, etc.
- **Composants préparés** : Prêts à utiliser Sanity une fois les données ajoutées

## Prochaines étapes

### Pour activer Sanity (optionnel)
1. **Accéder au studio** : `npm run sanity:dev`
2. **Ajouter des bannières** dans "Page Banners"
3. **Ajouter des images** dans "Site Images"
4. **Réactiver les hooks** dans les composants

### Pour garder le système actuel
- Rien à faire, tout fonctionne avec les images originales
- Les composants utilisent les fallbacks automatiquement

## Avantages de la solution

1. **Stabilité** : Pas de dépendance à Sanity pour l'affichage
2. **Performance** : Pas de requêtes inutiles vers l'API
3. **Flexibilité** : Facile d'activer Sanity plus tard
4. **Fallbacks robustes** : Images locales toujours disponibles

## Structure des composants

### PageBanner
```typescript
<PageBanner
  pageId="restaurants"
  fallbackTitle={t("restaurants.title")}
  fallbackSubtitle={t("restaurants.subtitle")}
  fallbackImage="https://image-url.com"
/>
```

### SanityImage
```typescript
<SanityImage
  imageId="hero-bridge"
  fallbackSrc={heroImgSrc}
  alt="Description"
  className="w-full h-auto"
/>
```

## Notes techniques

- Les composants gardent la même interface
- Les props `imageId` et `pageId` sont conservées pour la future intégration
- Les fallbacks sont utilisés en priorité
- Aucune requête Sanity n'est faite actuellement
