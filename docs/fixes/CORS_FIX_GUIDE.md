# Guide de résolution des erreurs CORS Sanity

## Problème
L'erreur CORS indique que le projet Sanity n'autorise pas les requêtes depuis `localhost:5174`.

## Solutions

### 1. Configuration CORS dans Sanity Studio

Accédez au studio Sanity et configurez les paramètres CORS :

1. **Ouvrir le studio Sanity** :
   ```bash
   npm run sanity:dev
   ```

2. **Aller dans les paramètres du projet** :
   - Cliquer sur l'icône de paramètres (⚙️)
   - Sélectionner "API"
   - Aller dans l'onglet "CORS origins"

3. **Ajouter les origines autorisées** :
   - `http://localhost:5173`
   - `http://localhost:5174`
   - `http://localhost:3000`
   - Votre domaine de production

### 2. Alternative : Utiliser un token API

Si les paramètres CORS ne fonctionnent pas, utilisez un token API :

1. **Créer un token API** :
   - Dans Sanity Studio → Settings → API
   - Cliquer sur "Add API token"
   - Nommer le token (ex: "Frontend Access")
   - Sélectionner "Read" permissions
   - Copier le token généré

2. **Configurer le token** :
   ```bash
   # Créer un fichier .env.local
   echo "VITE_SANITY_TOKEN=your_token_here" > .env.local
   ```

3. **Mettre à jour sanityClient.ts** :
   ```typescript
   const sanityClient = createClient({
     projectId: "z8eiwrv2",
     dataset: "production",
     apiVersion: "2023-05-03",
     useCdn: true,
     token: import.meta.env.VITE_SANITY_TOKEN,
   });
   ```

### 3. Vérification du dataset

Assurez-vous que le dataset "production" existe et contient des données :

1. **Vérifier dans Sanity Studio** :
   - Aller dans "Content"
   - Vérifier que le dataset "production" est sélectionné
   - Vérifier qu'il contient des documents

2. **Tester avec une requête simple** :
   ```javascript
   // Dans la console du navigateur
   fetch('https://z8eiwrv2.api.sanity.io/v2023-05-03/data/query/production?query=*[_type=="restaurantCategories"][0..5]')
     .then(r => r.json())
     .then(console.log)
   ```

### 4. Désactiver le CDN (solution temporaire)

Si les solutions précédentes ne fonctionnent pas, vous pouvez désactiver le CDN temporairement :

1. **Créer un fichier `.env` à la racine** :
   ```bash
   VITE_SANITY_USE_CDN=false
   ```

2. **Redémarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

⚠️ **Note** : Désactiver le CDN peut ralentir les requêtes. Utilisez cette solution uniquement en développement.

### 5. Configuration alternative

Si le problème persiste, essayez cette configuration :

```typescript
const sanityClient = createClient({
  projectId: "z8eiwrv2",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false, // Désactiver le CDN
  perspective: "published",
});
```

## Commandes utiles

```bash
# Démarrer le studio Sanity
npm run sanity:dev

# Vérifier la configuration
npm run sanity:build

# Redémarrer le serveur de développement
npm run dev
```

## Vérification

Après avoir appliqué une solution :

1. Ouvrir les outils de développement (F12)
2. Aller dans l'onglet Network
3. Recharger la page
4. Vérifier que les requêtes vers `z8eiwrv2.api.sanity.io` retournent un statut 200

## Support

Si le problème persiste :
- Vérifier les logs dans la console du navigateur
- Vérifier les paramètres du projet Sanity
- Contacter le support Sanity si nécessaire
