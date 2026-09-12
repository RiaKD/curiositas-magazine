// Book Recommendations UI functionality
let currentBookCategory = null;
let currentBookIndex = 0;
let currentBooks = [];

const bookRecommendationsData = {
    biology: {
        "general-biology": [
            {
                name: "A Short History of Nearly Everything",
                author: "Bill Bryson",
                description: "While not exclusively biology, this book offers an incredibly engaging and accessible journey through scientific discoveries, including many biological ones, in a way that makes complex concepts understandable and fun. Highly recommended for both GCSE and A-Level."
            },
            {
                name: "The Body: A Guide for Occupants",
                author: "Bill Bryson",
                description: "A fascinating and often humorous exploration of the human body, its functions, and its quirks. Excellent for anyone interested in human biology."
            }
        ],
        "evolution-genetics": [
            {
                name: "The Selfish Gene",
                author: "Richard Dawkins",
                description: "A seminal work in evolutionary biology. While it can be challenging for GCSE students, it's a must-read for A-Level students and those considering further study in biology. It provides a foundational understanding of how genes drive evolution."
            },
            {
                name: "The Blind Watchmaker",
                author: "Richard Dawkins",
                description: "Another excellent book by Dawkins, which further explores the theory of evolution and natural selection with clear and persuasive arguments. More accessible than 'The Selfish Gene' for some."
            },
            {
                name: "Why Evolution Is True",
                author: "Jerry Coyne",
                description: "Offers a comprehensive and accessible overview of the evidence for evolution, weaving together genetics, molecular biology, and anatomy."
            },
            {
                name: "Genome: The Autobiography of a Species in 23 Chapters",
                author: "Matt Ridley",
                description: "Explores the human genome chapter by chapter, with each chapter focusing on a specific chromosome and the scientific and ethical implications associated with it. A great way to understand genetics in context."
            },
            {
                name: "The Double Helix",
                author: "James Watson",
                description: "A personal account of the discovery of the structure of DNA. Provides insight into the scientific process and the personalities involved."
            },
            {
                name: "The Language of the Genes",
                author: "Steve Jones",
                description: "A highly readable exploration of human genetics and its implications."
            },
            {
                name: "A Brief History of Everyone Who Ever Lived: The Stories in Our Genes",
                author: "Adam Rutherford",
                description: "Explains how our genes tell the story of human history, migrations, and even ancient viruses."
            }
        ],
        "medical-human": [
            {
                name: "The Immortal Life of Henrietta Lacks",
                author: "Rebecca Skloot",
                description: "A powerful and important book that intertwines science, ethics, and medical history through the story of Henrietta Lacks and her immortal cell line (HeLa cells). Excellent for both GCSE and A-Level, and particularly relevant for those interested in medicine."
            },
            {
                name: "When Breath Becomes Air",
                author: "Paul Kalanithi",
                description: "A poignant memoir by a neurosurgeon diagnosed with terminal lung cancer, reflecting on life, death, and the meaning of existence. Highly recommended for aspiring medics."
            },
            {
                name: "Being Mortal: Medicine and What Matters in the End",
                author: "Atul Gawande",
                description: "A profound exploration of aging, mortality, and end-of-life care, offering crucial insights for anyone considering a career in healthcare."
            },
            {
                name: "Do No Harm",
                author: "Henry Marsh",
                description: "A candid and fascinating memoir by a neurosurgeon, offering an honest look at the highs and lows of a career in brain surgery."
            },
            {
                name: "Bad Science",
                author: "Ben Goldacre",
                description: "Critically examines scientific research and exposes flaws and biases, especially in the context of medicine and pharmaceuticals. Essential for developing critical thinking skills."
            },
            {
                name: "This Is Going to Hurt",
                author: "Adam Kay",
                description: "A humorous yet often heartbreaking collection of diary entries from a junior doctor in the NHS, providing a raw and honest insight into the medical profession."
            },
            {
                name: "The Emperor of All Maladies: A Biography of Cancer",
                author: "Siddhartha Mukherjee",
                description: "A comprehensive history of cancer, its understanding, and the ongoing fight against it."
            }
        ],
        "ecology-environment": [
            {
                name: "The Hidden Life of Trees",
                author: "Peter Wohlleben",
                description: "Explores the fascinating ways trees communicate and interact within a forest ecosystem."
            },
            {
                name: "Entangled Life: How Fungi Make Our Worlds, Change Our Minds & Shape Our Futures",
                author: "Merlin Sheldrake",
                description: "A captivating dive into the often-overlooked world of fungi and their vital role in ecosystems and beyond."
            },
            {
                name: "The Sixth Extinction: An Unnatural History",
                author: "Elizabeth Kolbert",
                description: "Explores past mass extinctions and the current human-caused extinction event, highlighting crucial environmental issues."
            }
        ],
        "other-notable": [
            {
                name: "I Contain Multitudes: The Microbes Within Us and a Grander View of Life",
                author: "Ed Yong",
                description: "A wonderful exploration of the microbiome and its profound influence on our health and the natural world."
            },
            {
                name: "Your Inner Fish: A Journey into the 3.5-Billion-Year History of the Human Body",
                author: "Neil Shubin",
                description: "Traces the evolutionary history of the human body by looking at our ancient aquatic ancestors."
            },
            {
                name: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                description: "While not strictly biology, this book offers a broad historical and evolutionary perspective on the human species, touching on biological developments."
            }
        ]
    },
    chemistry: {
        "general-chemistry": [
            {
                name: "A Short History of Nearly Everything",
                author: "Bill Bryson",
                description: "While not exclusively chemistry, this book offers an incredibly engaging and accessible journey through scientific discoveries, including many chemical ones, in a way that makes complex concepts understandable and fun."
            },
            {
                name: "Moleculeys: The Elements and the Architecture of Everything",
                author: "Theodore Gray",
                description: "A beautifully illustrated book that explores the molecules that make up our world, providing a visual and engaging introduction to chemical structures and their properties. Great for all levels."
            },
            {
                name: "The Disappearing Spoon: And Other True Tales of Madness, Love, and the History of the World from the Periodic Table of the Elements",
                author: "Sam Kean",
                description: "Explores the fascinating stories, history, and bizarre facts behind each element on the periodic table. Very entertaining and informative."
            },
            {
                name: "Uncle Tungsten: Memories of a Chemical Boyhood",
                author: "Oliver Sacks",
                description: "A memoir by the renowned neurologist, recounting his childhood fascination with chemistry and the scientific process. Offers a personal and inspiring perspective on the subject."
            }
        ],
        "applied-chemistry": [
            {
                name: "Napoleon's Buttons: How 17 Molecules Changed History",
                author: "Penny Le Couteur and Jay Burreson",
                description: "Explores how specific molecules have had a profound impact on historical events, from disease to war to fashion. A great way to see chemistry's real-world relevance."
            },
            {
                name: "Stuff Matters: Exploring the Marvelous Materials That Shape Our Man-Made World",
                author: "Mark Miodownik",
                description: "Explores the science behind everyday materials like paper, concrete, chocolate, and steel. Highly engaging and shows how chemistry underpins material science."
            },
            {
                name: "Salt: A World History",
                author: "Mark Kurlansky",
                description: "A comprehensive history of salt, detailing its significance in human civilization, trade, and even chemical processes."
            },
            {
                name: "The Case of the Poisoner's Ring / The Case of the Deadly Dandelion (and others in The Elements of Murder series)",
                author: "John Emsley",
                description: "These books use real-life cases of poisoning and crime to illustrate chemical principles in a gripping, detective-story style."
            },
            {
                name: "The Poisoner's Handbook: Murder and the Birth of Forensic Medicine in Jazz Age New York",
                author: "Deborah Blum",
                description: "A fascinating look at the early days of forensic chemistry in the US, exploring how chemists developed methods to detect poisons and solve crimes."
            }
        ],
        "deeper-concepts": [
            {
                name: "Oxygen: The Molecule that Made the World",
                author: "Nick Lane",
                description: "Explores the crucial role of oxygen in the evolution of life and its fundamental chemical properties."
            },
            {
                name: "Mendeleyev's Dream: The Quest For The Elements",
                author: "Paul Strathern",
                description: "A captivating narrative about the history of the discovery of the elements and the creation of the periodic table."
            },
            {
                name: "Bad Science",
                author: "Ben Goldacre",
                description: "While not exclusively chemistry, this book is vital for developing critical thinking skills by exposing scientific misinformation, including that related to chemicals and health claims. Essential for A-Level students."
            },
            {
                name: "The Periodic Table",
                author: "Primo Levi",
                description: "A unique and profound book where each chapter is named after a chemical element and serves as a metaphor for an episode in the author's life, particularly his experiences during the Holocaust. Offers a literary and philosophical perspective on chemistry."
            }
        ],
        "advanced-challenging": [
            {
                name: "Atkins' Molecules",
                author: "P.W. Atkins",
                description: "A concise and elegant introduction to molecular structure and bonding from a renowned chemist. More theoretical, suitable for strong A-Level students."
            },
            {
                name: "Chemistry3: Introducing Inorganic, Organic and Physical Chemistry",
                author: "Andrew Burrows et al.",
                description: "While a textbook, dipping into chapters of a university-level introductory text can provide a more in-depth understanding of A-Level topics and beyond. Don't feel pressured to read it cover-to-cover, but use it for specific areas of interest."
            }
        ]
    },
    physics: {
        "general-physics": [
            {
                name: "A Short History of Nearly Everything",
                author: "Bill Bryson",
                description: "As with biology and chemistry, this book offers an incredibly engaging and accessible journey through scientific discoveries, including many fundamental physics concepts, making complex ideas digestible and fun. Highly recommended for both GCSE and A-Level."
            },
            {
                name: "Cosmos",
                author: "Carl Sagan",
                description: "A classic that beautifully explores the universe, our place in it, and the history of scientific discovery. Sagan's prose is both poetic and clear, making complex astronomical and physical concepts accessible."
            },
            {
                name: "Astrophysics for People in a Hurry",
                author: "Neil deGrasse Tyson",
                description: "A concise and enthusiastic guide to fundamental concepts in astrophysics, from the Big Bang to dark matter. Great for those with limited time but a big interest in space."
            },
            {
                name: "Seven Brief Lessons on Physics",
                author: "Carlo Rovelli",
                description: "A wonderfully concise and poetic exploration of some of the most profound ideas in modern physics, including general relativity, quantum mechanics, and the nature of time. More challenging but very rewarding for A-Level students."
            }
        ],
        "classical-mechanics": [
            {
                name: "The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory",
                author: "Brian Greene",
                description: "While delving into cutting-edge theory, Greene does an excellent job of explaining classical physics concepts like relativity in an intuitive way before moving into more complex ideas. Primarily for A-Level."
            },
            {
                name: "Surely You're Joking, Mr. Feynman!",
                author: "Richard Feynman",
                description: "A collection of anecdotes and reflections from the Nobel Prize-winning physicist. It offers a glimpse into the mind of a brilliant scientist and his unconventional approach to life and physics. Entertaining and inspiring."
            },
            {
                name: "The Newtonian Revolution",
                author: "I. Bernard Cohen",
                description: "A classic text that explains the context and impact of Newton's work on physics and beyond. More academic but insightful for those keen on history of science."
            }
        ],
        "quantum-modern": [
            {
                name: "A Brief History of Time",
                author: "Stephen Hawking",
                description: "A seminal work that attempts to explain complex cosmological concepts, including black holes, the Big Bang, and quantum mechanics, to a general audience. Can be challenging but highly rewarding for A-Level students."
            },
            {
                name: "Quantum Enigma: Physics Encounters Consciousness",
                author: "Bruce Rosenblum and Fred Kuttner",
                description: "Explores the stranger aspects of quantum mechanics and its philosophical implications, including the measurement problem and the role of the observer. For more advanced A-Level students."
            },
            {
                name: "Reality Is Not What It Seems: The Journey to Quantum Gravity",
                author: "Carlo Rovelli",
                description: "Continues from \"Seven Brief Lessons,\" delving deeper into quantum gravity and the attempts to unify general relativity and quantum mechanics. Challenging but fascinating for the highly motivated."
            }
        ],
        "astrophysics-cosmology": [
            {
                name: "Black Holes and Baby Universes and Other Essays",
                author: "Stephen Hawking",
                description: "A collection of essays on various topics in cosmology, including black holes, the origin of the universe, and the nature of time."
            },
            {
                name: "The Fabric of the Cosmos: Space, Time, and the Texture of Reality",
                author: "Brian Greene",
                description: "A comprehensive exploration of the fundamental nature of reality, delving into space, time, and the universe's structure. Longer and more detailed than \"The Elegant Universe.\""
            },
            {
                name: "Death by Black Hole: And Other Cosmic Quandaries",
                author: "Neil deGrasse Tyson",
                description: "Another engaging collection of essays by Tyson, addressing various intriguing questions about the cosmos with his characteristic enthusiasm."
            }
        ],
        "critical-thinking": [
            {
                name: "Bad Science",
                author: "Ben Goldacre",
                description: "While not exclusively physics, this book is crucial for developing critical thinking skills by exposing scientific misinformation and promoting evidence-based reasoning. Highly recommended for all STEM students."
            }
        ]
    },
    "computer-science": {
        "foundational-concepts": [
            {
                name: "The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography",
                author: "Simon Singh",
                description: "An incredibly engaging and accessible history of cryptography, from ancient ciphers to modern encryption techniques. It clearly explains complex mathematical and computational concepts. Excellent for both GCSE and A-Level."
            },
            {
                name: "Code: The Hidden Language of Computer Hardware and Software",
                author: "Charles Petzold",
                description: "This book takes you on a fascinating journey from simple switches and relays to the complex architecture of computers and software. It's a challenging but deeply rewarding read for understanding how computers truly work at a fundamental level. More suitable for A-Level."
            },
            {
                name: "The Universal Computer: The Road from Leibniz to Turing",
                author: "Martin Davis",
                description: "Explores the intellectual history leading up to the invention of the computer, focusing on the contributions of key figures like Leibniz, Boole, Babbage, and Turing. Good for understanding the theoretical underpinnings."
            },
            {
                name: "Alan Turing: The Enigma",
                author: "Andrew Hodges",
                description: "The definitive biography of Alan Turing, providing insight into his groundbreaking work in theoretical computer science, AI, and his crucial role in cracking the Enigma code during WWII. A fantastic read for A-Level students."
            }
        ],
        "algorithms-logic": [
            {
                name: "Algorithms Unlocked",
                author: "Thomas H. Cormen",
                description: "A more accessible introduction to algorithms than his well-known textbook. It covers fundamental algorithms and their applications without requiring a deep mathematical background. Great for building an intuition about how algorithms solve problems."
            },
            {
                name: "Computational Fairy Tales",
                author: "Jeremy Kubica",
                description: "Uses engaging stories to explain complex computer science concepts, including algorithms, data structures, and logic. A fun and digestible way to learn. Good for GCSE and early A-Level."
            },
            {
                name: "Logicomix: An Epic Search for Truth",
                author: "Apostolos Doxiadis and Christos Papadimitriou",
                description: "A graphic novel that tells the story of the foundations of mathematics and logic, featuring historical figures like Bertrand Russell, Godel, and Turing. A visually appealing way to engage with the logical underpinnings of computing."
            }
        ],
        "ai-future-tech": [
            {
                name: "Life 3.0: Being Human in the Age of Artificial Intelligence",
                author: "Max Tegmark",
                description: "Explores the potential future impacts of AI, both positive and negative, and encourages readers to think critically about how we can shape this future. Provocative and thought-provoking."
            },
            {
                name: "Superintelligence: Paths, Dangers, Strategies",
                author: "Nick Bostrom",
                description: "A more academic but highly influential book that delves into the profound risks and potential benefits of developing superintelligent AI. For very keen A-Level students interested in AI ethics and philosophy."
            },
            {
                name: "Hello World: How to be Human in the Age of Algorithms",
                author: "Hannah Fry",
                description: "Explores the impact of algorithms on various aspects of our lives, from justice and medicine to art and crime, examining their benefits and limitations."
            },
            {
                name: "AI Superpowers: China, Silicon Valley, and the New World Order",
                author: "Kai-Fu Lee",
                description: "Offers insights into the global race for AI dominance and its implications for the future of work and society."
            }
        ],
        "programming-problem-solving": [
            {
                name: "Outliers: The Story of Success",
                author: "Malcolm Gladwell",
                description: "While not directly about computer science, Gladwell's book discusses patterns of success, including the 10,000-hour rule, which is relevant to developing programming mastery and problem-solving skills."
            },
            {
                name: "The Martian",
                author: "Andy Weir",
                description: "(Fiction) While a novel, the protagonist solves incredibly complex engineering and computational problems using limited resources. It's a fantastic illustration of applied problem-solving and logical thinking, which are core to computer science."
            }
        ],
        "ethics-society": [
            {
                name: "Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy",
                author: "Cathy O'Neil",
                description: "Examines how algorithms and big data can perpetuate and amplify social inequalities and biases. Crucial for understanding the ethical implications of data science and AI."
            },
            {
                name: "The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power",
                author: "Shoshana Zuboff",
                description: "A deep dive into how technology companies gather and use our personal data, creating a new form of capitalism. A challenging but important read for understanding privacy and digital rights."
            },
            {
                name: "Privacy Is Power: Why and How You Should Take Control of Your Data",
                author: "Carissa Véliz",
                description: "A more accessible book about the importance of digital privacy and practical steps individuals can take to protect their data."
            }
        ]
    },
    mathematics: {
        "general-mathematics": [
            {
                name: "A Short History of Nearly Everything",
                author: "Bill Bryson",
                description: "While not exclusively mathematics, this book includes numerous fascinating insights into the mathematical discoveries that underpin our understanding of the universe. It's incredibly accessible and engaging for all levels."
            },
            {
                name: "Fermat's Last Theorem",
                author: "Simon Singh",
                description: "A thrilling detective story about the 350-year quest to prove Fermat's Last Theorem. Singh masterfully explains complex mathematical concepts in an accessible way, making the struggle and triumph of mathematicians palpable. Excellent for both GCSE and A-Level."
            },
            {
                name: "The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography",
                author: "Simon Singh",
                description: "As mentioned for Computer Science, this book brilliantly blends history, mathematics, and computer science through the lens of cryptography. It showcases the practical application of number theory and logic."
            },
            {
                name: "The Joy of X: A Guided Tour of Math, from One to Infinity",
                author: "Steven Strogatz",
                description: "A delightful and highly readable exploration of fundamental mathematical concepts, from basic arithmetic to calculus and beyond, presented with clarity and enthusiasm. Great for building intuition and appreciation."
            },
            {
                name: "Alex's Adventures in Numberland",
                author: "Alex Bellos",
                description: "A fun and quirky journey through the world of numbers, exploring various mathematical curiosities, puzzles, and surprising applications. Highly engaging for GCSE students."
            },
            {
                name: "How Not to Be Wrong: The Power of Mathematical Thinking",
                author: "Jordan Ellenberg",
                description: "Explores how mathematical thinking can be applied to everyday life and various fields, helping readers make sense of statistics, probability, and common fallacies. Very relevant for A-Level students developing critical thinking."
            }
        ],
        "history-biographies": [
            {
                name: "Alan Turing: The Enigma",
                author: "Andrew Hodges",
                description: "The definitive biography of Alan Turing, a foundational figure in computer science and mathematics. It delves into his work on computation, logic, and his crucial role in code-breaking, showcasing the human side of mathematical genius."
            },
            {
                name: "The Man Who Knew Infinity: A Life of the Genius Ramanujan",
                author: "Robert Kanigel",
                description: "The inspiring and tragic story of Srinivasa Ramanujan, an Indian mathematical prodigy whose intuitive genius led to profound discoveries despite a lack of formal training. Highlights the beauty of pure mathematics."
            },
            {
                name: "Surely You're Joking, Mr. Feynman!",
                author: "Richard Feynman",
                description: "While a physicist, Feynman's anecdotes often touch upon his incredible problem-solving skills and unique way of thinking, which is deeply mathematical. An inspiring read for anyone pursuing STEM."
            }
        ],
        "specific-concepts": [
            {
                name: "Euclid's Window: The Story of Geometry from Parallel Lines to Hyperspace",
                author: "Leonard Mlodinow",
                description: "A historical and conceptual journey through geometry, from Euclidean foundations to non-Euclidean geometries and higher dimensions. Good for those who enjoy spatial reasoning."
            },
            {
                name: "Logicomix: An Epic Search for Truth",
                author: "Apostolos Doxiadis and Christos Papadimitriou",
                description: "A graphic novel that tells the story of the turbulent early 20th century, when mathematicians grappled with the foundations of logic and mathematics. Features figures like Russell, Godel, and Turing."
            },
            {
                name: "What is Mathematics? An Elementary Approach to Ideas and Methods",
                author: "Richard Courant and Herbert Robbins",
                description: "A classic text that introduces fundamental mathematical ideas and methods in an accessible way, covering numbers, geometry, topology, and more. A more challenging but very rewarding read for keen A-Level students."
            }
        ],
        "problem-solving-puzzles": [
            {
                name: "The Lady Tasting Tea: How Statistics Revolutionized Science in the Twentieth Century",
                author: "David Salsburg",
                description: "Explores the history and development of modern statistics through engaging stories and key figures. Excellent for understanding the application of probability and data."
            },
            {
                name: "The Pleasures of Counting",
                author: "T.W. Körner",
                description: "A collection of essays on various mathematical topics, often starting from simple questions and leading to surprising and deep results. Encourages a playful approach to problem-solving."
            },
            {
                name: "Mathematical Puzzles of Sam Loyd / Mathematical Puzzles of Henry Ernest Dudeney",
                author: "Sam Loyd / Henry Ernest Dudeney",
                description: "Collections of classic mathematical puzzles that encourage logical thinking and problem-solving skills, often requiring clever insights rather than advanced mathematics. Great for all levels."
            }
        ]
    }
};

// Initialize book recommendations when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeBookRecommendations();
});

function initializeBookRecommendations() {
    const buttons = document.querySelectorAll('.recommended-reading-btn');
    const content = document.getElementById('recommended-reading-content');
    
    console.log('Found buttons:', buttons.length);
    console.log('Available subjects:', Object.keys(bookRecommendationsData));
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-reading');
            console.log('Button clicked, category:', category);
            
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the current subject (assuming we're on biology page)
            const subject = getCurrentSubject();
            console.log('Current subject:', subject);
            console.log('Available categories for subject:', bookRecommendationsData[subject] ? Object.keys(bookRecommendationsData[subject]) : 'Subject not found');
            
            if (bookRecommendationsData[subject] && bookRecommendationsData[subject][category]) {
                currentBookCategory = category;
                currentBooks = bookRecommendationsData[subject][category];
                currentBookIndex = 0;
                showBook();
            } else {
                content.innerHTML = '<h3>No book recommendations found for this category.</h3>';
                console.log('Subject or category not found. Subject:', subject, 'Category:', category);
            }
        });
    });
}

function getCurrentSubject() {
    // Determine the current subject based on the page class
    console.log('Body classes:', document.body.classList);
    
    if (document.body.classList.contains('biology-page')) return 'biology';
    if (document.body.classList.contains('chemistry-page')) return 'chemistry';
    if (document.body.classList.contains('physics-page')) return 'physics';
    if (document.body.classList.contains('mathematics-page')) return 'mathematics';
    if (document.body.classList.contains('computer-science-page')) return 'computer-science';
    
    console.log('No subject page class found, defaulting to biology');
    return 'biology'; // Default fallback
}

function showBook() {
    const content = document.getElementById('recommended-reading-content');
    const book = currentBooks[currentBookIndex];
    
    if (!book) {
        content.innerHTML = '<h3>No books found for this category.</h3>';
        return;
    }
    
    const categoryDisplayName = getCategoryDisplayName(currentBookCategory);
    
    // Hide category buttons when showing books
    const buttonsContainer = document.querySelector('.recommended-reading-buttons');
    if (buttonsContainer) {
        buttonsContainer.style.display = 'none';
    }
    
    // Determine back button behavior
    const isFirstBook = currentBookIndex === 0;
    const backButtonText = isFirstBook ? '← Back' : '← Previous';
    const backButtonAction = isFirstBook ? 'goBackToCategories()' : 'previousBook()';
    
    const isLastBook = currentBookIndex === currentBooks.length - 1;
    const nextButton = isLastBook ? '' : '<button class="nav-btn next-btn" onclick="nextBook()">Next →</button>';
    
    content.innerHTML = `
        <div class="book-details">
            <div class="book-title">"${book.name}" by ${book.author}</div>
            <div class="book-description">${book.description}</div>
        </div>
        <div class="book-navigation">
            <button class="nav-btn back-btn" onclick="${backButtonAction}">${backButtonText}</button>
            <span class="book-counter">${currentBookIndex + 1} of ${currentBooks.length}</span>
            ${nextButton}
        </div>
    `;
}

function getCategoryDisplayName(category) {
    const displayNames = {
        'general-biology': 'General Biology & Broad Overviews',
        'evolution-genetics': 'Evolution & Genetics',
        'medical-human': 'Medical & Human Biology',
        'ecology-environment': 'Ecology & Environment',
        'other-notable': 'Other',
        'general-chemistry': 'General Chemistry & Broad Overviews',
        'applied-chemistry': 'Applied Chemistry & Real-World Connections',
        'deeper-concepts': 'Deeper Chemical Concepts & Critical Thinking',
        'advanced-challenging': 'Advanced & Challenging',
        'general-physics': 'General Physics & Broad Overviews',
        'classical-mechanics': 'Classical Physics & Mechanics',
        'quantum-modern': 'Quantum Mechanics & Modern Physics',
        'astrophysics-cosmology': 'Astrophysics & Cosmology',
        'critical-thinking': 'Critical Thinking & Science in Society',
        'foundational-concepts': 'Foundational Concepts & History',
        'algorithms-logic': 'Algorithms & Logic',
        'ai-future-tech': 'Artificial Intelligence & Future Tech',
        'programming-problem-solving': 'Programming & Problem Solving (Conceptual)',
        'ethics-society': 'Ethics & Society',
        'general-mathematics': 'General Mathematics & Popular Science',
        'history-biographies': 'History & Biographies of Mathematicians',
        'specific-concepts': 'Specific Mathematical Concepts (Deeper Dive for A-Level)',
        'problem-solving-puzzles': 'Problem Solving & Puzzles'
    };
    return displayNames[category] || category;
}

function nextBook() {
    if (currentBookIndex < currentBooks.length - 1) {
        currentBookIndex++;
        showBook();
    }
}

function previousBook() {
    if (currentBookIndex > 0) {
        currentBookIndex--;
        showBook();
    }
}

function goBackToCategories() {
    const content = document.getElementById('recommended-reading-content');
    const buttons = document.querySelectorAll('.recommended-reading-btn');
    const buttonsContainer = document.querySelector('.recommended-reading-buttons');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show category buttons again
    if (buttonsContainer) {
        buttonsContainer.style.display = 'flex';
    }
    
    // Reset state
    currentBookCategory = null;
    currentBooks = [];
    currentBookIndex = 0;
    
    // Show default message
    content.innerHTML = '<h3 class="category-selection-text">Select a category to see book recommendations</h3>';
}

 