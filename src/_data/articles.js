const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const { marked } = require('marked');

module.exports = async function() {
  // Check if we have Notion credentials
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.log('⚠️  Notion API credentials not found - using mock articles for development');
    // Return mock data for local development that matches your database structure
    return [
      {
        id: 'mock-1',
        title: 'Sample Biology Article',
        author: 'Test Author',
        subject: 'Biology',
        subjectNormalized: 'biology',
        tags: ['careers'],
        headerImage: '/images/error.png',
        excerpt: 'Sample excerpt',
        date: '2024-01-01',
        slug: 'sample-biology-article',
        content: '<p>This is a <strong>sample biology article</strong> with <em>formatted content</em> to test the new HTML rendering.</p><p>It includes multiple paragraphs and <strong>bold text</strong> as well as <em>italic text</em>.</p>',
        status: 'Published'
      },
      {
        id: 'mock-2',
        title: 'Sample Chemistry Article',
        author: 'Test Author',
        subject: 'Chemistry',
        subjectNormalized: 'chemistry',
        tags: ['careers', 'research'],
        headerImage: '/images/error.png',
        excerpt: 'Sample excerpt',
        date: '2024-01-02',
        slug: 'sample-chemistry-article',
        content: '<p>This is a <strong>sample chemistry article</strong> with <em>formatted content</em> to test the new HTML rendering.</p><p>It includes multiple paragraphs and <strong>bold text</strong> as well as <em>italic text</em>.</p>',
        status: 'Published'
      },
      {
        id: 'mock-3',
        title: 'Sample Computer Science Article',
        author: 'Test Author',
        subject: 'Computer science',
        subjectNormalized: 'computer-science',
        tags: ['careers'],
        headerImage: '/images/error.png',
        excerpt: 'Sample excerpt',
        date: '2024-01-03',
        slug: 'sample-computer-science-article',
        content: '<p>This is a <strong>sample computer science article</strong> with <em>formatted content</em> to test the new HTML rendering.</p><p>It includes multiple paragraphs and <strong>bold text</strong> as well as <strong>code examples</strong> and <em>italic text</em>.</p>',
        status: 'Published'
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

    // Query the database - only get Published articles
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log(`📄 Found ${response.results.length} articles in Notion`);
    
    // Debug: Log the first article's properties to understand structure
    if (response.results.length > 0) {
      const firstPage = response.results[0];
      console.log('🔍 First article properties:', Object.keys(firstPage.properties));
      console.log('🔍 First article property details:', JSON.stringify(firstPage.properties, null, 2));
    }

    // Process each article
    const articles = await Promise.all(
      response.results.map(async (page, index) => {
        try {
          console.log(`📝 Processing article ${index + 1}/${response.results.length}: ${page.id}`);
          
          // Get the page content as markdown
          const mdblocks = await n2m.pageToMarkdown(page.id);
          const mdString = n2m.toMarkdownString(mdblocks);
          
          // Convert markdown to HTML for proper formatting
          const htmlContent = marked(mdString.parent || mdString || 'No content available');

          // Extract properties
          const properties = page.properties;
          
          // Helper function to extract property values
          const getProperty = (propName, type) => {
            const prop = properties[propName];
            if (!prop) {
              console.log(`⚠️  Property '${propName}' not found in article ${page.id}`);
              return null;
            }

            try {
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
                case 'files':
                  // Handle Files and media property type
                  return prop.files?.[0]?.file?.url || prop.files?.[0]?.external?.url || '';
                default:
                  return null;
              }
            } catch (err) {
              console.log(`⚠️  Error extracting '${propName}' from article ${page.id}:`, err.message);
              return null;
            }
          };

          // Extract properties using exact property names from your database
          const title = getProperty('Title', 'title');
          const author = getProperty('Author', 'rich_text');
          const subject = getProperty('Subject', 'select');
          const tags = getProperty('Tags', 'multi_select');
          const headerImage = getProperty('Header Image', 'files');
          const date = getProperty('Date', 'date');
          const slug = getProperty('Slug', 'rich_text');
          const status = getProperty('Status', 'select');

          // Normalize subject for CSS data attributes
          const normalizeSubject = (subj) => {
            if (!subj) return 'none';
            return subj.toLowerCase().replace(/\s+/g, '-');
          };

          // Create article object
          const article = {
            id: page.id,
            title: title || 'Untitled',
            author: author || 'Unknown',
            subject: subject || 'None',
            subjectNormalized: normalizeSubject(subject), // For CSS data attributes
            tags: tags || [],
            headerImage: headerImage || '/images/error.png',
            excerpt: '', // Add if you have an excerpt field
            date: date || new Date().toISOString().split('T')[0],
            slug: slug || (title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            content: htmlContent,
            status: status || 'Draft'
          };

          console.log(`✅ Successfully processed: ${article.title} (Subject: ${article.subject})`);
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
