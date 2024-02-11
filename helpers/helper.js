const axios = require("axios");
const fs = require("fs");

// Function to get the size of an image (in kilobytes)

const getImageSize = async (imageUrl) => {
  try {
    const response = await axios.head(imageUrl);
    const contentLength = response.headers["content-length"];

    // Convert content length to kilobytes
    return contentLength ? Math.round(contentLength / 1024) : null;
  } catch (error) {
    console.error(
      `Error fetching image size for ${imageUrl}: ${error.message}`
    );
    return null;
  }
};

// const getImageSize = async (imageUrl) => {
//   try {
//     // if (imageUrl.split("/").pop().split(".").length == 1) {
//     //   return;
//     // }
//     const response = await axios.get(imageUrl, {
//       responseType: "arraybuffer", // Ensure response is treated as binary data
//     });

//     // Write image data to a temporary file
//     let tempFileName = imageUrl.split("/").pop();
//     if (tempFileName.split(".").length == 1) {
//       tempFileName = `${tempFileName}.avif`;
//     }
//     const tempFilePath = `./temp/tempImage-${tempFileName}`;

//     fs.writeFileSync(tempFilePath, response.data);

//     // Get the size of the downloaded image file
//     const stats = fs.statSync(tempFilePath);
//     const fileSizeInBytes = stats.size;
//     const fileSizeInKB = fileSizeInBytes / 1024;

//     // Clean up temporary file
//     fs.unlinkSync(tempFilePath);

//     return Math.round(fileSizeInKB);
//   } catch (error) {
//     console.error(
//       `Error fetching image size for ${imageUrl}: ${error.message}`
//     );
//     return null;
//   }
// };

// const getImageSize = async (imageUrl) => {
//   try {
//     if (imageUrl.split("/").pop().split(".").length == 1) {
//       imageUrl = `${imageUrl}.avif`;
//     }
//     const response = await axios.get(imageUrl, {
//       responseType: "arraybuffer", // Ensure response is treated as binary data
//     });

//     // Get the size of the array buffer
//     const fileSizeInBytes = response.data.byteLength;
//     const fileSizeInKB = fileSizeInBytes / 1024;

//     return Math.round(fileSizeInKB);
//   } catch (error) {
//     console.error(
//       `Error fetching image size for ${imageUrl}: ${error.message}`
//     );
//     return null;
//   }
// };

// Function to get the size of HTML content (in kilobytes)

const getHTMLSize = (html) => {
  // Convert HTML content length to kilobytes
  return Math.round(Buffer.from(html).length / 1024);
};

// Function to get API response time (in milliseconds)

const getApiResponseTime = async (apiUrl) => {
  try {
    let start = Date.now();
    await axios.head(apiUrl);
    return Date.now() - start;
  } catch (error) {
    console.error(
      `Error fetching API response time for ${apiUrl}: ${error.message}`
    );
    return null;
  }
};

module.exports = {
  getImageSize,
  getHTMLSize,
  getApiResponseTime,
};
