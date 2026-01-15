# 🚀 GUIDE DE DÉPLOIEMENT - OÙ SORTIR À LISBONNE

## ✅ PRÉREQUIS

Avant de déployer, vérifiez que :
- ✅ Le build compile sans erreur (`npm run build`)
- ✅ Tous les tests passent
- ✅ Les traductions FR/EN/PT sont complètes
- ✅ Les fichiers SEO sont en place (robots.txt, sitemap.xml)
- ✅ Les variables d'environnement sont configurées

---

## 📋 CHECKLIST PRÉ-DÉPLOIEMENT

### 1. Variables d'environnement
Créer un fichier `.env.production` avec :

```env
# Sanity CMS
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx

# Resend Email
VITE_RESEND_API_KEY=re_xxxxx

# Bot-One Chatbot
VITE_BOTMAKER_ID=c06a9b16-2589-4106-8750-fc820be68bc0

# Analytics
VITE_GTM_ID=GTM-XXXXXXX  # À remplacer
VITE_FB_PIXEL_ID=1937203886675924

# API URLs
VITE_API_URL=https://api.ousortiralisbonne.com
```

### 2. Vérifications finales

```bash
# Build de production
npm run build

# Vérifier la taille du bundle
npm run analyze

# Prévisualiser le build
npm run preview
```

### 3. Fichiers à vérifier

- ✅ `/public/robots.txt` existe
- ✅ `/public/sitemap.xml` existe
- ✅ `/public/favicon.ico` existe
- ✅ Tous les favicons sont présents
- ✅ `/public/site.webmanifest` existe

---

## 🌐 DÉPLOIEMENT NETLIFY (Recommandé)

### Option 1: Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod
```

### Option 2: Via GitHub

1. Connecter le repo GitHub à Netlify
2. Configurer les paramètres de build :
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Ajouter les variables d'environnement dans Netlify UI
4. Deploy!

### Configuration Netlify (_redirects)

Créer `/public/_redirects` :

```
# SPA fallback
/*    /index.html   200

# Force HTTPS
http://ousortiralisbonne.com/*   https://ousortiralisbonne.com/:splat  301!
http://www.ousortiralisbonne.com/*   https://ousortiralisbonne.com/:splat  301!

# Redirections multilingues (optionnel)
/fr/*   /:splat?lang=fr   200
/en/*   /:splat?lang=en   200
/pt/*   /:splat?lang=pt   200
```

### Configuration Netlify (netlify.toml)

Créer `netlify.toml` à la racine :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 🔧 DÉPLOIEMENT VERCEL

### Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🐳 DÉPLOIEMENT DOCKER (Optionnel)

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name ousortiralisbonne.com;
        root /usr/share/nginx/html;
        index index.html;

        # Gzip
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

        # SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location /assets {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Commandes Docker

```bash
# Build image
docker build -t ousortiralisbonne .

# Run
docker run -p 80:80 ousortiralisbonne

# Deploy to Docker Hub
docker tag ousortiralisbonne username/ousortiralisbonne
docker push username/ousortiralisbonne
```

---

## 📊 POST-DÉPLOIEMENT

### 1. Vérifications immédiates

- [ ] Site accessible sur https://ousortiralisbonne.com
- [ ] HTTPS actif (certificat SSL)
- [ ] Redirection www → non-www fonctionne
- [ ] Toutes les pages se chargent
- [ ] Les 3 langues fonctionnent (FR/EN/PT)

### 2. Tests SEO

```bash
# Vérifier robots.txt
curl https://ousortiralisbonne.com/robots.txt

# Vérifier sitemap.xml
curl https://ousortiralisbonne.com/sitemap.xml

# Test SSL
curl -I https://ousortiralisbonne.com
```

### 3. Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter la propriété `ousortiralisbonne.com`
3. Vérifier le domaine (DNS ou HTML)
4. Soumettre le sitemap : `https://ousortiralisbonne.com/sitemap.xml`
5. Demander l'indexation de la homepage

### 4. Google Analytics

1. Créer une propriété GA4
2. Obtenir le Measurement ID
3. Remplacer `GTM-XXXXXXX` dans `index.html`
4. Vérifier que les événements sont trackés

### 5. Tests de performance

```bash
# PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# WebPageTest
https://www.webpagetest.org/
```

### 6. Tests compatibilité

- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Edge

---

## 🔒 SÉCURITÉ

### Headers de sécurité à vérifier

```
✅ Strict-Transport-Security: max-age=31536000
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ X-XSS-Protection: 1; mode=block
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Content-Security-Policy (optionnel mais recommandé)
```

### SSL/TLS

- ✅ Certificat SSL valide
- ✅ Force HTTPS
- ✅ TLS 1.2+ minimum
- ✅ HSTS activé

---

## 📈 MONITORING

### Outils recommandés

1. **Uptime Monitoring**
   - UptimeRobot (gratuit)
   - Pingdom
   - StatusCake

2. **Error Tracking**
   - Sentry
   - Rollbar
   - LogRocket

3. **Analytics**
   - Google Analytics 4
   - Plausible (privacy-friendly)
   - Matomo

4. **Performance**
   - Google PageSpeed Insights
   - Lighthouse CI
   - WebPageTest

---

## 🆘 TROUBLESHOOTING

### Build échoue

```bash
# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Pages 404

- Vérifier la configuration SPA (_redirects ou vercel.json)
- Vérifier que le routing React fonctionne

### Problèmes d'images

- Vérifier que les images sont dans `/public`
- Vérifier les chemins d'import
- Optimiser les images (WebP, compression)

### GTM ne charge pas

- Remplacer `GTM-XXXXXXX` par le vrai ID
- Vérifier que GTM est publié
- Tester en mode preview GTM

---

## 📞 SUPPORT

**Équipe technique**
- Email: contact@ousortiralisbonne.com
- Tél: +351 966 998 827

**Documentation**
- React: https://react.dev
- Vite: https://vitejs.dev
- Netlify: https://docs.netlify.com

---

## ✅ CHECKLIST FINALE

- [ ] Build réussi sans erreurs
- [ ] Variables d'environnement configurées
- [ ] Site déployé et accessible
- [ ] SSL/HTTPS actif
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] Google Search Console configuré
- [ ] Google Analytics configuré
- [ ] Tests de performance OK (>90)
- [ ] Tests mobile OK
- [ ] Toutes les pages fonctionnent
- [ ] Les 3 langues fonctionnent
- [ ] Formulaires fonctionnent
- [ ] Paiements Stripe fonctionnent (mode live)
- [ ] Emails Resend fonctionnent
- [ ] Monitoring configuré

---

**Le site est prêt pour le lancement ! 🚀🎉**

Date de déploiement: _______________
Déployé par: _______________
Version: 1.0.0
