// Game UI for articles.html
// Placeholder articles data (replace with real data or fetch from backend)

const articles = window.ARTICLES_DATA || [];

let currentTag = 'All';
let featuredIndex = 0;

function renderTags() {
  const tagSet = new Set(['All']);
  articles.forEach(a => a.tags && a.tags.forEach(tag => tagSet.add(tag)));
  const tagFilter = document.getElementById('game-tag-filter');
  tagFilter.innerHTML = '';
  tagSet.forEach(tag => {
    const tagBtn = document.createElement('button');
    tagBtn.className = 'game-tag-btn' + (tag === currentTag ? ' active' : '');
    tagBtn.textContent = tag;
    tagBtn.onclick = () => {
      currentTag = tag;
      featuredIndex = 0;
      renderArticles();
      renderTags();
    };
    tagFilter.appendChild(tagBtn);
  });
}

function renderArticles() {
  if (!articles || !articles.length) {
    document.getElementById('featured-article').innerHTML = '<p>No articles found.</p>';
    document.getElementById('other-articles-list').innerHTML = '';
    return;
  }
  // Filter articles by tag
  const filtered = currentTag === 'All' ? articles : articles.filter(a => a.tags && a.tags.includes(currentTag));
  // Featured article
  const featured = filtered[featuredIndex] || filtered[0];
  const featuredDiv = document.getElementById('featured-article');
  // Pink GIFs
  const pinkGifs = [
    '/images/gifs/p1.gif',
    '/images/gifs/p2.gif',
    '/images/gifs/p3.gif',
    '/images/gifs/p4.gif',
    '/images/gifs/p5.gif',
    '/images/gifs/p6.gif'
  ];
  const randomGif = pinkGifs[Math.floor(Math.random() * pinkGifs.length)];
  // Use logo as default image if no headerImage
  const featuredImage = featured.headerImage || '/images/logo.png';
  // Use content, excerpt, or fallback
  let articleContent = featured.content || featured.excerpt;
  // Use references for citations, always as array
  let citations = featured.references || featured.citations || [];
  if (!Array.isArray(citations)) {
    if (typeof citations === 'string') {
      citations = citations.split('\n').map(s => s.trim()).filter(Boolean);
    } else {
      citations = [];
    }
  }
  featuredDiv.innerHTML = `
    <div class="featured-article-box">
      <div class="featured-meta">
        <div class="featured-author-date cute-author-date">
          <div class="cute-author-left">
            <img src="${randomGif}" alt="cute pink gif" class="cute-pink-gif" />
            <span class="cute-author">By ${featured.author}</span>
          </div>
          <span class="cute-date">${formatDate(featured.date)}</span>
        </div>
        <div class="featured-tags">
          ${(featured.tags || []).map(tag => `<span class="tag">${tag}</span>`).join(' ')}
        </div>
      </div>
      <hr class="featured-divider" />
      <div class="featured-content">${articleContent ? articleContent : '<p>Loading full article...</p>'}</div>
      ${citations.length ? `<div class="featured-citations"><h4>References</h4><ul>${citations.map(c => `<li>${c}</li>`).join('')}</ul></div>` : ''}
    </div>
  `;
  // If no content/excerpt, fetch the full article HTML
  if (!articleContent && featured.slug) {
    const basePath = window.location.pathname.includes('/curiositas-magazine/') 
        ? '/curiositas-magazine' 
        : '';
    fetch(`${basePath}/articles/${featured.slug}/`)
      .then(res => res.text())
      .then(html => {
        // Try to extract the main article content from the fetched HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        // Try to find the main content (adjust selector as needed)
        let mainContent = tempDiv.querySelector('.article-content') || tempDiv.querySelector('main') || tempDiv;
        document.querySelector('.featured-content').innerHTML = mainContent.innerHTML;
      })
      .catch(() => {
        document.querySelector('.featured-content').innerHTML = '<p>Sorry, could not load the full article.</p>';
      });
  }
  // Other articles
  const otherList = document.getElementById('other-articles-list');
  otherList.innerHTML = '';
  filtered.forEach((a, i) => {
    if (i === featuredIndex) return;
    const tile = document.createElement('div');
    tile.className = 'game-article-tile';
    const tileImage = a.headerImage || '/images/logo.png';
    tile.innerHTML = `
      <img src="${tileImage}" alt="${a.title}" class="tile-header-image" />
      <div class="tile-title">${a.title}</div>
      <div class="tile-meta">By ${a.author}</div>
    `;
    tile.onclick = () => {
      featuredIndex = i;
      renderArticles();
    };
    otherList.appendChild(tile);
  });
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTags();
  renderArticles();
}); 