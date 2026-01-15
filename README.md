# Où Sortir à Lisbonne

Guide local francophone pour découvrir les meilleures sorties et expériences à Lisbonne.

**Site** : [ousortiralisbonne.com](https://www.ousortiralisbonne.com)

## Stack technique

| Technologie | Usage |
|-------------|-------|
| Vite + React 18 | Framework |
| TypeScript | Typage |
| Tailwind CSS | Styling |
| Sanity | CMS headless |
| react-i18next | Multilingue (FR/EN/PT) |
| Stripe | Paiements |
| Resend | Emails |
| Vercel | Hébergement |

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
```

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_SANITY_PROJECT_ID=z8eiwrv2
VITE_SANITY_DATASET=production
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_RESEND_API_KEY=re_xxx
```

## Structure du projet

```
src/
├── components/     # Composants React
├── pages/          # Pages de l'application
├── hooks/          # Custom hooks
├── types/          # Types TypeScript
├── config/         # Configuration (SEO, i18n)
├── i18n/           # Traductions FR/EN/PT
├── context/        # Contextes React
├── services/       # Services externes (Stripe)
├── utils/          # Fonctions utilitaires
└── sanityClient.ts # Client Sanity
```

## Documentation

| Dossier | Contenu |
|---------|---------|
| `docs/seo/` | Audits et checklists SEO |
| `docs/guides/` | Guides de déploiement et intégration |
| `docs/stripe/` | Configuration Stripe |
| `docs/fixes/` | Historique des corrections |

## Scripts

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run preview      # Preview du build
npm run lint         # ESLint
npm run sanity:dev   # Sanity Studio local
```

## Licence

Projet privé - Propul'SEO
