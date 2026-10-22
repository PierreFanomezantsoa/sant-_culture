# Déploiement sur Vercel

Dans Vercel, définir **Root Directory** sur `Front` (majuscule comprise) et utiliser Node.js `22.x`.

Le fichier `Front/vercel.json` définit les commandes d’installation et de compilation ainsi que le dossier à publier. Il est lu seulement si la racine du projet Vercel est bien `Front`.

- Installation : pnpm 10.18.3 avec le verrouillage existant et les dépendances de développement, y compris `@angular/cli`.
- Compilation : `npm run build`, qui utilise la commande `ng` installée dans le projet.
- Publication : `dist/agri-veille/browser`, contenant `index.html`.

Depuis la racine du dépôt, publier la configuration :

```sh
git add Front/vercel.json Front/DEPLOIEMENT.md
git commit -m "Configurer le deploiement Angular sur Vercel"
git push origin master
```

Ouvrir ensuite le déploiement du **nouveau commit** dans Vercel. Relancer uniquement l’ancien commit `68e961c` ne récupère pas les nouveaux fichiers.

Dans les journaux, vérifier que l’installation pnpm apparaît avant `npm run build`, puis que la compilation Angular aboutit. Ouvrir le site avec Visit une fois le déploiement Ready.

Le message `ng: command not found` signifie que le binaire local Angular n’est pas disponible au moment du build. Cela peut venir d’une mauvaise racine, d’une installation désactivée, ou de dépendances de développement omises. Cette configuration rend l’installation et la compilation explicites. Si les nouvelles commandes ne figurent pas dans les journaux, vérifier la racine Vercel et le commit déployé.
