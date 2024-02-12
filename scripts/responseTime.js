const axios = require("axios");

let data = [
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js",
  "https://www.menswearhouse.com/DigitalWalletCheckoutTB_min.js",
  "https://www.menswearhouse.com/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
  "https://www.menswearhouse.com/_next/static/chunks/8649.3a8bfce953f8555d.js",
  "https://www.menswearhouse.com/_next/static/chunks/4946.6e0e79c17e88f17c.js",
  "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
  "https://www.menswearhouse.com/_next/static/chunks/webpack-08418dbbe859a129.js",
  "https://www.menswearhouse.com/_next/static/chunks/framework-3236775a9ca336a2.js",
  "https://www.menswearhouse.com/_next/static/chunks/main-4d60daac17db3c48.js",
  "https://www.menswearhouse.com/_next/static/chunks/pages/_app-476acfbd930308c0.js",
  "https://www.menswearhouse.com/_next/static/chunks/pages/index-69cff6109f5fea9f.js",
  "https://www.menswearhouse.com/_next/static/n65s_iiYDFNIfkZ4ncSBD/_buildManifest.js",
  "https://www.menswearhouse.com/_next/static/n65s_iiYDFNIfkZ4ncSBD/_ssgManifest.js",
  "https://www.menswearhouse.com/w-LTMQsFJKowv5AaT_Oet3cMuCQ/3cS7LGzpLVOV/fQEkCFEB/JW53H/A8xBlA",
];

async function measureResponseTime(url) {
  const startTime = performance.now();
  await axios.get(url);
  const endTime = performance.now();
  return endTime - startTime;
}

async function logResponseTimes() {
  for (let url of data) {
    const responseTime = await measureResponseTime(url);
    console.log(`Response time for ${url}: ${responseTime} milliseconds`);
  }
}

logResponseTimes();
