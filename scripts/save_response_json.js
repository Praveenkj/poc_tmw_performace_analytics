const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");

const v1Directory = path.join(__dirname, "..", "v1", "html_pages_formatted");
const responseJsonDirectory = path.join(__dirname, "..", "v1", "response_json");

// Create the 'response_json' directory if it doesn't exist
// Use fs.promises.access instead of fs.existsSync
if (!await fs.promises.access(responseJsonDirectory, fs.constants.F_OK)) {
  await fs.promises.mkdir(responseJsonDirectory, { recursive: true });
}

const apiUrl = "http://localhost:3001/analyze?version=v1&fileName=";

async function callApiAndSaveResponse(fileName) {
  try {
    const url = `${apiUrl}${fileName}`;
    const response = await axios.get(url);

    const jsonResponse = response.data;

    const responseFilePath = path.join(
      responseJsonDirectory,
      `${fileName}.json`
    );
    await fs.promises.writeFile(responseFilePath, JSON.stringify(jsonResponse, null, 2));

    console.log(`JSON response saved for ${fileName} in ${responseFilePath}`);
  } catch (error) {
    console.error(`Error calling API for ${fileName}: ${error.message}`);
  }
}

async function generateFileNameArray(directory) {
  try {
    const files = await fs.promises.readdir(directory);
    return files.filter((file) =>
      (await fs.promises.stat(path.join(directory, file))).isFile()
    );
  } catch (error) {
    console.error(`Error reading files from ${directory}: ${error.message}`);
    return [];
  }
}

// Example usage
(async () => {
  const fileNameArray = await generateFileNameArray(v1Directory);

  for (const fileName of fileNameArray) {
    await callApiAndSaveResponse(fileName);
  }
})();
