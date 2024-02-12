// server.js
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const {
  getImageSize,
  getHTMLSize,
  getApiResponseTime,
} = require("./helpers/helper.js");

const {
  htmlSizeThreshold,
  imageSizeThreshold,
  urlResponseTimeThreshold,
} = require("./env.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/analyze", async (req, res) => {
  try {
    let html;
    const { fileName, url, version } = req.query;

    if (fileName) {
      const filePath = path.join(
        __dirname,
        version,
        "html_pages_formatted",
        fileName
      );
      html = fs.readFileSync(filePath, "utf8");
      console.log(`HTML read from ${filePath}`);
    } else if (url) {
      const response = await fetch(url);
      html = await response.text();
    }

    // Analyze HTML content for issues
    const issues = await analyzeHTML(html);

    // Send the list of issues as a response
    res.json({ issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to analyze HTML content for issues
const analyzeHTML = async (html) => {
  const $ = cheerio.load(html);

  const pageIssues = { urlRedirects: [] };

  // Check HTML page size

  async function includeHTML() {
    const htmlSize = getHTMLSize(html); // Set a threshold for HTML size (in kilobytes)

    if (htmlSize && htmlSize > htmlSizeThreshold) {
      let issues = [];
      issues.push({
        description: `HTML size is larger than ${htmlSizeThreshold} KB. Current size is ${htmlSize} KB.`,
      });
      pageIssues["HTMLSize"] = issues;
    }
  }

  // Check Image size

  async function includeImageSize() {
    let issues = [];
    for (const element of $("img")) {
      const imageUrl = $(element).attr("src");
      let imageSize = await getImageSize(imageUrl);
      // console.log(imageUrl, imageSize);

      if (imageSize && imageSize > imageSizeThreshold) {
        let msg;
        msg = `Image at ${imageUrl} is ${imageSize} KB. Max size can be ${imageSizeThreshold} KB.`;
        // if (imageSize > 1024) {
        //   imageSize = imageSize / 1024;
        //   msg = `Image at ${imageUrl} is ${imageSize} MB. Max size can be ${imageSizeThreshold} KB.`;
        // } else {
        //   msg = `Image at ${imageUrl} is ${imageSize} KB. Max size can be ${imageSizeThreshold} KB.`;
        // }
        issues.push({
          description: msg,
        });
      }
    }
    pageIssues["imageSize"] = issues;
  }

  // Check for unwanted repetitions

  // const uniqueElements = new Set();
  // $("[class]").each((index, element) => {
  //   const classNames = $(element).attr("class").split(" ");
  //   classNames.forEach((className) => {
  //     if (uniqueElements.has(className)) {
  //       issues.push({
  //         description: `Unwanted repetition of class: ${className}`,
  //       });
  //     } else {
  //       uniqueElements.add(className);
  //     }
  //   });
  // });

  // Check for unwanted stylings (example: inline styles)

  // $("[style]").each((index, element) => {
  //   issues.push({
  //     description: `Unwanted styling found: ${$(element).attr("style")}`,
  //   });
  // });

  // Check API calls that take longer

  async function getURLList() {
    let apiList = [];
    for (const element of $("script[src]")) {
      let apiUrl = $(element).attr("src");
      if (!apiUrl.startsWith("http")) {
        apiUrl = `https://www.menswearhouse.com${apiUrl}`;
      }
      apiList.push(apiUrl);
    }
    return apiList;
  }

  async function measureResponseTime(url) {
    let issues = [];
    const startTime = performance.now();
    const response = await fetch(url, { redirect: "follow" });
    const endTime = performance.now();

    // Check if the response is a redirect
    if (response.redirected) {
      pageIssues["urlRedirects"].push(`${url} redirected to ${response.url}.`);
    }

    return endTime - startTime;
  }

  async function includeAPIResponseTime() {
    let issues = [];
    urlList = await getURLList();
    // console.log("urlList: ", urlList); // in milli seconds
    for (let url of urlList) {
      const responseTime = await measureResponseTime(url);
      if (responseTime && responseTime > urlResponseTimeThreshold) {
        issues.push({
          description: `Response time for ${url} is ${responseTime} milliseconds where threshold is set as ${urlResponseTimeThreshold} milliseconds.`,
        });
      }
    }
    pageIssues["urlResponseTime"] = issues;
  }

  await includeHTML();
  await includeImageSize();
  await includeAPIResponseTime();

  return pageIssues;
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
