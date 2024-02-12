const fs = require("fs");
const prettier = require("prettier");
const path = require("path");

const inputDir = path.join(__dirname, "..", "v2", "html_pages");
const outputDir = path.join(__dirname, "..", "v2", "html_pages_formatted");

async function processHtmlFiles() {
  try {
    const files = await fs.promises.readdir(inputDir);

    for (const file of files) {
      if (file.endsWith(".html")) {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file);

        // Ensure `readFile` resolves completely before continuing
        const htmlContent = await fs.promises.readFile(inputFilePath, "utf8");

        const prettyHtml = prettier.format(htmlContent, { parser: "html" });
        await fs.promises.writeFile(outputFilePath, prettyHtml);
        console.log(
          `Successfully formatted ${inputFilePath} and saved to ${outputFilePath}`
        );
      }
    }

    console.log(
      `All HTML files in ${inputDir} have been formatted and saved to ${outputDir}`
    );
  } catch (error) {
    console.error(`Error processing HTML files: ${error}`);
  }
}

processHtmlFiles();
