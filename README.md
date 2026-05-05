# PharmaCop 💊

Site web d'une pharmacie moderne, réalisé en HTML, CSS et JavaScript vanilla.  
Projet étudiant — aucune dépendance, aucun framework, aucun backend.

---

## Aperçu

PharmaCop est un site vitrine multipage qui présente :

- Une **page d'accueil** avec hero en plein écran, section features et statistiques
- Une **page produits** avec grille de cartes, filtres par catégorie et fenêtre modale de détails
- Une **page services** avec étapes numérotées et cartes de services
- Une **page à propos** avec profil, compétences et valeurs
- Une **page contact** avec formulaire et informations de contact
- Un **chatbot flottant** qui propose des symptômes et oriente l'utilisateur (sans IA, sans API)

---

## Structure du projet

```
pharma-cop/
├── index.html        # Page d'accueil
├── about.html        # Page à propos
├── services.html     # Page services
├── products.html     # Page produits (avec modal + filtre)
├── contact.html      # Page contact
├── style.css         # Tous les styles du site
├── script.js         # Toute la logique JavaScript
├── img/
│   └── ibuprofen.jpg # Photo produit locale
└── README.md         # Ce fichier
```

---

## Lancer le projet en local

Aucune installation requise. Deux options :

### Option 1 — Ouvrir directement
Double-clique sur `index.html` dans ton explorateur de fichiers.  
Le site s'ouvre dans ton navigateur.

### Option 2 — Via VS Code (recommandé)
1. Ouvre le dossier `pharma-cop/` dans VS Code
2. Installe l'extension **Live Server** (si ce n'est pas déjà fait)
3. Clique droit sur `index.html` → **Open with Live Server**
4. Le site se recharge automatiquement à chaque modification

---

## Mettre le projet sur GitHub

### Étape 1 — Créer un dépôt sur GitHub

1. Va sur [github.com](https://github.com) et connecte-toi
2. Clique sur **New repository** (bouton vert en haut à droite)
3. Donne un nom : `pharma-cop`
4. Laisse-le en **Public** (ou Privé selon ta préférence)
5. **Ne coche pas** "Initialize with README" (tu en as déjà un)
6. Clique sur **Create repository**

### Étape 2 — Initialiser Git dans ton projet

Ouvre un terminal dans le dossier `pharma-cop/` et exécute :

```bash
git init
git add .
git commit -m "Initial commit - PharmaCop website"
```

### Étape 3 — Lier et envoyer sur GitHub

Remplace `TON_USERNAME` par ton nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/TON_USERNAME/pharma-cop.git
git branch -M main
git push -u origin main
```

Ton projet est maintenant en ligne sur GitHub.

---

## Publier le site en ligne (GitHub Pages)

GitHub Pages permet d'héberger ton site **gratuitement** avec une vraie URL.

1. Va sur ton dépôt GitHub (`github.com/TON_USERNAME/pharma-cop`)
2. Clique sur **Settings** (onglet en haut)
3. Dans le menu gauche, clique sur **Pages**
4. Sous *Branch*, sélectionne **main** puis **/root**
5. Clique sur **Save**

Après quelques minutes, ton site sera accessible à :
```
https://TON_USERNAME.github.io/pharma-cop/
```

---

## Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure de toutes les pages |
| CSS3 | Styles, animations, responsive, variables CSS |
| JavaScript (ES5/6) | Chatbot, modal produits, filtre, menu mobile |
| Google Fonts (Inter) | Typographie |
| Unsplash | Photos de produits |

---

## Fonctionnalités

- **Responsive** — S'adapte aux mobiles, tablettes et desktops
- **Chatbot** — 8 symptômes avec réponses et chips cliquables
- **Modal produit** — Détails au clic sur chaque produit
- **Filtre produits** — Tri par catégorie (Médicaments / Compléments)
- **Menu mobile** — Navigation hamburger sur petit écran
- **Formulaire contact** — Validation et message de confirmation
- **Animations** — Hover 3D sur les cartes, ouverture chatbot avec rebond

---

## Auteur

Projet réalisé par un étudiant en pharmacie dans le cadre d'un apprentissage du développement web front-end.

---

*PharmaCop — Ce site est une démonstration. Il ne constitue pas un avis médical.*
