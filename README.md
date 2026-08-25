# Portfolio — Samih Habbani

Portfolio personnel — [samihhabbani.com](https://www.samihhabbani.com/)

## Technos utilisées

| Techno | Usage |
|---|---|
| **Next.js 16** (App Router) | Framework React, export statique |
| **React 19** | UI |
| **TypeScript** | Typage |
| **Tailwind CSS 4** | Styling (utilisé partiellement — beaucoup de styles inline aussi) |
| **Framer Motion** | Animations (scroll reveal, transitions, effets) |
| **EmailJS** (`@emailjs/browser`) | Envoi du formulaire de contact, sans backend |

Le site est compilé en **export statique** (`output: "export"` dans `next.config.ts`) : pas de serveur Node.js nécessaire en production, juste du HTML/CSS/JS à héberger.

## Structure du projet

```
src/
├── app/                    # Layout et page principale (App Router)
├── components/
│   ├── layout/              # Navbar, curseur custom
│   └── sections/            # Une section = un bloc de la page (Hero, Identity, Projects, Timeline, Contact...)
└── data/
    └── portfolio.ts         # Contenu texte centralisé (projets, expériences, identité)
```

Chaque section du site (Identity, FWDAI, Dev, Teach, Content Creator, Projects, Metrics, Network, Timeline, Contact) est un composant indépendant dans `src/components/sections/`.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Mettre le site à jour sur OVH (hébergement mutualisé)

Le site est statique : pas besoin de Node.js sur le serveur, juste d'envoyer les fichiers.

### 1. Compiler

```bash
npm run build
```

→ génère le dossier **`out/`** à la racine, avec tout le HTML/CSS/JS prêt à héberger.

### 2. Envoyer sur OVH

**Avec FileZilla (le plus simple) :**
1. Récupérer les identifiants FTP dans l'espace client OVH → *Hébergements* → ton offre → *Général* → identifiants FTP
2. Se connecter à `ftp.tonsite.com`
3. Aller dans le dossier `www/` (racine web sur OVH mutualisé)
4. Supprimer l'ancien contenu (ou faire une sauvegarde avant) et envoyer **tout le contenu** du dossier `out/` (pas le dossier `out` lui-même — son contenu directement à la racine de `www/`)

**En ligne de commande (rsync/lftp) :**
```bash
lftp -u TON_LOGIN,TON_MOT_DE_PASSE ftp.tonsite.com -e "mirror -R out/ /www/; quit"
```

### Points d'attention
- Le fichier `.env.local` n'est **jamais uploadé** — les clés EmailJS sont injectées en dur dans le JS au moment du `npm run build`, donc rien à configurer côté serveur
- Vérifier que le certificat SSL (Let's Encrypt gratuit) est actif dans l'espace client OVH pour du HTTPS

## Comment fonctionne l'envoi d'email (formulaire de contact)

Le formulaire de contact (section `// 11 · CONTACT`) utilise **EmailJS**, un service tiers qui permet d'envoyer des emails directement depuis le navigateur — **sans backend**.

### Fonctionnement
1. Le visiteur remplit le formulaire (nom, email, message) dans [`Contact.tsx`](src/components/sections/Contact.tsx)
2. Au clic sur "SEND_REQUEST", `handleSubmit` appelle `emailjs.send(...)`
3. EmailJS transmet les données à ton compte, qui envoie l'email directement dans ta boîte Gmail (`samihhabbani@gmail.com`), formaté avec le template configuré sur leur dashboard

### Configuration (`.env.local`, non versionné)
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_8zm5bow
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_uexqoqo
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=rwTYrOP2OVRFGaS5K
```

Ces clés sont volontairement publiques côté client (`NEXT_PUBLIC_*`) — c'est le fonctionnement normal d'EmailJS, pas une faille de sécurité.

### Gérer/modifier l'envoi
Tout se pilote depuis [dashboard.emailjs.com](https://dashboard.emailjs.com) :
- **Email Services** → le service Gmail connecté (à reconnecter si l'autorisation OAuth expire — cause la plus fréquente d'échec d'envoi)
- **Email Templates** → le format de l'email reçu (variables `from_name`, `from_email`, `message`)
- **Usage** → quota du plan gratuit (200 emails/mois)

Si le formulaire ne fonctionne plus, c'est presque toujours ici qu'il faut regarder en premier.
