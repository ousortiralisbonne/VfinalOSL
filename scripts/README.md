# Scripts de Configuration du Blog

Ce dossier contient des scripts pour configurer et gérer le contenu du blog dans Sanity.

## Prérequis

1. **Token Sanity** : Vous devez avoir un token d'API Sanity avec les permissions d'écriture
2. **Variables d'environnement** : Créez un fichier `.env` à la racine du projet avec :
   ```
   SANITY_TOKEN=votre_token_ici
   ```

## Scripts Disponibles

### 1. `setup-blog.js` (Recommandé)
Script principal qui configure tout le blog en une fois :
- Crée les catégories de blog
- Ajoute des articles de blog complets
- Configure les slugs automatiquement

```bash
node scripts/setup-blog.js
```

### 2. `check-blog-posts.js`
Vérifie les articles de blog existants dans Sanity :

```bash
node scripts/check-blog-posts.js
```

### 3. `update-blog-slugs.js`
Met à jour les slugs des articles existants :

```bash
node scripts/update-blog-slugs.js
```

### 4. `add-blog-categories.js`
Ajoute uniquement les catégories de blog :

```bash
node scripts/add-blog-categories.js
```

## Articles Inclus

Le script `setup-blog.js` crée automatiquement :

1. **Les 7 Collines de Lisbonne** - Guide complet des collines de Lisbonne
2. **Le Fado à Lisbonne** - Guide de la musique traditionnelle portugaise

## Catégories Créées

- **Activités** - Activités et attractions
- **Culture** - Culture et traditions
- **Gastronomie** - Restaurants et cuisine

## Prochaines Étapes

Après avoir exécuté les scripts :

1. **Ajouter des images** : Connectez-vous à Sanity Studio pour ajouter des images aux articles
2. **Tester le blog** : Visitez `/blog` pour voir les articles
3. **Cliquer sur les articles** : Les articles s'ouvrent maintenant dans des pages dédiées

## Dépannage

### Erreur de Token
Si vous obtenez une erreur d'authentification :
1. Vérifiez que votre token Sanity est correct
2. Assurez-vous que le token a les permissions d'écriture
3. Vérifiez que le fichier `.env` est à la racine du projet

### Articles Non Visibles
Si les articles ne s'affichent pas :
1. Vérifiez que les slugs sont correctement générés
2. Redémarrez le serveur de développement
3. Vérifiez la console pour les erreurs

## Support

Pour toute question ou problème, vérifiez :
1. Les logs de la console
2. L'état de Sanity Studio
3. La configuration du client Sanity
