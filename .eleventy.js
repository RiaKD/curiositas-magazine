require('dotenv').config(); // Load environment variables from .env file (for local development)

const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const EleventyFetch = require("@11ty/eleventy-fetch"); // For caching API requests
const { DateTime } = require("luxon"); // For date formatting
const markdownIt = require("markdown-it");

// Initialize Notion client using environment variables
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// --- Extracted Notion Fetching Logic ---
// This async function will fetch your articles from Notion
const getNotionArticles = async () => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    console.log(`[DEBUG] Attempting to fetch articles. Database ID: ${databaseId ? 'Set' : 'NOT SET'}. API Key: ${process.env.NOTION_API_KEY ? 'Set' : 'NOT SET'}`);

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

    try {
        while (hasMore) {
            const cacheKey = `notion-database-query-${databaseId}-${startCursor || 'initial'}`;
            console.log(`[DEBUG] Fetching Notion page, cacheKey: ${cacheKey}`);
            const response = await EleventyFetch(
                `https://api.notion.com/v1/databases/${databaseId}/query`,
                {
                    duration: "1d", // Cache for 1 day (adjust for more frequent updates)
                    type: "json",
                    directory: ".cache/notion/", // Store cache files here
                    fetchOptions: {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
                            "Notion-Version": "2022-06-28",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            filter: {
                                property: "Status",
                                select: {
                                    equals: "Published"
                                }
                            },
                            sorts: [
                                {
                                    property: "Date",
                                    direction: "descending"
                                }
                            ],
                            start_cursor: startCursor,
                            page_size: 100
                        }),
                    },
                }
            );

            if (response.object === "error") {
                console.error('[DEBUG] Notion API Error:', response.code, response.message);
                hasMore = false; // Stop the loop on API error
                return [];
            }

            for (const page of response.results) {
                const titleProperty = page.properties.Title?.title?.[0]?.plain_text;
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
                    subject: page.properties["Subject"]?.select?.name || 'Uncategorized', // Use exact Notion property name
                    headerImage: page.properties['Header Image']?.files?.[0]?.file?.url || page.properties['Header Image']?.files?.[0]?.external?.url || '',
                    status: page.properties["Status"]?.select?.name || 'Unknown', // Use exact Notion property name
                    slug: slugProperty || titleProperty.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || page.id,
                    references: page.properties.References?.rich_text?.[0]?.plain_text || '',
                    rawProperties: page.properties // Add this for debugging
                };
                articles.push(article);
            }

            hasMore = response.has_more;
            startCursor = response.next_cursor;
            console.log(`[DEBUG] hasMore: ${hasMore}, next_cursor: ${startCursor}`);
        }
    } catch (error) {
        console.error('[DEBUG] Error during EleventyFetch for Notion API:', error.message);
        console.error('[DEBUG] Full Notion API fetch error:', error);
        return []; // Return empty array on fetch error
    }

    console.log(`[DEBUG] Successfully fetched ${articles.length} articles from Notion.`);
    return articles;
};


module.exports = function(eleventyConfig) {

    // --- 1. Fetch All Articles (Metadata) from Notion Database ---
    // This defines a GLOBAL data object available as `articles` in your templates
    eleventyConfig.addGlobalData("articles", getNotionArticles); // Use the extracted async function

    // --- 2. Fetch Individual Article Content (Body) ---
    eleventyConfig.addNunjucksAsyncFilter("notionContent", async (pageId, callback) => {
        if (!pageId) {
            console.error('Error: notionContent filter called without a pageId.');
            return callback(null, "Error: Content ID missing.");
        }

        try {
            const cachedContent = await EleventyFetch(
                async () => {
                    const mdblocks = await n2m.pageToMarkdown(pageId);
                    const mdString = n2m.toMarkdownString(mdblocks);
                    // Render Markdown to HTML here
                    return markdownIt({ html: true }).render(mdString.parent || "");
                },
                {
                    duration: "1d",
                    type: "text",
                    directory: ".cache/notion/",
                    requestId: `notion-content-${pageId}`
                }
            );
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

    // Add a markdown filter for Nunjucks
    eleventyConfig.addNunjucksFilter("markdown", function(str) {
        if (!str) return "";
        return markdownIt({ html: true }).render(str);
    });

    // --- 4. Custom collection for Notion articles ---
    // This makes the 'articles' data available as `collections.articles`
    eleventyConfig.addCollection("articles", async function(collectionApi) { // Make this function async
        // Await the resolution of the global data function directly
        const notionArticles = await getNotionArticles(); // <--- AWAIT THE FUNCTION HERE!

        if (!notionArticles || !Array.isArray(notionArticles)) {
            console.warn("[DEBUG] collections.articles: Global 'articles' data was not an array or not available when building collection. Returning empty array.");
            return [];
        }

        console.log(`[DEBUG] collections.articles: Building collection with ${notionArticles.length} items.`); // New debug log
        return notionArticles;
    });

    // --- 5. Custom filter to filter articles by subject ---
    eleventyConfig.addFilter("filterBySubject", (collection, subject) => {
        console.log(`[DEBUG] filterBySubject called. Type of collection: ${typeof collection}. Is Array: ${Array.isArray(collection)}. Collection length: ${collection ? collection.length : 'N/A'}. Subject: ${subject}`);
        
        // Ensure `collection` is an array before trying to filter
        if (!collection || !Array.isArray(collection)) {
            console.error("[DEBUG] filterBySubject received a non-array or null collection:", collection);
            return []; // Return an empty array to prevent further errors
        }

        if (!subject) return collection; // If no subject is passed, return all

        // Check both item.data.subject and item.subject for case-insensitive comparison
        return collection.filter(item => {
            const subj = (item.data && item.data.subject) ? item.data.subject : item.subject;
            return subj && subj.toLowerCase() === subject.toLowerCase();
        });
    });

    // --- 6. Passthrough Copy for Static Assets ---
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/logo.png");
    eleventyConfig.addPassthroughCopy("src/icon");
    eleventyConfig.addPassthroughCopy("src/pink_flip_phone.png");


    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            // layouts: "_layouts" // Ensure this line is REMOVED
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};