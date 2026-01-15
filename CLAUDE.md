# CLAUDE.md - Contexte Projet "Où Sortir à Lisbonne"

> Ce fichier fournit le contexte complet du projet pour Claude/Cursor AI.
> Placé à la racine du projet, il est lu automatiquement.
> Dernière mise à jour : Décembre 2025

---

## 🎯 PROJET

**Où Sortir à Lisbonne** est une plateforme SaaS de guide local pour découvrir les meilleures sorties et expériences à Lisbonne.

### Objectif
Fournir aux touristes francophones (et anglophones/lusophones) un guide complet pour :
- Découvrir les meilleurs restaurants, bars, clubs et hôtels
- Réserver des visites guidées en français
- Organiser des croisières et sorties en bateau sur le Tage
- Réserver des transferts aéroport
- Créer des voyages sur mesure
- Découvrir les événements et activités de la ville

### URL du site
https://www.ousortiralisbonne.com (production)

### État actuel
- **Frontend** : En production
- **CMS** : Sanity (contenu géré via le Studio)
- **Multilingue** : FR / EN / PT
- **SEO** : Score 85/100, objectif 95/100
- **Mobile** : Optimisé (Décembre 2025)

---

## 🛠️ STACK TECHNIQUE

| Technologie | Version | Usage |
|-------------|---------|-------|
| Vite | 7.x | Build tool |
| React | 18.3 | UI Library |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 3.4 | Styling |
| React Router DOM | 6.x | Routing |
| Sanity | 3.x | Headless CMS |
| react-i18next | 14.x | Internationalisation |
| Lucide React | 0.344 | Icônes |
| Resend | 3.x | Envoi d'emails |
| Swiper | 12.x | Carrousels |
| date-fns | 4.x | Manipulation de dates |

---

## 📁 STRUCTURE DU PROJET
```
ousortirlisbonne-front-end/
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── shared/              # Composants partagés (Card, Rating, etc.)
│   │   ├── cruise/              # Composants liés aux croisières
│   │   ├── tours/               # Composants liés aux visites guidées
│   │   ├── Navbar.tsx           # Navigation principale
│   │   ├── Footer.tsx           # Pied de page
│   │   ├── Hero.tsx             # Section hero accueil
│   │   ├── SEO.tsx              # Gestion des meta tags
│   │   ├── StructuredData.tsx   # Données structurées JSON-LD
│   │   └── ...
│   │
│   ├── pages/                   # Pages de l'application
│   │   ├── BlogCategories/      # Pages catégories blog
│   │   ├── Restaurants.tsx
│   │   ├── Bars.tsx
│   │   ├── Clubs.tsx
│   │   ├── Events.tsx
│   │   ├── Hotels.tsx
│   │   ├── GuidedTours.tsx
│   │   ├── BoatTrips.tsx
│   │   ├── Sports.tsx
│   │   ├── Transfers.tsx
│   │   ├── CustomTours.tsx
│   │   ├── Blog.tsx
│   │   ├── About.tsx
│   │   └── ...
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── resend/              # Hooks pour envoi d'emails (formulaires)
│   │   ├── useSanityData.tsx    # Hook pour récupérer données Sanity
│   │   ├── useFetch.tsx         # Hook générique de fetch
│   │   ├── useScrollAnimation.ts
│   │   └── useNewsletterSubscription.tsx
│   │
│   ├── types/                   # Types TypeScript
│   │   └── index.ts             # Toutes les interfaces (Restaurant, Event, etc.)
│   │
│   ├── config/                  # Configuration
│   │   ├── seoConfig.ts         # SEO par page (title, description, keywords)
│   │   └── i18n.ts              # Configuration i18next
│   │
│   ├── i18n/                    # Internationalisation
│   │   ├── locales/
│   │   │   ├── fr.json          # Traductions françaises
│   │   │   ├── en.json          # Traductions anglaises
│   │   │   └── pt.json          # Traductions portugaises
│   │   └── index.ts
│   │
│   ├── context/                 # Contextes React
│   │   └── FavoritesContext.tsx # Gestion des favoris utilisateur
│   │
│   ├── data/                    # Données statiques
│   │   └── cruises.ts           # Données des croisières
│   │
│   ├── utils/                   # Fonctions utilitaires
│   │   ├── seo.ts               # Helpers SEO
│   │   ├── formatDate.ts        # Formatage de dates
│   │   ├── analytics.ts         # Analytics / Pixel tracking
│   │   ├── email.ts             # Helpers email
│   │   ├── imgUrlBuilder.ts     # Builder URL images Sanity
│   │   ├── imageLoader.ts       # Chargement optimisé images
│   │   └── cruiseUtils.ts       # Utilitaires croisières
│   │
│   ├── images/                  # Images statiques
│   ├── screens/                 # Écrans (HomePage)
│   ├── sanityClient.ts          # Client Sanity configuré
│   ├── App.tsx                  # Composant racine avec routes
│   ├── main.tsx                 # Point d'entrée
│   └── vite-env.d.ts
│
├── public/                      # Assets publics
├── sanity/                      # Configuration Sanity Studio
├── vite.config.ts               # Configuration Vite
├── tailwind.config.js           # Configuration Tailwind
├── tsconfig.json
└── package.json
```

---

## 📝 CONVENTIONS DE CODE

### Nommage
| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `Navbar.tsx`, `BookingModal.tsx` |
| Pages | PascalCase | `Restaurants.tsx`, `BoatTrips.tsx` |
| Hooks | camelCase + use | `useSanityData.tsx`, `useFetch.tsx` |
| Utils | camelCase | `formatDate.ts`, `imgUrlBuilder.ts` |
| Types/Interfaces | PascalCase | `Restaurant`, `BlogPost`, `MultilingualContent` |
| Fichiers config | camelCase | `seoConfig.ts`, `i18n.ts` |

### Langue
- **Code** : Anglais (noms de variables, fonctions, composants)
- **Commentaires** : Français
- **Contenu** : Multilingue (FR/EN/PT) via fichiers JSON i18n

### Imports (ordre obligatoire)
```typescript
// 1. Imports React/externes
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// 2. Imports composants locaux
import Navbar from "./components/Navbar";
import { Card } from "./components/shared/Card";

// 3. Imports hooks/utils
import { useSanityData } from "./hooks/useSanityData";
import { formatDate } from "./utils/formatDate";

// 4. Imports types
import type { Restaurant, MultilingualContent } from "./types";

// 5. Imports images/assets
import logoSrc from "./images/Logo.png";
```

### Structure d'un composant
```typescript
// 1. Imports
import { useState } from "react";
import { useTranslation } from "react-i18next";

// 2. Types locaux (si nécessaire)
interface MonComposantProps {
  title: string;
  onAction: () => void;
}

// 3. Composant
const MonComposant = ({ title, onAction }: MonComposantProps) => {
  // Hooks
  const { t, i18n } = useTranslation();
  const [state, setState] = useState(false);

  const currentLang = i18n.language as 'fr' | 'en' | 'pt';

  // Handlers
  const handleClick = () => {
    onAction();
  };

  // Render
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button onClick={handleClick} className="btn-primary">
        {t("common.action")}
      </button>
    </div>
  );
};

export default MonComposant;
```

---

## 📱 OPTIMISATIONS MOBILE (Décembre 2025)

### Classes utilitaires disponibles (index.css)
| Classe | Usage |
|--------|-------|
| `pb-safe`, `pt-safe` | Safe areas iPhone (notch/home indicator) |
| `safe-area-bottom`, `safe-area-top` | Safe areas avec padding minimum |
| `touch-target` | Zone tactile 44x44px (Apple HIG) |
| `touch-target-lg` | Zone tactile 48x48px |
| `touch-manipulation` | Améliore réactivité tactile |
| `modal-mobile-fullscreen` | Modal plein écran mobile |
| `modal-mobile-sheet` | Modal bottom sheet mobile |

### Patterns mobile OBLIGATOIRES

#### Boutons
```tsx
// Minimum 44x44px, idéal 48-52px
<button className="min-h-[52px] py-4 text-base font-semibold touch-manipulation">
  {t("common.submit")}
</button>

// Bouton close modal
<button className="min-w-[44px] min-h-[44px] flex items-center justify-center">
  <X size={24} />
</button>
```

#### Inputs
```tsx
// Minimum 48px pour éviter le zoom iOS
<input className="min-h-[48px] py-3 text-base w-full" />
```

#### Modals
```tsx
// Fullscreen mobile, centré desktop
<div className="
  fixed inset-0 z-50
  w-full h-full
  md:h-auto md:max-w-lg md:max-h-[90vh] md:rounded-xl
  overflow-y-auto
">
  {/* Header sticky */}
  <div className="sticky top-0 z-10 bg-white border-b p-4">
    <h2>{title}</h2>
    <button className="min-w-[44px] min-h-[44px]">
      <X />
    </button>
  </div>

  {/* Contenu */}
  <div className="p-4">{children}</div>

  {/* Footer avec safe area */}
  <div className="sticky bottom-0 bg-white border-t p-4 safe-area-bottom">
    {actions}
  </div>
</div>
```

#### Carrousels (sections répétitives)
```tsx
// Mobile : 1 élément + flèches en dessous
// Desktop : grille normale
// Utiliser Swiper.js

<div className="block md:hidden">
  <Swiper slidesPerView={1} spaceBetween={16}>
    {items.map(item => (
      <SwiperSlide key={item.id}>
        <Card {...item} />
      </SwiperSlide>
    ))}
  </Swiper>
  {/* Flèches centrées sous le carrousel */}
  <div className="flex justify-center gap-4 mt-4">
    <button className="swiper-prev w-10 h-10 rounded-full border" />
    <button className="swiper-next w-10 h-10 rounded-full border" />
  </div>
</div>

<div className="hidden md:grid md:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

#### Typographie responsive
```tsx
// Titres
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
<h3 className="text-xl sm:text-2xl md:text-3xl font-medium">

// Corps de texte
<p className="text-base md:text-lg leading-relaxed">
```

### Modals optimisés
| Fichier | Status |
|---------|--------|
| `ActivityModal.tsx` | ✅ Fullscreen mobile, header sticky |
| `BookingModal.tsx` | ✅ DayPicker z-index fix, safe-area |
| `FavoritesDrawer.tsx` | ✅ Boutons stacked mobile |
| `RomanticModal.tsx` | ✅ Fullscreen mobile |
| `SetubalModal.tsx` | ✅ Fullscreen mobile |
| `BookingRestaurantModal.tsx` | ✅ Fullscreen mobile |

---

## 🔍 SEO

### Score actuel : 85/100 → Objectif : 95/100

### Configuration centralisée
Fichier `src/config/seoConfig.ts` contenant les meta tags pour chaque page en 3 langues.

### Composant SEO
```typescript
import SEO from "./components/SEO";
import { getSEOForPage } from "./config/seoConfig";

const MyPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const seo = getSEOForPage('mypage', lang);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      {/* contenu */}
    </>
  );
};
```

### Données structurées
Composant `StructuredData.tsx` pour les schémas JSON-LD dynamiques.

### Mots-clés cibles
| Mot-clé | Langue | Volume mensuel |
|---------|--------|----------------|
| restaurant Lisbonne | FR | ~12,000 |
| Lisbon restaurants | EN | ~18,000 |
| hôtel Lisbonne | FR | ~8,000 |
| que faire Lisbonne | FR | ~10,000 |
| visite guidée Lisbonne français | FR | longue traîne |

### Priorités SEO
- [x] Composant SEO sur toutes les pages
- [x] Schema.org de base (TravelAgency, Organization, WebSite)
- [x] Hreflang multilingue (FR/EN/PT)
- [x] Meta tags optimisés
- [ ] Schema.org dynamique par établissement (Restaurant, Hotel, Bar)
- [ ] Contenu riche + FAQ sur pages principales
- [ ] FAQPage schema JSON-LD
- [ ] Sitemap dynamique avec pages individuelles
- [ ] Pages individuelles `/restaurants/[slug]`, `/hotels/[slug]`

---

## 🌍 MULTILINGUE

### Langues supportées
- **FR** : Français (langue par défaut)
- **EN** : Anglais
- **PT** : Portugais

### Usage
```typescript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'fr' | 'en' | 'pt';

  return <h1>{t("hero.title.discover")}</h1>;
};
```

### Contenu multilingue Sanity
```typescript
interface MultilingualContent {
  en: string;
  fr: string;
  pt: string;
}

const getLocalizedContent = (content: MultilingualContent, lang: string) => {
  return content[lang as keyof MultilingualContent] || content.fr;
};
```

### Fichiers de traduction
- `src/i18n/locales/fr.json`
- `src/i18n/locales/en.json`
- `src/i18n/locales/pt.json`

---

## 📊 SANITY CMS

### Configuration
```typescript
// src/sanityClient.ts
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "z8eiwrv2",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
});
```

### Types de contenu
- `restaurant`, `bar`, `club`, `event`, `hotel`
- `guidedTour`, `boatTripCruise`, `blogPost`
- `category`, `pageBanner`, `siteImage`

### Hook de récupération
```typescript
import { useSanityData } from "./hooks/useSanityData";

const { data, loading, error } = useSanityData<Restaurant[]>(
  '*[_type == "restaurant"]'
);
```

---

## 🔗 ROUTES PRINCIPALES

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Accueil |
| `/restaurants` | Restaurants | Liste restaurants |
| `/bars` | Bars | Liste bars |
| `/clubs` | Clubs | Liste clubs |
| `/events` | Events | Événements |
| `/hotels` | Hotels | Liste hôtels |
| `/visites-guidees` | GuidedTours | Visites guidées |
| `/bateaux-lisbonne` | BoatTrips | Croisières |
| `/activities/sports` | Sports | Activités sportives |
| `/sur-mesure` | CustomTours | Tours personnalisés |
| `/transfers` | Transfers | Transferts aéroport |
| `/blog` | Blog | Articles |
| `/blog/:slug` | BlogPost | Article individuel |
| `/a-propos` | About | À propos |
| `/studio` | Studio | Sanity Studio (admin) |

---

## 📧 FORMULAIRES & EMAILS

### API : Resend

### Hooks disponibles
- `useResendBookingForm` - Réservations génériques
- `useResendCruiseForm` - Réservations croisières
- `useResendRomanticForm` - Réservations romantiques
- `useResendTransferForm` - Réservations transferts
- `useResendCustomToursForm` - Demandes sur mesure
- `useResendHomeForm` - Formulaire page accueil
- `useResendFavoritesForm` - Envoi de favoris
- `useNewsletterSubscription` - Newsletter

---

## 🚀 COMMANDES
```bash
# Développement
npm run dev              # Serveur Vite (localhost:5173)

# Production
npm run build            # Build production
npm run preview          # Preview build

# Qualité
npm run lint             # ESLint

# Sanity
npm run sanity:dev       # Sanity Studio local
npm run sanity:build     # Build Studio
npm run sanity:deploy    # Déploie Studio

# Analyse
npm run analyze          # Analyse bundles
```

---

## ✅ CE QUE L'IA DOIT TOUJOURS FAIRE

1. **Utiliser Tailwind CSS** pour tout le styling
2. **Utiliser `useTranslation()`** pour tout texte affiché
3. **Typer en TypeScript** tous les composants et fonctions
4. **Respecter la structure des fichiers** existante
5. **Mettre à jour les traductions** dans les 3 langues (FR/EN/PT)
6. **Utiliser le lazy loading** pour les nouvelles pages
7. **Optimiser pour mobile** (zones tactiles 44-48px, safe areas)
8. **Tester le responsive** (mobile first, breakpoint 768px)
9. **Ajouter les meta SEO** pour toute nouvelle page
10. **Utiliser Swiper.js** pour les carrousels mobile

---

## ❌ CE QUE L'IA NE DOIT JAMAIS FAIRE

1. **Ne jamais utiliser `any`** - toujours typer correctement
2. **Ne jamais hardcoder du texte** - utiliser i18n
3. **Ne jamais utiliser de CSS inline** pour du styling complexe
4. **Ne jamais ignorer le multilingue** - FR/EN/PT obligatoires
5. **Ne jamais laisser de `console.log`** en production
6. **Ne jamais modifier `sanityClient.ts`** sans raison valable
7. **Ne jamais créer de nouvelles dépendances** sans demander
8. **Ne jamais supprimer de traductions existantes**
9. **Ne jamais créer de boutons < 44px** sur mobile
10. **Ne jamais oublier les safe areas** sur les modals/footers fixes

---

## 🎯 TODO ACTUEL (Décembre 2025)

### Mobile ✅ TERMINÉ
- [x] Modals fullscreen mobile
- [x] Safe areas iPhone
- [x] Zones tactiles 44-48px
- [x] Typographie responsive
- [ ] Carrousels Home (sections répétitives)

### SEO 🔄 EN COURS
- [ ] StructuredData.tsx dynamique (Restaurant, Hotel, Bar schemas)
- [ ] Contenu riche + FAQ pages principales
- [ ] FAQPage schema JSON-LD
- [ ] Sitemap dynamique
- [ ] Pages individuelles `/restaurants/[slug]`

---

## 📞 CONTACT

**Propul'SEO** - Agence digitale spécialisée web & SEO
- Projet : Où Sortir à Lisbonne
- Site : https://www.ousortiralisbonne.com
- Guide local francophone à Lisbonne
