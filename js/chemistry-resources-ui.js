// Resources functionality for chemistry page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chemistry Resources UI loaded');
    
    try {
        const wordResourcesButtons = document.querySelectorAll('.word-resources-box .resources-btn');
        const wordResourcesContent = document.getElementById('word-resources-content');
        
        console.log('Found wordResourcesButtons:', wordResourcesButtons.length);
        console.log('Found wordResourcesContent:', wordResourcesContent);
        
        if (wordResourcesButtons.length === 0) {
            console.error('No resource buttons found!');
            return;
        }
        
        if (!wordResourcesContent) {
            console.error('Resources content element not found!');
            return;
        }
        
                 const chemistryResources = {
            'online-resources': [
                "BBC Bitesize (GCSE & A-Level Chemistry) - Free resource with notes, interactive activities, videos, and quizzes",
                "Physics & Maths Tutor (PMT) Education - Goldmine of free resources with detailed revision notes and past papers",
                "Seneca Learning - Free interactive courses using smart algorithms to help learning and retention",
                "Chemguide (chemguide.co.uk) - Incredibly detailed website for understanding complex chemical concepts and mechanisms",
                "Save My Exams - High-quality revision notes, exam-style questions, and past papers for all exam boards",
                "CK Chemistry (ckchemistry.co.uk) - Free downloadable revision resources including multiple-choice questions",
                "A-level Chemistry.co.uk - Revision guides, quizzes, mind maps, and practice exam booklets",
                "Cognito - Video lessons, notes, practice questions, and flashcards for GCSE and A-Level"
            ],


        };
        
        function showWordResource(resourceType) {
            console.log('showWordResource called with:', resourceType);
            try {
                // Hide resource type buttons
                wordResourcesButtons.forEach(btn => {
                    btn.style.display = 'none';
                    console.log('Hiding button:', btn);
                });
                
                // Update content
                const content = chemistryResources[resourceType];
                if (!content) {
                    console.error('No content found for resource type:', resourceType);
                    return;
                }
                
                wordResourcesContent.innerHTML = `
                    <div class="resource-details">
                        <ul>
                                                         ${content.map(item => {
                                 const parts = item.split(' - ');
                                 if (parts.length === 2) {
                                     const name = parts[0];
                                     const description = parts[1];
                                     let linkedName = name;
                                     
                                     // Convert website names to hyperlinks
                                     if (name.includes('BBC Bitesize')) {
                                         linkedName = `<a href="https://www.bbc.co.uk/bitesize" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Physics & Maths Tutor') || name.includes('PMT')) {
                                         linkedName = `<a href="https://www.physicsandmathstutor.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Seneca Learning')) {
                                         linkedName = `<a href="https://senecalearning.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Save My Exams')) {
                                         linkedName = `<a href="https://www.savemyexams.co.uk" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Chemguide')) {
                                         linkedName = `<a href="https://chemguide.co.uk" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('CK Chemistry')) {
                                         linkedName = `<a href="https://ckchemistry.co.uk" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('A-level Chemistry.co.uk')) {
                                         linkedName = `<a href="https://alevelchemistry.co.uk" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Cognito')) {
                                         linkedName = `<a href="https://cognitoedu.org" target="_blank" class="resource-link">${name}</a>`;
                                     }
                                     
                                     return `<li><span class="resource-name">${linkedName}</span> - <span class="resource-description">${description}</span></li>`;
                                 } else {
                                     return `<li><span class="resource-name">${item}</span></li>`;
                                 }
                             }).join('')}
                        </ul>
                    </div>
                    <div class="resource-navigation">
                        <button class="resource-back-btn" onclick="goBackToWordResourceCategories()">Back to Categories</button>
                    </div>
                `;
            } catch (error) {
                console.error('Error in showWordResource:', error);
            }
        }
        
        function goBackToWordResourceCategories() {
            console.log('goBackToWordResourceCategories called');
            try {
                // Show resource type buttons
                wordResourcesButtons.forEach(btn => {
                    btn.style.display = 'flex';
                    console.log('Showing button:', btn);
                });
                
                // Reset content
                wordResourcesContent.innerHTML = `
                    <h3>Select a resource type to see relevant options</h3>
                `;
            } catch (error) {
                console.error('Error in goBackToWordResourceCategories:', error);
            }
        }
        
        // Make functions globally accessible
        window.showWordResource = showWordResource;
        window.goBackToWordResourceCategories = goBackToWordResourceCategories;
        
        // Add event listeners to buttons
        wordResourcesButtons.forEach((button, index) => {
            console.log(`Adding event listener to button ${index}:`, button);
            button.addEventListener('click', function(e) {
                console.log('Button clicked!', e);
                const resourceType = this.getAttribute('data-resource');
                console.log('Resource button clicked:', resourceType);
                showWordResource(resourceType);
            });
        });
        
        console.log('Event listeners added to', wordResourcesButtons.length, 'buttons');
        
    } catch (error) {
        console.error('Error in chemistry resources UI initialization:', error);
    }
}); 