console.log('JavaScript file loaded');

document.addEventListener('DOMContentLoaded', setupNavigation);

function setupNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const dropdown = document.getElementById('myDropdown');
    const mobileNav = document.querySelector('.mobile-nav');
    const desktopNav = document.querySelector('.desktop-nav');

    function updateNavVisibility() {
        if (window.innerWidth >= 768) {
            mobileNav.style.display = 'none';
            desktopNav.style.display = 'block';
        } else {
            mobileNav.style.display = 'block';
            desktopNav.style.display = 'none';
            dropdown.style.display = 'none';
        }
    }

    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            menuBtn.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (window.innerWidth < 768 && !event.target.matches('.menu-btn') && !dropdown.contains(event.target)) {
                dropdown.style.display = 'none';
                menuBtn.classList.remove('open');
            }
        });
    }

    window.addEventListener('resize', updateNavVisibility);
    updateNavVisibility(); // Call on initial load
}

function fetchArticles() {
    console.log('fetchArticles function called');
    
    // IMPORTANT: Replace this with your Google Apps Script URL
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbxGqhPuYbXXRaxU4H3rFZhtRdqnsWPA1wap5PYh0L8Phcn2C6nL9iIU55TR1k1CfyNxVw/exec';    
    console.log('Apps Script URL:', appsScriptUrl);
    
    if (appsScriptUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.error('Please update the appsScriptUrl in script.js');
        const articleList = document.getElementById('article-list');
        if (articleList) {
            articleList.innerHTML = `<p style="text-align: center;">Please configure the Google Apps Script URL.</p>`;
        }
        return;
    }
    
    // Use JSONP to avoid CORS issues
    const script = document.createElement('script');
    const callbackName = 'handleArticlesData_' + Date.now();
    
    console.log('Created callback name:', callbackName);
    
    // Create a global callback function
    window[callbackName] = function(data) {
        console.log('JSONP callback received data:', data);
        
        // Clean up the script tag
        document.head.removeChild(script);
        delete window[callbackName];
        
        // Check if the Apps Script returned an error message
        if (data.error) {
            console.error('Error from Google Apps Script:', data.error);
            const articleList = document.getElementById('article-list');
            if (articleList) {
                articleList.innerHTML = `<p style="text-align: center;"><b>An error occurred in the Google Apps Script:</b><br>${data.error}</p>`;
            }
            return;
        }

        // Be more flexible with the data format from the Apps Script
        let articles = [];
        if (data.articles && Array.isArray(data.articles)) {
            console.log('Found articles in data.articles:', data.articles.length);
            articles = data.articles;
        } else if (Array.isArray(data)) {
            console.log('Found articles as direct array:', data.length);
            articles = data;
        } else {
            console.error('Data format from Apps Script is incorrect. Expected an object with an "articles" property, or an array of articles.');
            console.log('Actual data received:', data);
            const articleList = document.getElementById('article-list');
            if (articleList) {
                articleList.innerHTML = `<p style="text-align: center;">Could not read data from Apps Script. Check console for details.</p>`;
            }
            return;
        }

        console.log('Final articles array:', articles);

        // Log the first article to see what fields we have
        if (articles.length > 0) {
            console.log('First article data:', articles[0]);
            console.log('Available fields:', Object.keys(articles[0]));
        }

        // Display articles on the articles page if the container exists
        if (document.getElementById('article-list')) {
            console.log('Found article-list container, calling displayArticles');
            displayArticles(articles);
            setupTagFilters(articles);
        } else {
            console.log('No article-list container found');
        }

        // Display top articles on the homepage if the container exists
        if (document.getElementById('top-articles-list')) {
            console.log('Found top-articles-list container, calling displayTopArticles');
            // You can define what makes an article "popular" here.
            // For now, we'll just take the first 3.
            const topArticles = articles.slice(0, 3);
            displayTopArticles(topArticles);
        } else {
            console.log('No top-articles-list container found');
        }
    };
    
    // Set up error handling
    script.onerror = function() {
        console.error('Script loading error occurred');
        document.head.removeChild(script);
        delete window[callbackName];
        console.error('Error loading data from Apps Script');
        const articleList = document.getElementById('article-list');
        if (articleList) {
            articleList.innerHTML = `<p style="text-align: center;">Could not load articles. Check the Apps Script URL and make sure it's deployed correctly.</p>`;
        }
    };
    
    // Set the script source with the callback parameter
    const fullUrl = appsScriptUrl + '?callback=' + callbackName;
    console.log('Loading script from URL:', fullUrl);
    script.src = fullUrl;
    document.head.appendChild(script);
    console.log('Script tag added to document head');
}

function displayTopArticles(topArticles) {
    const topArticlesList = document.getElementById('top-articles-list');
    if (!topArticlesList) return;

    // This function will now make tiles clickable to open the modal
    topArticlesList.innerHTML = topArticles.map(article => `
        <div class="article-tile" data-title="${article.title}">
            <img src="${article.image || article.headerImage || 'logo.png'}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-info">By ${article.author} on ${formatDate(article.date)}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for the modal
    setupArticleClickListeners(topArticlesList, topArticles);
}

function displayArticles(articles) {
    const articleList = document.getElementById('article-list');
    if (!articleList) return;

    articleList.innerHTML = articles.map(article => {
        // Determine subject class
        let subjectClass = '';
        if (article.subject) {
            const normalized = article.subject.toLowerCase().replace(/\s+/g, '');
            if (["mathematics","physics","biology","chemistry","computerscience"].includes(normalized)) {
                subjectClass = `${normalized}-articles`;
            }
        }
        return `
        <div class="article-tile${subjectClass ? ' ' + subjectClass : ''}" data-tags="${article.tags ? article.tags.join(',') : ''}" data-title="${article.title}">
            <img src="${article.image || article.headerImage || 'logo.png'}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-info">By ${article.author} on ${formatDate(article.date)}</p>
                <div class="article-tags">
                    ${article.tags ? article.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        </div>
        `;
    }).join('');

    // Add event listeners for the modal
    setupArticleClickListeners(articleList, articles);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Return original string if date is invalid
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Add these functions for tag filtering
let activeFilters = new Set(['all']);

function toggleFilter(tag) {
    if (tag === 'all') {
        activeFilters.clear();
        activeFilters.add('all');
    } else {
        activeFilters.delete('all');
        if (activeFilters.has(tag)) {
            activeFilters.delete(tag);
            if (activeFilters.size === 0) {
                activeFilters.add('all');
            }
        } else {
            activeFilters.add(tag);
        }
    }
    updateFilterDisplay();
    filterArticles();
}

function updateFilterDisplay() {
    document.querySelectorAll('.filter-tag').forEach(tagElement => {
        const tag = tagElement.getAttribute('data-tag');
        if (activeFilters.has(tag)) {
            tagElement.classList.add('active');
        } else {
            tagElement.classList.remove('active');
        }
    });
}

function filterArticles() {
    const articleTiles = document.querySelectorAll('.article-tile');
    articleTiles.forEach(tile => {
        const tags = tile.getAttribute('data-tags').split(',');
        if (activeFilters.has('all') || tags.some(tag => activeFilters.has(tag))) {
            tile.style.display = '';
        } else {
            tile.style.display = 'none';
        }
    });
}

function setupTagFilters(articles) {
    const tagFilterContainer = document.getElementById('tag-filter');
    if (!tagFilterContainer) return;

    const allTags = new Set();
    articles.forEach(article => {
        if (article.tags) {
            article.tags.forEach(tag => allTags.add(tag));
        }
    });

    // Clear existing tags except for 'All'
    tagFilterContainer.innerHTML = `<span class="filter-tag active" data-tag="all" onclick="toggleFilter('all')">All</span>`;
    
    allTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'filter-tag';
        tagElement.setAttribute('data-tag', tag);
        tagElement.textContent = tag;
        tagElement.onclick = () => toggleFilter(tag);
        tagFilterContainer.appendChild(tagElement);
    });
}

// Function to handle displaying article content in a modal
function displayArticleInModal(article) {
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');

    if (!modal || !modalContent) {
        console.error('Modal elements not found!');
        return;
    }

    function populateModal(content) {
        modalContent.innerHTML = `
            <span class="close-btn">&times;</span>
            <img src="${article.image || article.headerImage}" alt="${article.title}" class="modal-header-image">
            <h2 class="modal-title">${article.title}</h2>
            <p class="modal-info">By ${article.author} on ${formatDate(article.date)}</p>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-tags">
                ${article.tags ? article.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
        `;

        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }

    if (article.content) {
        let content = article.content.replace(/\n/g, '<br>');
        populateModal(content);
    } else {
        const content = 'Content not available';
        populateModal(content);
    }
}

// Function to set up click listeners on article tiles
function setupArticleClickListeners(container, articles) {
    console.log('Setting up click listeners for', articles.length, 'articles');
    
    container.addEventListener('click', (e) => {
        const tile = e.target.closest('.article-tile');
        if (tile) {
            const title = tile.dataset.title;
            console.log('Article tile clicked:', title);
            const article = articles.find(a => a.title === title);
            if (article) {
                console.log('Found article:', article);
                displayArticleInModal(article);
            } else {
                console.error('Article not found for title:', title);
            }
        }
    });
}

// This function is called when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchArticles(); // Fetch articles on any page load
});

// Inspiring Figures Carousel Logic (for mathematics.html)
// Removed carousel logic and references to quoteone.png, quotetwo.jpg, quotethree.jpg

document.addEventListener('DOMContentLoaded', function() {
    // TV remote cycling logic
    const tvImg = document.getElementById('pinktv');
    const remoteBtn = document.getElementById('remote-btn');
    const tvContainer = document.querySelector('.tv-remote-container');
    const cdSection = document.querySelector('.cd-section');
    function checkTvOverlap() {
        if (!tvContainer || !cdSection) return;
        const cdRect = cdSection.getBoundingClientRect();
        if (cdRect.top < 120) {
            tvContainer.classList.add('scrolled');
        } else {
            tvContainer.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', checkTvOverlap);
    checkTvOverlap();
    if (tvImg && remoteBtn) {
        const tvImages = ['pinktv0.png', 'pinktv1.png', 'pinktv2.png'];
        let currentIndex = 0; // Start at pinktv0.png
        tvImg.src = tvImages[currentIndex];
        remoteBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % tvImages.length;
            tvImg.src = tvImages[currentIndex];
        });
    }
});