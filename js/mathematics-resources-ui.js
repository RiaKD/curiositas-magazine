// Resources functionality for mathematics page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mathematics Resources UI loaded');
    
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
        
                 const mathematicsResources = {
            'online-resources': [
                "Maths Genie - Incredibly popular free resource with topic-by-topic questions, practice papers, and video solutions",
                "Corbettmaths - Excellent free resource with vast library of videos, worksheets, and 5-a-day practice questions",
                "Dr Frost Maths - Comprehensive free platform with thousands of videos and practice questions used by many schools",
                "BBC Bitesize (GCSE & A-Level Maths) - Clear revision notes, video explanations, and interactive activities",
                "Physics & Maths Tutor (PMT) Education - Indispensable free resource with vast revision notes and past papers",
                "Exam Solutions - Incredibly valuable free resource with extensive video tutorials covering almost every A-Level topic",
                "Integral Maths (integralmaths.org) - High-quality paid resource developed by MEI with comprehensive notes and exercises",
                "Khan Academy Mathematics - Wide range of free video lessons and practice exercises for core mathematical principles"
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
                const content = mathematicsResources[resourceType];
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
                                     if (name.includes('Maths Genie')) {
                                         linkedName = `<a href="https://www.mathsgenie.co.uk" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Corbettmaths')) {
                                         linkedName = `<a href="https://corbettmaths.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Dr Frost Maths')) {
                                         linkedName = `<a href="https://www.drfrostmaths.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('BBC Bitesize')) {
                                         linkedName = `<a href="https://www.bbc.co.uk/bitesize" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Physics & Maths Tutor') || name.includes('PMT')) {
                                         linkedName = `<a href="https://www.physicsandmathstutor.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Exam Solutions')) {
                                         linkedName = `<a href="https://www.examsolutions.net" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Integral Maths')) {
                                         linkedName = `<a href="https://integralmaths.org" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Khan Academy Mathematics')) {
                                         linkedName = `<a href="https://www.khanacademy.org/math" target="_blank" class="resource-link">${name}</a>`;
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
        console.error('Error in mathematics resources UI initialization:', error);
    }
}); 