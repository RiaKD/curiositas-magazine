console.log('JavaScript file loaded');

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupOnlineResourcesDropdown();
});

function setupNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const dropdown = document.getElementById('myDropdown');
    const mobileNav = document.querySelector('.mobile-nav');
    const desktopNav = document.querySelector('.desktop-nav');

    function updateNavVisibility() {
        if (window.innerWidth >= 768) {
            if (mobileNav) mobileNav.style.display = 'none';
            if (desktopNav) desktopNav.style.display = 'block';
        } else {
            if (mobileNav) mobileNav.style.display = 'block';
            if (desktopNav) desktopNav.style.display = 'none';
            if (dropdown) dropdown.style.display = 'none';
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

// Mobile subjects dropdown toggle functionality
function setupMobileSubjectsDropdown() {
    // Only setup on mobile devices (≤750px)
    if (window.innerWidth > 750) {
        return; // Don't setup on laptop screens
    }
    
    const dogNav = document.querySelector('.dog-nav');
    
    if (dogNav) {
        // Check if subjects button already exists
        if (dogNav.querySelector('.subjects-toggle-btn')) {
            return; // Already exists
        }
        
        // Create a clickable button element for the subjects dropdown
        const subjectsButton = document.createElement('div');
        subjectsButton.className = 'subjects-toggle-btn';
        subjectsButton.innerHTML = 'Subjects ▼';
        subjectsButton.style.cssText = `
            padding: 10px 16px;
            background: #181828;
            color: white;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            text-align: center;
            border: 2px solid white;
            box-shadow: 0 0 8px white, 0 0 16px white;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 100px;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        `;
        
        // Insert the subjects button
        dogNav.insertBefore(subjectsButton, dogNav.firstChild);
        
        // Toggle dropdown on click
        subjectsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dogNav.classList.toggle('dropdown-open');
            
            // Debug: Log the current state
            console.log('Dropdown clicked, has dropdown-open class:', dogNav.classList.contains('dropdown-open'));
            console.log('All dog-btn elements:', dogNav.querySelectorAll('.dog-btn').length);
            
            // Update button text based on state
            if (dogNav.classList.contains('dropdown-open')) {
                subjectsButton.innerHTML = 'Subjects ▲';
                // Force only SUBJECT buttons to be visible (exclude Articles)
                const subjectButtons = dogNav.querySelectorAll('.dog-btn:not(.dog-pink)');
                subjectButtons.forEach(btn => {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                    btn.style.opacity = '1';
                });
                // Hide Articles button
                const articlesButton = dogNav.querySelector('.dog-btn.dog-pink');
                if (articlesButton) {
                    articlesButton.style.display = 'none';
                }
            } else {
                subjectsButton.innerHTML = 'Subjects ▼';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!dogNav.contains(event.target)) {
                dogNav.classList.remove('dropdown-open');
                subjectsButton.innerHTML = 'Subjects ▼';
            }
        });
        
        // Close dropdown when clicking on a subject button
        dogNav.addEventListener('click', (event) => {
            if (event.target.classList.contains('dog-btn')) {
                dogNav.classList.remove('dropdown-open');
                subjectsButton.innerHTML = 'Subjects ▼';
            }
        });
    }
}

// Removed Google Apps Script and article fetching logic

// Display articles on the articles page if the container exists
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
if (typeof window.activeFilters === 'undefined') {
    window.activeFilters = new Set(['all']);
}

function toggleFilter(tag) {
    if (tag === 'all') {
        window.activeFilters.clear();
        window.activeFilters.add('all');
    } else {
        window.activeFilters.delete('all');
        if (window.activeFilters.has(tag)) {
            window.activeFilters.delete(tag);
            if (window.activeFilters.size === 0) {
                window.activeFilters.add('all');
            }
        } else {
            window.activeFilters.add(tag);
        }
    }
    updateFilterDisplay();
    filterArticles();
}

function updateFilterDisplay() {
    document.querySelectorAll('.filter-tag').forEach(tagElement => {
        const tag = tagElement.getAttribute('data-tag');
        if (window.activeFilters.has(tag)) {
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
        if (window.activeFilters.has('all') || tags.some(tag => window.activeFilters.has(tag))) {
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
    setupMobileSubjectsDropdown(); // Setup mobile subjects dropdown

    setupCenteredList(); // Setup centered scrollable list
    // Removed fetchArticles(); // Fetch articles on any page load
});

// Handle resize events to add/remove mobile subjects dropdown
window.addEventListener('resize', () => {
    const dogNav = document.querySelector('.dog-nav');
    const subjectsButton = dogNav?.querySelector('.subjects-toggle-btn');
    
    if (window.innerWidth <= 750) {
        // Mobile: setup dropdown if it doesn't exist
        if (!subjectsButton) {
            setupMobileSubjectsDropdown();
        }
    } else {
        // Laptop: remove dropdown if it exists
        if (subjectsButton) {
            subjectsButton.remove();
            dogNav.classList.remove('dropdown-open');
        }
    }
    
    // Setup list item click handlers - moved to setupCenteredList function
    // This was causing the listItems error - removed duplicate code
});



// Centered scrollable list functionality
function setupCenteredList() {
    const listItems = document.querySelectorAll('.centered-scrollable-list .list-item');
    const menuBtn = document.getElementById('mobileMenuBtn');
    const centeredList = document.getElementById('centeredList');
    
    // Setup menu button functionality
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (centeredList) {
                if (menuBtn.classList.contains('close-mode')) {
                    // Close the menu
                    centeredList.classList.remove('show-menu');
                    menuBtn.textContent = '☰ Menu';
                    menuBtn.classList.remove('close-mode');
                } else {
                    // Open the menu
                    centeredList.classList.add('show-menu');
                    menuBtn.textContent = '✕';
                    menuBtn.classList.add('close-mode');
                }
            }
        });
    }
    
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            const subject = item.dataset.subject;
            console.log('List item clicked:', subject);
            
            // Add visual feedback
            item.style.background = 'rgba(255, 255, 255, 0.3)';
            setTimeout(() => {
                item.style.background = '';
            }, 200);
            
            // Handle navigation based on subject
            // Get the base path for GitHub Pages
            const basePath = window.location.pathname.includes('/curiositas-magazine/') 
                ? '/curiositas-magazine' 
                : '';
            
            switch(subject) {
                case 'home':
                    window.location.href = basePath + '/index.html';
                    break;
                case 'all':
                    window.location.href = basePath + '/all-articles/';
                    break;
                case 'chemistry':
                    window.location.href = basePath + '/chemistry.html';
                    break;
                case 'physics':
                    window.location.href = basePath + '/physics.html';
                    break;
                case 'biology':
                    window.location.href = basePath + '/biology.html';
                    break;
                case 'mathematics':
                    window.location.href = basePath + '/mathematics.html';
                    break;
                case 'computer-science':
                    window.location.href = basePath + '/computer_science.html';
                    break;
                case 'submissions':
                    window.location.href = basePath + '/submissions.html';
                    break;
                case 'applications':
                    window.location.href = basePath + '/applications.html';
                    break;
                default:
                    console.log('Subject not implemented:', subject);
            }
        });
    });
}

// Inspiring Figures Carousel Logic (for mathematics.html)
// Removed carousel logic and references to quoteone.png, quotetwo.jpg, quotethree.jpg

// TV remote cycling logic (GitHub Pages compatible paths)
document.addEventListener('DOMContentLoaded', function() {
    const tvImg = document.getElementById('pinktv');
    const remoteBtn = document.getElementById('remote-btn');
    
    if (tvImg && remoteBtn) {
        // Get the base path by examining existing images on the page
        const existingImgSrc = tvImg.src;
        const basePath = existingImgSrc.includes('/curiositas-magazine/') 
            ? '/curiositas-magazine' 
            : '';
        
        const tvImages = [
            `${basePath}/images/pinktv0.png`, 
            `${basePath}/images/pinktv1.png`, 
            `${basePath}/images/pinktv2.png`
        ];
        let currentIndex = 0; // Start at pinktv0.png
        
        remoteBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % tvImages.length;
            tvImg.src = tvImages[currentIndex];
        });
    }
});

// Quote figure cycling logic for all subjects (GitHub Pages compatible paths)
document.addEventListener('DOMContentLoaded', function() {
    // Define quote configurations for each subject
    const quoteConfigs = {
        'biology-figure-img': { prefix: 'b', count: 5 },
        'chemistry-figure-img': { prefix: 'ch', count: 5 },
        'computer-science-figure-img': { prefix: 'co', count: 5 },
        'mathematics-figure-img': { prefix: 'm', count: 5 },
        'physics-figure-img': { prefix: 'p', count: 5 }
    };
    
    // Setup cycling for each subject figure
    Object.keys(quoteConfigs).forEach(figureId => {
        const figureImg = document.getElementById(figureId);
        const definitionImg = document.querySelector('.definition-img');
        
        if (figureImg) {
            const config = quoteConfigs[figureId];
            
            // Get the base path by examining existing images
            const existingImgSrc = figureImg.src;
            const basePath = existingImgSrc.includes('/curiositas-magazine/') 
                ? '/curiositas-magazine' 
                : '';
            
            // Generate quote images array
            const quoteImages = [];
            for (let i = 1; i <= config.count; i++) {
                quoteImages.push(`${basePath}/images/quotes/${config.prefix}${i}.png`);
            }
            
            let currentIndex = 0;
            
            // Height matching function
            function matchFigureHeight() {
                if (definitionImg && figureImg) {
                    if (definitionImg.complete && figureImg.complete) {
                        figureImg.style.height = definitionImg.clientHeight + 'px';
                        figureImg.style.width = 'auto';
                    } else {
                        definitionImg.onload = matchFigureHeight;
                        figureImg.onload = matchFigureHeight;
                    }
                }
            }
            
            // Setup event listeners
            window.addEventListener('load', matchFigureHeight);
            window.addEventListener('resize', matchFigureHeight);
            
            // Click to cycle through quotes
            figureImg.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % quoteImages.length;
                figureImg.src = quoteImages[currentIndex];
                figureImg.onload = matchFigureHeight;
            });
        }
    });
});

// Online Resources, Recommended Reading, and Opportunities Dropdown functionality
function setupOnlineResourcesDropdown() {
    const onlineResourceDropdowns = document.querySelectorAll('.online-resources-dropdown');
    const recommendedReadingDropdowns = document.querySelectorAll('.recommended-reading-dropdown');
    const opportunitiesDropdowns = document.querySelectorAll('.opportunities-dropdown');
    
    // Setup online resources dropdowns
    onlineResourceDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (button && content) {
            button.addEventListener('click', function() {
                dropdown.classList.toggle('active');
                
                // Close other online resource dropdowns
                onlineResourceDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Close recommended reading dropdowns
                recommendedReadingDropdowns.forEach(otherDropdown => {
                    otherDropdown.classList.remove('active');
                });
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Setup recommended reading dropdowns
    recommendedReadingDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (button && content) {
            button.addEventListener('click', function() {
                console.log('Recommended reading dropdown clicked');
                dropdown.classList.toggle('active');
                console.log('Dropdown active state:', dropdown.classList.contains('active'));
                
                // Close other recommended reading dropdowns
                recommendedReadingDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Close online resource dropdowns
                onlineResourceDropdowns.forEach(otherDropdown => {
                    otherDropdown.classList.remove('active');
                });
            });
            
            // Setup nested category dropdowns within this dropdown
            const categoryButtons = dropdown.querySelectorAll('.dropdown-content .dropdown-btn');
            console.log('Found category buttons:', categoryButtons.length);
            categoryButtons.forEach(categoryBtn => {
                const categoryContent = categoryBtn.nextElementSibling;
                console.log('Category button:', categoryBtn.textContent.trim(), 'Content:', categoryContent);
                if (categoryContent && categoryContent.classList.contains('dropdown-content')) {
                    categoryBtn.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent parent dropdown from closing
                        console.log('Category button clicked:', categoryBtn.textContent.trim());
                        categoryContent.classList.toggle('active');
                        
                        // Close other category dropdowns within this main dropdown
                        categoryButtons.forEach(otherCategoryBtn => {
                            if (otherCategoryBtn !== categoryBtn) {
                                const otherCategoryContent = otherCategoryBtn.nextElementSibling;
                                if (otherCategoryContent && otherCategoryContent.classList.contains('dropdown-content')) {
                                    otherCategoryContent.classList.remove('active');
                                }
                            }
                        });
                    });
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Setup opportunities dropdowns
    opportunitiesDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (button && content) {
            button.addEventListener('click', function() {
                console.log('Opportunities dropdown clicked');
                dropdown.classList.toggle('active');
                console.log('Dropdown active state:', dropdown.classList.contains('active'));
                
                // Close other opportunities dropdowns
                opportunitiesDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Close other types of dropdowns
                onlineResourceDropdowns.forEach(otherDropdown => {
                    otherDropdown.classList.remove('active');
                });
                
                recommendedReadingDropdowns.forEach(otherDropdown => {
                    otherDropdown.classList.remove('active');
                });
            });
            
            // Setup nested category dropdowns within this dropdown
            const categoryButtons = dropdown.querySelectorAll('.dropdown-content .dropdown-btn');
            console.log('Found opportunity category buttons:', categoryButtons.length);
            categoryButtons.forEach(categoryBtn => {
                const categoryContent = categoryBtn.nextElementSibling;
                console.log('Opportunity category button:', categoryBtn.textContent.trim(), 'Content:', categoryContent);
                if (categoryContent && categoryContent.classList.contains('dropdown-content')) {
                    categoryBtn.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent parent dropdown from closing
                        console.log('Opportunity category button clicked:', categoryBtn.textContent.trim());
                        categoryContent.classList.toggle('active');
                        
                        // Close other category dropdowns within this main dropdown
                        categoryButtons.forEach(otherCategoryBtn => {
                            if (otherCategoryBtn !== categoryBtn) {
                                const otherCategoryContent = otherCategoryBtn.nextElementSibling;
                                if (otherCategoryContent && otherCategoryContent.classList.contains('dropdown-content')) {
                                    otherCategoryContent.classList.remove('active');
                                }
                            }
                        });
                    });
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}