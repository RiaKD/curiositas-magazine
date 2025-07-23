// .eleventy.js
require('dotenv').config(); // Load environment variables from .env file (for local development)

const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const EleventyFetch = require("@11ty/eleventy-fetch"); // For caching API requests
const { DateTime } = require("luxon"); // For date formatting
// const util = require('util'); // Only needed for debugging if you uncomment console.log(util.inspect...)

// Initialize Notion client using environment variables
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

module.exports = function(eleventyConfig) {

    // --- 1. Fetch All Articles (Metadata) from Notion Database ---
    eleventyConfig.addGlobalData("articles", async () => {
        const databaseId = process.env.NOTION_DATABASE_ID;

        if (!databaseId) {
            console.error('Error: NOTION_DATABASE_ID environment variable is not set. Please check your .env file or deployment environment variables.');
            return [];
        }
        if (!process.env.NOTION_API_KEY) {
            console.error('Error: NOTION_API_KEY environment variable is not set. Please check your .env file or deployment environment variables.');
            return [];
        }

        const articles = [];
        let hasMore = true;
        let startCursor = undefined;

        while (hasMore) {
            const cacheKey = `notion-database-query-${databaseId}-${startCursor || 'initial'}`;
            const response = await EleventyFetch(
                `https://api.notion.com/v1/databases/${databaseId}/query`,
                {
                    duration: "1d", // Cache for 1 day (adjust for more frequent updates)
                    type: "json",
                    directory: ".cache/notion/", // Store cache files here
                    fetchOptions: { // These are passed directly to the fetch API
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
                            "Notion-Version": "2022-06-28", // IMPORTANT: Keep this updated with Notion's API version if issues arise
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            filter: {
                                property: "Status", // Assuming 'Status' is a Select property in Notion
                                select: {
                                    equals: "Published" // Only fetch articles marked 'Published'
                                }
                            },
                            sorts: [ // Sort by Date (newest first)
                                {
                                    property: "Date", // Assuming 'Date' is a Date property in Notion
                                    direction: "descending"
                                }
                            ],
                            start_cursor: startCursor,
                            page_size: 100 // Maximum number of results per API call
                        }),
                    },
                }
            );

            for (const page of response.results) {
                const titleProperty = page.properties.Header?.title?.[0]?.plain_text;
                const slugProperty = page.properties.Slug?.rich_text?.[0]?.plain_text;

                if (!titleProperty) {
                    console.warn(`Skipping Notion page with ID ${page.id} due to missing 'Header' (Title).`);
                    continue;
                }

                const article = {
                    id: page.id,
                    title: titleProperty,
                    date: page.properties.Date?.date?.start || 'Unknown Date',
                    author: page.properties.Author?.people?.[0]?.name || page.properties.Author?.rich_text?.[0]?.plain_text || 'Unknown Author',
                    tags: page.properties.Tags?.multi_select.map(tag => tag.name) || [],
                    subject: page.properties.Subject?.select?.name || 'Uncategorized', // Assuming 'Subject' is a Select property
                    headerImage: page.properties['Header Image']?.files?.[0]?.file?.url || page.properties['Header Image']?.files?.[0]?.external?.url || '',
                    slug: slugProperty || titleProperty.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || page.id,
                    references: page.properties.References?.rich_text?.[0]?.plain_text || '' // Assuming 'References' is Rich Text (for plain text content)
                };

                articles.push(article);
            }

            hasMore = response.has_more;
            startCursor = response.next_cursor;
        }
        return articles;
    });

    // --- 2. Fetch Individual Article Content (Body) ---
    eleventyConfig.addNunjucksAsyncFilter("notionContent", async (pageId, callback) => {
        if (!pageId) {
            console.error('Error: notionContent filter called without a pageId.');
            return callback(null, "Error: Content ID missing.");
        }

        try {
            const cachedContent = await EleventyFetch(`notion-content-${pageId}`, {
                duration: "1d",
                type: "text",
                directory: ".cache/notion/",
                fetchFunction: async () => {
                    const mdblocks = await n2m.pageToMarkdown(pageId);
                    const mdString = n2m.toMarkdownString(mdblocks);
                    return mdString;
                }
            });
            callback(null, cachedContent);
        } catch (error) {
            console.error(`Error fetching Notion content for page ID ${pageId}:`, error);
            callback(error, "Error loading content.");
        }
    });

    // --- 3. Date Filters (using Luxon) ---
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(new Date(dateObj), { zone: 'utc' }).toFormat("dd LLL yyyy");
    });

    eleventyConfig.addFilter("htmlDateString", dateObj => {
        return DateTime.fromJSDate(new Date(dateObj), { zone: 'utc' }).toFormat("yyyy-MM-dd");
    });

    // --- 4. Custom filter to filter articles by subject ---
    // This is crucial for your static subject pages.
    eleventyConfig.addFilter("filterBySubject", function(articles, subjectName) {
      if (!articles || !Array.isArray(articles)) {
        return [];
      }
      return articles.filter(article => article.subject === subjectName);
    });

    // --- 5. Passthrough Copy for Static Assets ---
    // Ensure these paths match where your static assets are located in src/
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/js"); // If you have any JS files
    eleventyConfig.addPassthroughCopy("src/logo.png"); // If directly in src/
    eleventyConfig.addPassthroughCopy("src/icon");     // If 'icon' is a folder directly in src/
    eleventyConfig.addPassthroughCopy("src/pink_flip_phone.png"); // If directly in src/


    return {
        dir: {
            input: "src",        // Eleventy looks for your source files inside the 'src' folder
            output: "_site",     // Eleventy will build the final static website into the '_site' folder
            includes: "_includes", // This folder holds reusable template partials (e.g., header, footer)
            layouts: "_layouts"  // This folder holds your main page layouts (e.g., base, article)
        },
        templateFormats: ["md", "njk", "html"], // Eleventy will process Markdown, Nunjucks, and HTML files
        markdownTemplateEngine: "njk", // Use Nunjucks for Markdown templates
        htmlTemplateEngine: "njk"      // IMPORTANT: Use Nunjucks for HTML templates so your static HTML can contain Nunjucks code.
    };
};