const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");

async function run() {
  const { useCors } = await inquirer.prompt([
    {
      type: "confirm",
      name: "useCors",
      message: "Deseja usar CORS?",
      default: true,
    },
  ]);

  const projectPath = path.join(process.cwd(), "api-test");

  await fs.copy("template", projectPath);

  const mainPath = path.join(projectPath, "src/main.ts");
  let mainFile = await fs.readFile(mainPath, "utf8");

  if (useCors) {
    mainFile = mainFile.replace(
      /await app\.listen\([\s\S]*?\);/,
      "app.enableCors();\n  await app.listen(process.env.PORT ?? 3000);"
    );
  }

  await fs.writeFile(mainPath, mainFile);

  console.log("Projeto NestJS criado 🚀");
}

run();
