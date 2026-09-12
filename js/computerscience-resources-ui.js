// Resources functionality for computer science page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Computer Science Resources UI loaded');
    
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
        
                 const computerScienceResources = {
            'online-resources': [
                "BBC Bitesize (GCSE & A-Level Computer Science) - Fantastic free resource with clear notes, videos, quizzes, and activities aligned with exam boards",
                "Isaac Computer Science - Superb free online textbook from University of Cambridge and Raspberry Pi Foundation with interactive questions",
                "Physics & Maths Tutor (PMT) Education - Excellent free revision notes, topic questions, and past papers for all exam boards",
                "Seneca Learning - Free AI-powered platform using spaced repetition and active recall for effective learning",
                "Save My Exams - Quality revision notes, exam-style questions, and past papers tailored to specific exam boards",
                "Craig 'n' Dave (YouTube & Website) - Extremely popular comprehensive video tutorials covering entire syllabus",
                "Teach Computing - Part of National Centre for Computing Education with wealth of resources for teachers and students",
                "Khan Academy Computer Science - Excellent conceptual explanations for foundational computer science topics"
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
                const content = computerScienceResources[resourceType];
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
                                     } else if (name.includes('Isaac Computer Science')) {
                                         linkedName = `<a href="https://isaaccomputerscience.org" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Physics & Maths Tutor') || name.includes('PMT')) {
                                         linkedName = `<a href="https://www.physicsandmathstutor.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Seneca Learning')) {
                                         linkedName = `<a href="https://senecalearning.com" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Save My Exams')) {
                                         linkedName = `<a href="https://www.savemyexams.co.uk" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Craig \'n\' Dave')) {
                                         linkedName = `<a href="https://craigndave.org" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Teach Computing')) {
                                         linkedName = `<a href="https://teachcomputing.org" target="_blank" class="resource-link">${name}</a>`;
                                     } else if (name.includes('Khan Academy Computer Science')) {
                                         linkedName = `<a href="https://www.khanacademy.org/computing" target="_blank" class="resource-link">${name}</a>`;
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
        console.error('Error in computer science resources UI initialization:', error);
    }
}); 