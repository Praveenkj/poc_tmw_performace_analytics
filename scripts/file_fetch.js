const fs = require("fs");
const path = require("path");
// const fetch = require("node-fetch");

const pages = [
  { title: "home_page", url: "https://www.menswearhouse.com/" },
  {
    title: "product_listing_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/mens-suits",
  },
  {
    title: "suits_filter_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/mens-suits/f/color=blue#fit%3Dclassic-fit%2526",
  },
  {
    title: "shirts_filter_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/dress-shirts/f/fit=slim-fit#material%3Dcotton%2526",
  },
  {
    title: "sport_coats_filter_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/sport-coats-dinner-jackets/f/fit=classic-fit#pattern%3Dcheck%2526",
  },
  {
    title: "pants_filter_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/dress-pants/f/color=black#fit%3Dmodern-fit%2526",
  },
  {
    title: "shoes_filter_page",
    url: "https://www.menswearhouse.com/c/mens-shoes/all-shoes/f/color=burgundy#type%3Ddress-shoes%2526",
  },
  {
    title: "outerwear_filter_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/outerwear/f/fit=modern-fit#brand%3Dcalvin-klein%2526",
  },
  {
    title: "sweaters_filter_page",
    url: "https://www.menswearhouse.com/c/mens-clothing/sweaters#size%3Dsweaters_large%2526color%3Dblack%2526",
  },
  {
    title: "product_details_page",
    url: "https://www.menswearhouse.com/p/egara-skinny-fit-suit-separates-coat-tmw-3vhc#color=blue/postman%26",
  },
  {
    title: "search_page",
    url: "https://www.menswearhouse.com/search/brown-leather",
  },
];

const htmlPagesDirectory = path.join(__dirname, "..", "v2", "html_pages");

// Create the 'html_pages' directory if it doesn't exist
if (!fs.existsSync(htmlPagesDirectory)) {
  fs.mkdirSync(htmlPagesDirectory, { recursive: true });
}

async function downloadAndSaveHTML(page) {
  try {
    const response = await fetch(page.url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${page.url}. Status: ${response.status}`
      );
    }

    const htmlString = await response.text();

    const fileName = `${page.title}.html`;
    const filePath = path.join(htmlPagesDirectory, fileName);

    fs.writeFileSync(filePath, htmlString);

    console.log(`HTML for ${page.title} saved to ${filePath}`);
  } catch (error) {
    console.error(
      `Error fetching or saving data for ${page.title}: ${error.message}`
    );
  }
}

// Loop through pages and download/save HTML for each
async function downloadAndSaveAllHTMLPages() {
  for (const page of pages) {
    await downloadAndSaveHTML(page);
  }
}

// Run the function
downloadAndSaveAllHTMLPages();
