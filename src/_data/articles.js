const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

module.exports = async function() {
  // Check if we have Notion credentials
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.log('⚠️  Notion API credentials not found - using mock articles for development');
    // Return mock data for local development
    return [
      {
        id: 'mock-1',
        title: 'Sample Article',
        author: 'Sample Author',
        subject: 'biology',
        tags: ['careers'],
        headerImage: '/images/error.png',
        excerpt: 'Sample excerpt',
        date: '2024-01-01',
        slug: 'sample-article',
        content: 'Sample content for local development.'
      }
    ];
  }

  try {
    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Initialize NotionToMarkdown
    const n2m = new NotionToMarkdown({ notionClient: notion });

    console.log('🔄 Fetching articles from Notion database...');

    // Query the database
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
    });

    console.log(`📄 Found ${response.results.length} articles in Notion`);

    // Process each article
    const articles = await Promise.all(
      response.results.map(async (page) => {
        try {
          // Get the page content as markdown
          const mdblocks = await n2m.pageToMarkdown(page.id);
          const mdString = n2m.toMarkdownString(mdblocks);

          // Extract properties
          const properties = page.properties;
          
          // Helper function to extract property values
          const getProperty = (propName, type) => {
            const prop = properties[propName];
            if (!prop) return null;

            switch (type) {
              case 'title':
                return prop.title?.[0]?.plain_text || '';
              case 'rich_text':
                return prop.rich_text?.[0]?.plain_text || '';
              case 'select':
                return prop.select?.name || '';
              case 'multi_select':
                return prop.multi_select?.map(tag => tag.name) || [];
              case 'url':
                return prop.url || '';
              case 'date':
                return prop.date?.start || '';
              default:
                return null;
            }
          };

          // Create article object
          const article = {
            id: page.id,
            title: getProperty('Title', 'title') || getProperty('Name', 'title'),
            author: getProperty('Author', 'rich_text'),
            subject: getProperty('Subject', 'select'),
            tags: getProperty('Tags', 'multi_select'),
            headerImage: getProperty('Header Image', 'url') || getProperty('Image', 'url'),
            excerpt: getProperty('Excerpt', 'rich_text'),
            date: getProperty('Date', 'date') || getProperty('Created', 'date'),
            slug: getProperty('Slug', 'rich_text') || (getProperty('Title', 'title') || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            content: mdString.parent || mdString,
          };

          return article;
        } catch (error) {
          console.error(`❌ Error processing article ${page.id}:`, error.message);
          return null;
        }
      })
    );

    // Filter out any failed articles
    const validArticles = articles.filter(article => article !== null);
    
    console.log(`✅ Successfully processed ${validArticles.length} articles`);
    
    return validArticles;

  } catch (error) {
    console.error('❌ Error fetching articles from Notion:', error.message);
    return [];
  }
};
