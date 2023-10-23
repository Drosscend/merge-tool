const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Entrez le chemin du dossier à analyser : ", (directoryPath) => {
  if (
    !fs.existsSync(directoryPath) ||
    !fs.lstatSync(directoryPath).isDirectory()
  ) {
    console.log(
      "Le dossier spécifié n'existe pas ou n'est pas un répertoire valide."
    );
    rl.close();
    return;
  }

  rl.question("Entrez le nom du fichier de sortie : ", (outputFileName) => {
    const outputPath = path.join(__dirname, outputFileName);

    const ignoredFiles = [
      __filename, // Le programme lui-même
      outputFileName, // Le fichier de sortie
      ".gitignore",
      "pnpm-lock.yaml",
      "package-lock.json",
    ];

    const ignoredDirs = ["node_modules", ".git", ".vscode", ".idea"];

    rl.question(
      "Entrez les noms des fichiers à ignorer (séparés par des virgules) : ",
      (ignoredFilesInput) => {
        const customIgnoredFiles = ignoredFilesInput
          .split(",")
          .map((item) => item.trim());
        ignoredFiles.push(...customIgnoredFiles);

        rl.question(
          "Entrez les noms des dossiers à ignorer (séparés par des virgules) : ",
          (ignoredDirsInput) => {
            const customIgnoredDirs = ignoredDirsInput
              .split(",")
              .map((item) => item.trim());
            ignoredDirs.push(...customIgnoredDirs);

            // Fonction récursive pour parcourir les fichiers et dossiers
            function processDirectory(currentDir) {
              try {
                const files = fs.readdirSync(currentDir);

                for (const file of files) {
                  const filePath = path.join(currentDir, file);

                  if (
                    ignoredFiles.includes(file) ||
                    ignoredFiles.includes(filePath)
                  ) {
                    continue;
                  }

                  const stats = fs.statSync(filePath);

                  if (stats.isFile()) {
                    // Si c'est un fichier, ajoutez son contenu au fichier de sortie
                    const fileContent = fs.readFileSync(filePath, "utf8");
                    fs.appendFileSync(
                      outputPath,
                      `Nom du fichier : ${file}\nChemin du fichier courant : ${filePath}\nContenu du fichier :\n${fileContent}\n\n`
                    );
                  } else if (stats.isDirectory()) {
                    if (
                      !ignoredDirs.includes(file) &&
                      !ignoredDirs.includes(filePath)
                    ) {
                      // Si ce n'est pas un dossier ignoré, récursion pour explorer son contenu
                      processDirectory(filePath);
                    }
                  }
                }
              } catch (error) {
                console.error(
                  `Erreur lors du traitement de ${currentDir}: ${error.message}`
                );
              }
            }

            // Demande de confirmation avant de supprimer le fichier de sortie s'il existe déjà
            if (fs.existsSync(outputPath)) {
              rl.question(
                "Le fichier de sortie existe déjà. Voulez-vous le remplacer ? (Oui/Non): ",
                (answer) => {
                  if (answer.toLowerCase() === "oui" || answer.toLowerCase() === "o" || answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
                    fs.unlinkSync(outputPath);
                    processDirectory(directoryPath);
                    console.log(
                      `La sortie a été écrite dans le fichier : ${outputPath}`
                    );
                  } else {
                    console.log("L'opération a été annulée.");
                  }
                  rl.close();
                }
              );
            } else {
              processDirectory(directoryPath);
              console.log(
                `La sortie a été écrite dans le fichier : ${outputPath}`
              );
              rl.close();
            }
          }
        );
      }
    );
  });
});
