# AgriVeille Madagascar — maquette frontend

Lancer `npm start` dans Front, puis ouvrir http://localhost:4200.

Dans le menu, choisir **Assistant au champ** ou utiliser le bouton du tableau de bord.

## Parcours à essayer

1. Choisir Français ou Malagasy dans le sélecteur en haut de page : menus, formulaires, statuts, fiches et assistant changent immédiatement de langue. Le choix est conservé après rechargement. Les valeurs saisies et les choix de parcelle restent inchangés.
2. Importer une photo JPG, PNG ou WebP de moins de 10 Mo, ou essayer sans photo.
3. Choisir une parcelle, décrire les symptômes et sélectionner un scénario.
4. Lancer la simulation. Tester également le scénario non concluant.
5. Enregistrer le dossier puis ouvrir Mon suivi. Recharger la page pour vérifier sa conservation locale.
6. Cocher les actions du suivi et ouvrir les fiches de préparation dans Au champ.

## Limites de la démonstration

- Aucun algorithme ML/DL n’est exécuté. Le scénario sélectionné, et non la photo, détermine le résultat.
- Aucun score de confiance ni diagnostic réel n’est produit.
- Aucun fichier ni dossier n’est transmis. La photo est affichée via une URL locale temporaire, libérée à la fermeture du composant.
- Seuls les résumés des dossiers sont enregistrés dans localStorage sur cet appareil. Les photos et les cases du planning ne sont pas conservées après rechargement.
- La tomate reste la seule culture du prototype. Les régions servent à illustrer le contexte, sans modifier les résultats.
- Le tableau de bord régional utilise un jeu fictif cohérent dans les quatre districts d’Amoron’i Mania. Les compteurs sont calculés selon le district choisi. Aucune température ni humidité mesurée n’est affichée. Voir DONNEES.md pour les sources et les limites.
- Les textes de l’interface sont disponibles en français et en malagasy. Les noms propres, les fichiers et les descriptions libres ne font pas l’objet d’une traduction automatique. Une relecture locale des traductions est recommandée avant diffusion.
- Les fiches sont des contenus de démonstration, sans validation agronomique revendiquée par ce nouveau module.

## Évolution future

Une détection réelle demanderait un service d’inférence, des images annotées et validées représentatives des conditions locales, une évaluation des erreurs et un circuit de confirmation par un technicien. Ce prototype ne prétend pas entraîner ou évaluer un modèle.
