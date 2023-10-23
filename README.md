# README

## Description
Ce programme est un outil de ligne de commande en Node.js qui permet d'analyser le contenu d'un dossier spécifié et d'écrire les détails de chaque fichier dans un fichier de sortie. Il offre également la possibilité d'ignorer certains fichiers et dossiers lors de l'analyse.

## Comment utiliser
1. Assurez-vous que Node.js est installé sur votre machine.
2. Ouvrez votre terminal et naviguez jusqu'au dossier contenant ce programme.
3. Exécutez le programme avec la commande `node merge.js`.
4. Le programme vous demandera d'entrer le nom du dossier à analyser.
5. Ensuite, il vous demandera le nom du fichier de sortie où les détails seront écrits.
6. Vous pouvez également spécifier des fichiers et des dossiers supplémentaires à ignorer lors de l'analyse.

## Fichiers et dossiers ignorés par défaut
Le programme ignore par défaut les fichiers et dossiers suivants lors de l'analyse :
- Fichiers : Le programme lui-même, (le fichier de sortie), ".gitignore", "pnpm-lock.yaml", "package-lock.json".
- Dossiers : "node_modules", ".git", ".vscode", ".idea".

## Fonctionnement
Le programme utilise la bibliothèque `fs` pour lire le contenu des dossiers et des fichiers, et la bibliothèque `readline` pour interagir avec l'utilisateur via la ligne de commande. Il utilise une fonction récursive pour parcourir tous les fichiers et sous-dossiers du dossier spécifié. Si un fichier n'est pas dans la liste des fichiers ignorés, son contenu est lu et ajouté au fichier de sortie. Si un dossier n'est pas dans la liste des dossiers ignorés, le programme explore son contenu. Enfin, lorsque tous les fichiers ont été analysés, un message est affiché pour indiquer que l'opération est terminée.
