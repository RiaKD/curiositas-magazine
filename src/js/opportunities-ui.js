// Opportunities UI functionality
let currentCategory = null;
let currentOpportunityIndex = 0;
let currentOpportunities = [];

const opportunitiesData = {
    biology: {
        research: [
            {
                name: "Lumiere Research Scholar Program",
                description: "This program pairs high school students with PhD mentors from top universities to conduct independent research projects. They have a specific focus on biology and life sciences. The program is offered remotely, making it accessible to international students.",
                url: "https://www.lumiere-education.com/students-application-form"
            },
            {
                name: "Polygence",
                description: "Similar to Lumiere, Polygence connects students with academic mentors for one-on-one research projects. The platform is flexible and can accommodate a wide range of biology topics, from genetics to marine biology.",
                url: "https://www.polygence.org/"
            },
            {
                name: "Cambridge Centre for International Research",
                description: "CCIR offers research mentorship programs in various subjects, including biology. Their programs are designed to provide a university-level research experience and are open to students aged 14-18.",
                url: "https://cambridge-research.org/"
            },
            {
                name: "Summer Science Program",
                description: "SSP is a highly selective and intensive program where students conduct research in celestial mechanics, biochemistry, or genomics. The biochemistry program focuses on molecular biology. It is open to international students who are at least 15 years old.",
                url: "https://www.summerscience.org/"
            },
            {
                name: "London International Youth Science Forum",
                description: "While more of a summer school, LIYSF includes visits to world-class research institutions and hands-on sessions. It's a fantastic opportunity to see real-world research in action and network with scientists.",
                url: "https://www.liysf.org.uk/"
            }
        ],
        programs: [
            {
                name: "Immerse Education Biology Summer School",
                description: "Immerse offers in-person biology programs at prestigious universities like Oxford and Cambridge. The curriculum is designed to give students a taste of university-level study in subjects like genetics, cellular biology, and ecology.",
                url: "https://www.immerse.education/biology-summer-school/"
            },
            {
                name: "Imperial College London Global Summer School",
                description: "This program offers specialized areas of study, including biology and medicine, allowing students to engage in a combination of academic lectures and practical, problem-solving challenges.",
                url: "https://www.imperial.ac.uk/study/visit/summer-schools/high-school/"
            },
            {
                name: "Oxbridge Summer Scholars Biology Module",
                description: "This program offers a summer school experience with a specific focus on biology related to medicine. It covers topics like pharmacology and epidemiology, and is aimed at students considering a career in medicine.",
                url: "https://www.oxbridgesummerscholars.com/biology-cambridge-summer-school-module"
            },
            {
                name: "Biosciences International Summer School",
                description: "This program offers hands-on experience in various bioscience areas, including biochemistry, cancer biology, and cell biology.",
                url: "https://www.bmh.manchester.ac.uk/study/summer-schools/biosciences/"
            }
        ],
        experience: [
            {
                name: "Conrad Challenge",
                description: "This is a global competition for students to create innovative solutions to global challenges. A team could develop a biology-related project to address issues in food security, clean energy, or health and nutrition.",
                url: "https://www.conradchallenge.org/"
            },
            {
                name: "International Genetically Engineered Machine Competition",
                description: "iGEM is a prestigious synthetic biology competition where high school teams design and build their own biological systems. It is an intensive, team-based, hands-on experience.",
                url: "https://competition.igem.org/"
            },
            {
                name: "The Sanger Institute Work Experience",
                description: "The Sanger Institute, a leading genomics research centre, offers work experience opportunities for young people. It's a great chance to see cutting-edge research up close.",
                url: "https://www.sanger.ac.uk/about/careers/work-experience/"
            },
            {
                name: "University of Warwick STEM Work Experience",
                description: "The University of Warwick offers short-term, unpaid laboratory placements in areas like molecular biology, biochemistry, and microbiology for students aged 16 and over.",
                url: "https://warwick.ac.uk/fac/sci/semscienceinschools/workexperience/"
            },
            {
                name: "Global Leadership Adventures",
                description: "GLA offers volunteer and travel programs with a focus on marine biology and conservation in places like Costa Rica. These programs combine hands-on experience with cultural immersion.",
                url: "https://experiencegla.com/"
            }
        ],
        awards: [
            {
                name: "International Biology Olympiad",
                description: "This is the most prestigious biology competition for high school students globally. To participate, students must typically first succeed in their national biology olympiad.",
                url: "https://www.ibo-info.org/"
            },
            {
                name: "Regeneron International Science and Engineering Fair",
                description: "ISEF is the world's largest pre-college STEM competition. Students qualify through local and regional fairs, and the event offers significant awards and networking opportunities.",
                url: "https://www.societyforscience.org/isef/"
            },
            {
                name: "BioGENEius Challenge",
                description: "This competition recognizes outstanding high school students for their research projects in biotechnology. It offers cash prizes and an opportunity to present research at a major conference.",
                url: "https://biotechinstitute.org/biogeneius/"
            },
            {
                name: "Genes in Space Challenge",
                description: "This competition invites students to propose a DNA experiment that could be performed on the International Space Station. The winner's experiment is launched into space. It's a highly unique and prestigious award.",
                url: "https://www.genesinspace.org/"
            }
        ],
        other: [
            {
                name: "Online Courses",
                description: "Many universities and platforms offer free or low-cost online courses (MOOCs) in biology and related fields. Platforms like Coursera, edX, and FutureLearn have courses from institutions like Harvard, Johns Hopkins, and Imperial College London."
            },
            {
                name: "Science Communication",
                description: "Look for opportunities to write for a school science magazine, start a blog, or create a YouTube channel about biology topics. This is a great way to deepen your understanding and build a portfolio."
            },
            {
                name: "Local Organizations",
                description: "Check with local hospitals, museums, zoos, botanical gardens, or conservation charities for volunteer opportunities. Many of these places have programs for young people that can provide valuable experience."
            },
            {
                name: "University Open Days",
                description: "Many universities hold virtual and in-person open days where you can attend taster lectures and speak with faculty and students. This is a great way to explore different biology programs and see which university might be a good fit."
            },
            {
                name: "Journal Clubs",
                description: "Start or join a biology journal club at your school. This involves meeting with peers and a teacher to discuss recent scientific papers. It's a fantastic way to engage with the latest research and develop critical thinking skills."
            }
        ]
    },
    chemistry: {
        research: [
            {
                name: "Lumiere Research Scholar Program",
                description: "This program pairs high school students with a PhD-level mentor to conduct an independent research project. You can choose a chemistry topic and work on it one-on-one, culminating in a research paper.",
                url: "https://www.lumiere-education.com/students-application-form"
            },
            {
                name: "Cambridge Centre for International Research",
                description: "Offers a chemistry research program that connects students with professors from prestigious universities. This can be done in person or online, providing flexibility for international students.",
                url: "https://cambridge-research.org/"
            },
            {
                name: "Polygence",
                description: "A platform that connects high school students with expert mentors for personalized research projects. It's an excellent way to gain experience in a specific area of chemistry that interests you, from environmental science to organic synthesis.",
                url: "https://www.polygence.org/"
            },
            {
                name: "American Chemical Society Project SEED",
                description: "While primarily for economically disadvantaged U.S. students, it's worth checking if international students can participate. The program offers summer research opportunities and mentorship from experienced chemists.",
                url: "https://www.acs.org/education/students/highschool/seed.html"
            },
            {
                name: "Simons Summer Research Program",
                description: "This program at Stony Brook University provides high school students with hands-on research in a variety of STEM fields, including chemistry. It is highly competitive, but a great opportunity for students passionate about research.",
                url: "https://www.stonybrook.edu/simons/"
            }
        ],
        programs: [
            {
                name: "Immerse Education's Chemistry Summer Programme",
                description: "A two-week program where you study chemistry at a top university like Cambridge. The curriculum is designed to give you a taste of university-level study with lectures and practical experiments.",
                url: "https://www.immerse.education/chemistry-summer-school/"
            },
            {
                name: "London International Youth Science Forum",
                description: "A two-week program in London that brings together students from around the world to attend lectures from leading scientists and visit research laboratories. It offers a wide range of STEM topics, including chemistry.",
                url: "https://www.liysf.org.uk/"
            },
            {
                name: "Imperial College London Global Summer School",
                description: "This program allows students to choose a specialist area of science and engineering for a two-week period. Chemistry is a central part of many of the modules.",
                url: "https://www.imperial.ac.uk/study/visit/summer-schools/high-school/"
            },
            {
                name: "Johns Hopkins Center for Talented Youth",
                description: "CTY offers a variety of academic programs for high-achieving students, including courses like 'Adventures in Chemistry' that are great for deepening your understanding of the subject.",
                url: "https://cty.jhu.edu/"
            },
            {
                name: "University of Cambridge International Summer Programme",
                description: "This program offers a wide range of courses and is a great way to experience a university environment while studying a specific area of chemistry.",
                url: "https://www.pace.cam.ac.uk/course-type/international-summer-programme"
            }
        ],
        experience: [
            {
                name: "Volunteering at a Local University Chemistry Department",
                description: "Many universities are open to high school students volunteering in a lab. This can be an excellent way to get hands-on experience and build your network. Reach out to professors in your area whose research interests you."
            },
            {
                name: "Virtual Work Experience Programs",
                description: "These platforms partner with companies to offer virtual work experience programs. While they may not be specifically chemistry-focused, they often have opportunities in related fields like science, engineering, or pharmaceuticals.",
                url: "https://www.springpod.com/"
            },
            {
                name: "Start a 'Kitchen Chemistry' Project",
                description: "You can design your own experiments at home to explore chemical reactions and principles. This can be as simple as investigating water quality or exploring environmental chemistry in your local area."
            },
            {
                name: "Join a School Science Club or Start Your Own",
                description: "If your school has a science or chemistry club, join it. If not, consider starting one with a teacher's help. This shows initiative and passion, and you can lead projects and activities."
            }
        ],
        awards: [
            {
                name: "International Chemistry Olympiad",
                description: "The most prestigious competition for high school students in chemistry. It involves theoretical and practical exams. You must qualify through your country's national olympiad.",
                url: "http://www.icho-official.org/"
            },
            {
                name: "Regeneron Science Talent Search",
                description: "One of the U.S.'s most prestigious science competitions, open to international students studying in the U.S. It offers significant awards for research projects in a wide range of scientific fields, including chemistry.",
                url: "https://www.societyforscience.org/regeneron-sts/"
            },
            {
                name: "American Chemical Society Awards",
                description: "The ACS offers numerous awards. While many are for professionals, some are for students and are worth exploring. Keep an eye on their website for new opportunities.",
                url: "https://www.acs.org/funding.html"
            },
            {
                name: "Broadcom MASTERS International",
                description: "A program that selects finalists from national science fairs around the world to participate in a special program at the Regeneron International Science and Engineering Fair (ISEF).",
                url: "https://www.societyforscience.org/broadcom-masters/"
            }
        ],
        other: [
            {
                name: "Arkwright Engineering Scholarship",
                description: "While focused on engineering, it's a valuable scholarship for students interested in a STEM career. Chemistry is a core science for many engineering disciplines.",
                url: "https://www.arkwright.org.uk/"
            },
            {
                name: "Destination STEM (In2scienceUK)",
                description: "This program provides students from disadvantaged backgrounds with summer placements at universities. Check their eligibility criteria to see if international students can apply.",
                url: "https://in2scienceuk.org/"
            },
            {
                name: "Essay Competitions (John Locke Institute)",
                description: "The John Locke Institute runs essay competitions in various subjects, including science. This is an excellent opportunity to demonstrate your critical thinking and writing skills on a complex topic in chemistry.",
                url: "https://www.johnlockeinstitute.com/essay-competition"
            },
            {
                name: "The Nuffield Research Placements",
                description: "These placements are for UK students, but it's worth checking if there are equivalent programs in your home country or if you are eligible if you study in the UK.",
                url: "https://www.nuffieldfoundation.org/students-teachers/nuffield-research-placements"
            },
            {
                name: "MOOCs (Massive Open Online Courses)",
                description: "Platforms like Coursera, edX, and FutureLearn offer free or low-cost online courses from top universities. You can take a variety of chemistry courses to explore different topics, earn certificates, and show your initiative."
            }
        ]
    },
    physics: {
        research: [
            {
                name: "Lumiere Research Scholar Program",
                description: "This is a highly selective and prestigious program that connects high school students with a PhD-level mentor for an individual research project. It is a fantastic way to produce a high-quality research paper, which is a significant accomplishment for a high school student.",
                url: "https://www.lumiere-education.com/students-application-form"
            },
            {
                name: "Research Science Institute",
                description: "Hosted by MIT, RSI is a free, seven-week, highly competitive program for rising high school seniors. Students conduct individual research in a scientific field, including physics, and present their findings.",
                url: "https://www.cee.org/programs/research-science-institute"
            },
            {
                name: "Princeton Plasma Physics Laboratory Internship Program",
                description: "This program offers high school students the opportunity to work in a plasma physics lab under the guidance of professionals. It's a great chance to get hands-on experience in a cutting-edge field.",
                url: "https://www.pppl.gov/high-school-summer-internship"
            },
            {
                name: "Summer Science Program",
                description: "This is a residential program for high school students interested in astrophysics, biochemistry, or genomics. The astrophysics program involves students using telescopes to determine the orbit of a near-Earth asteroid.",
                url: "https://ssp.org/"
            },
            {
                name: "NASA Internships",
                description: "NASA offers paid internships for high school students, including those with an interest in physics, at locations across the United States. They have programs for both U.S. and international students.",
                url: "https://www.nasa.gov/learning-resources/internship-programs/"
            }
        ],
        programs: [
            {
                name: "London International Youth Science Forum",
                description: "Held in London at Imperial College, LIYSF is a two-week residential program for students aged 16-21. It features lectures from Nobel laureates and other leading scientists and includes visits to world-class labs and research facilities.",
                url: "https://www.liysf.org.uk/"
            },
            {
                name: "CERN Summer Programmes for High School Students",
                description: "CERN offers programs that allow students to explore particle physics through lectures, hands-on workshops, and tours of the facilities.",
                url: "https://home.cern/fr/node/4628"
            },
            {
                name: "Yale Summer Program in Astrophysics",
                description: "A six-week residential program for high school students with a strong interest in science, math, and astrophysics. Students work in small groups and use telescopes to carry out a genuine research project.",
                url: "https://yspa.yale.edu/"
            },
            {
                name: "Immerse Education",
                description: "Offers a Physics Summer School at Cambridge for students aged 13-18. The program provides an in-depth look at university-level physics, with topics ranging from special relativity to quantum mechanics, and includes a personal research project.",
                url: "https://www.immerse.education/physics-summer-school/cambridge/"
            },
            {
                name: "University of Oxford Department of Physics Summer Schools",
                description: "These week-long opportunities give local students a taste of life in a physics department. They work on a project and take part in activities like departmental tours, career talks, and sample lectures.",
                url: "https://www.physics.ox.ac.uk/engage/schools/secondary-schools/summer-schools-and-work-experience"
            }
        ],
        experience: [
            {
                name: "International Physics Olympiad",
                description: "This is a globally recognized competition for high school students that tests their knowledge and problem-solving skills in physics through theoretical and experimental exams.",
                url: "https://www.ipho-unofficial.org/"
            },
            {
                name: "British Physics Olympiad",
                description: "An educational charity and national project for students aged 14-19. It runs ten annual competitions designed to challenge and develop problem-solving skills.",
                url: "https://www.physics.ox.ac.uk/engage/schools/secondary-schools/explore-more"
            },
            {
                name: "Nuffield Research Placements",
                description: "This program gives students in the UK the opportunity to work alongside professional scientists, technologists, engineers, and mathematicians on a research project. While targeted at students from disadvantaged backgrounds, it provides valuable experience.",
                url: "https://www.nuffieldfoundation.org/students-teachers/nuffield-research-placements"
            },
            {
                name: "AAPT High School Physics Photo Contest",
                description: "This competition, run by the American Association of Physics Teachers, uniquely combines art and science, inviting students to capture and explain a physics concept in a photograph.",
                url: "https://www.aapt.org/Programs/photocontest/"
            },
            {
                name: "International Young Physicists' Tournament",
                description: "Also known as the 'Physics World Cup,' this is a team-based competition where students investigate complex physics problems and present their solutions in a public debate.",
                url: "https://iypt.org/"
            }
        ],
        awards: [
            {
                name: "Regeneron International Science and Engineering Fair",
                description: "One of the world's most prestigious science competitions for high school students. It's a fantastic platform to present your independent physics research project to a global audience and win significant awards.",
                url: "https://www.societyforscience.org/isef/"
            },
            {
                name: "Davidson Fellows Scholarship",
                description: "This award is for individuals under 18 who have created 'significant work' in a variety of fields, including science and technology. The projects must be at an exceptionally high level, and the awards are substantial.",
                url: "https://www.davidsongifted.org/fellows-scholarship/"
            },
            {
                name: "Breakthrough Junior Challenge",
                description: "This is an annual global competition for students aged 13-18. You are required to create a short video explaining a complex scientific or mathematical theory in an engaging and creative way. Physics is a popular subject for this competition, and the prize is a scholarship of up to $250,000.",
                url: "https://breakthroughjuniorchallenge.org/"
            },
            {
                name: "The Eurekas (Institute of Physics)",
                description: "An annual competition for students aged 11-16 in the UK and Ireland that showcases the value of physics. It encourages students to show how they interact with physics in their everyday life and how physics can help solve a global problem.",
                url: "https://www.iop.org/strategy/limit-less/the-eurekas"
            },
            {
                name: "Regeneron Science Talent Search",
                description: "This is one of America's oldest and most prestigious science competitions for high school seniors. Finalists are chosen for their exceptional research projects and potential as future scientific leaders.",
                url: "https://www.societyforscience.org/regeneron-sts/"
            }
        ],
        other: [
            {
                name: "Conrad Challenge",
                description: "This competition encourages student teams to apply their knowledge in STEM and entrepreneurship to create solutions to global challenges. It's a great way to combine physics with innovation.",
                url: "https://www.conradchallenge.org/"
            },
            {
                name: "International Genetically Engineered Machine",
                description: "An international synthetic biology competition that allows students to design and build their own genetically engineered systems. While biology-focused, it heavily involves physics principles in the design and testing of systems.",
                url: "https://competition.igem.org/"
            },
            {
                name: "Destination STEM",
                description: "An online resource and program created by leading UK universities to support students in their A-Level studies and help them prepare for a STEM degree. It can include virtual work experience and lectures.",
                url: "https://destinationstem.org/"
            },
            {
                name: "Arkwright Engineering Scholarship",
                description: "This scholarship is for students in their penultimate year of secondary school who want to pursue a career in engineering. While engineering-focused, it requires a strong understanding of physics and provides financial support and mentoring.",
                url: "https://www.arkwright.org.uk/"
            },
            {
                name: "Join a Local Astronomy Club or Physics Club",
                description: "Many communities and schools have clubs where you can get hands-on experience, use telescopes, and participate in projects. This is a great way to build a personal project and connect with like-minded individuals. You can often find these through a quick web search for your area."
            }
        ]
    },
    mathematics: {
        research: [
            {
                name: "Lumiere Research Scholar Program",
                description: "This is a rigorous online research program that pairs high school students with a PhD-level scholar for an independent research project. The program has a dedicated mathematics track. It's a great way to gain one-on-one mentorship and experience in academic research.",
                url: "https://www.lumiere-education.com/students-application-form"
            },
            {
                name: "Polygence",
                description: "Similar to Lumiere, Polygence connects students with academic mentors to work on a personalized research project. They have a strong focus on quantitative research and pure mathematics, and their projects often culminate in a final paper or presentation.",
                url: "https://www.polygence.org/subjects/quantitative-research"
            },
            {
                name: "MIT PRIMES-USA",
                description: "This is a free, year-long remote research program run by MIT for high school students. While primarily for U.S. students, they have a strong reputation and are a great benchmark for the kind of research opportunities available. Many programs listed here are inspired by or similar to it.",
                url: "https://math.mit.edu/research/highschool/primes/"
            },
            {
                name: "Simons Summer Research Program",
                description: "A six-week summer program at Stony Brook University where students conduct hands-on research with a faculty mentor. It's a highly competitive and prestigious program with a strong mathematics component.",
                url: "https://www.stonybrook.edu/simons/"
            },
            {
                name: "Cambridge Centre for International Research",
                description: "CCIR offers research mentorship programs with professors from top universities like Cambridge, Oxford, and others. The program is designed for international high school students and focuses on developing critical thinking and research skills.",
                url: "https://cambridge-research.org/"
            }
        ],
        programs: [
            {
                name: "Program in Mathematics for Young Scientists",
                description: "A highly challenging six-week residential summer program at Boston University for mathematically ambitious high school students. International students are welcome to apply, and they also have regional versions like PROMYS Europe and PROMYS India.",
                url: "https://promys.org/"
            },
            {
                name: "Stanford University Mathematics Camp",
                description: "A three to four-week summer program at Stanford University for talented high school students. It focuses on advanced mathematics, with an emphasis on proof-based thinking not typically taught in high school.",
                url: "https://spcs.stanford.edu/programs/stanford-university-mathematics-camp-sumac"
            },
            {
                name: "AwesomeMath Summer Program",
                description: "A three-week online program focused on advanced problem-solving and mathematics competitions. It offers courses in various mathematical fields, with many students using it to prepare for contests like the AMC and AIME.",
                url: "https://www.awesomemath.org/summer-program/overview/program-information/"
            },
            {
                name: "The National Mathematics and Science College Summer School",
                description: "Offers various STEM-focused summer programs, including 'Maths, Coding & Cyberpuzzle.' The college specializes in providing a specialist STEM education to students from around the world.",
                url: "https://natmatsci.ac.uk/natmatsci-summer-school-2025/"
            }
        ],
        experience: [
            {
                name: "International Mathematical Olympiad",
                description: "The most prestigious and well-known international mathematics competition for pre-college students. Participation is a significant achievement and involves qualifying through national-level competitions.",
                url: "https://www.imo-official.org/"
            },
            {
                name: "Harvard-MIT Mathematics Tournament",
                description: "A highly-regarded high school math competition that attracts top students from around the world. It is held twice a year and is an excellent way to test your skills and compete with peers.",
                url: "https://www.hmmt.org/"
            },
            {
                name: "MathWorks Math Modeling Challenge",
                description: "A free, online competition for high school students where teams use mathematics to solve a real-world problem. It's a great opportunity to apply mathematical concepts to a practical, open-ended challenge.",
                url: "https://m3challenge.siam.org/"
            },
            {
                name: "Math League",
                description: "An international mathematics competition with various levels for students in grades 4-12. It's one of the largest networks of math competitions and a great way to gain experience in a competitive environment.",
                url: "https://www.mathleague.org/"
            },
            {
                name: "Tutoring Younger Students",
                description: "Tutoring is an excellent way to solidify your own understanding of mathematical concepts while developing communication and leadership skills. You can do this informally at your school or through an organized program. This experience demonstrates a passion for the subject and a commitment to helping others."
            }
        ],
        awards: [
            {
                name: "International Mathematical Olympiad Medals",
                description: "The IMO awards gold, silver, and bronze medals to the top performers. Winning an IMO medal is one of the highest honors for a pre-college student in mathematics.",
                url: "https://www.imo-official.org/"
            },
            {
                name: "Math Prize for Girls",
                description: "This competition is specifically for female high school students and awards significant cash prizes to the top winners. It's an excellent opportunity to showcase your mathematical talent.",
                url: "https://mathprize.atfoundation.org/"
            },
            {
                name: "MathWorks Math Modeling Challenge Awards",
                description: "Top teams in this competition can win scholarships and an expense-paid trip to present their solutions. The total amount of scholarships awarded is substantial.",
                url: "https://m3challenge.siam.org/"
            },
            {
                name: "American Mathematics Competitions",
                description: "These competitions (AMC 10 and AMC 12) are open to international students and serve as the first step in the series of competitions that lead to the IMO. Scoring well on these exams is an achievement in itself.",
                url: "https://maa.org/student-programs/amc/"
            },
            {
                name: "Conrad Challenge",
                description: "While not exclusively a math competition, the Conrad Challenge encourages students to use their STEM knowledge and entrepreneurial skills to create a solution for a global problem. Math skills are essential for the problem-solving aspect, and it offers significant awards.",
                url: "https://www.conradchallenge.org/"
            }
        ],
        other: [
            {
                name: "Khan Academy",
                description: "A free online learning platform that offers a wide range of math courses, from pre-algebra to calculus and beyond. It's a fantastic resource for self-study and for solidifying your foundational knowledge.",
                url: "https://www.khanacademy.org/"
            },
            {
                name: "Massive Open Online Courses",
                description: "Websites like Coursera and edX offer university-level mathematics courses from top institutions for free. Completing these courses is a great way to demonstrate intellectual curiosity and advanced knowledge."
            },
            {
                name: "Participate in Kaggle Competitions",
                description: "Kaggle is a platform for data science and machine learning competitions. Many of these require a strong mathematical and statistical background. It's a great way to apply your skills to real-world data and challenges.",
                url: "https://www.kaggle.com/"
            },
            {
                name: "Start a Math Club or Tutoring Program",
                description: "If one doesn't exist at your school, taking the initiative to start one shows leadership and a passion for sharing your knowledge. This is a great way to create your own opportunity."
            },
            {
                name: "Explore Open Data Sets",
                description: "Use public data from sources like Data.gov or the World Bank to conduct your own statistical analysis and write a report on your findings. This is a form of independent research that can be a valuable addition to a portfolio."
            }
        ]
    },
    "computer-science": {
        research: [
                         {
                 name: "Lumiere Research Scholar Program",
                 description: "This program offers one-on-one research mentorship with a university professor. Students work with a mentor on an independent research project and can choose a computer science track that focuses on areas like AI, data science, and robotics.",
                 url: "https://www.lumiere-education.com/students-application-form"
             },
            {
                name: "Polygence",
                description: "A similar platform that connects high school students with mentors for research projects in a variety of fields, including computer science. It's a great way to develop research skills and create a portfolio piece for university applications.",
                url: "https://www.polygence.org/"
            },
            {
                name: "Cambridge Centre for International Research",
                description: "CCIR provides research mentorship programs for high school students. Their programs are designed and taught by professors from top universities, and they have both online and in-person options. They also run the Cambridge Re:Think Essay Competition, which could lead to a research-like project.",
                url: "https://cambridge-research.org/"
            },
            {
                name: "Veritas AI",
                description: "This program focuses specifically on artificial intelligence and offers an 'AI Scholars' program for high school students. It's a project-based program where students learn foundational concepts and build an AI project.",
                url: "https://www.veritasai.com/"
            }
        ],
        programs: [
            {
                name: "Imperial College London Global Summer School",
                description: "A two-week program where students choose a specialist area of science and engineering for their first week and then work on a problem-solving challenge in the second. It's an immersive experience at a world-class university.",
                url: "https://www.imperial.ac.uk/study/visit/summer-schools/high-school/"
            },
            {
                name: "Harvard University Secondary School Program",
                description: "This program allows high school students to take college-level courses, including a wide range of computer science and engineering subjects. You can build your own program by choosing courses that interest you.",
                url: "https://summer.harvard.edu/high-school-programs/secondary-school-program/"
            },
            {
                name: "Girls Who Code Summer Program",
                description: "A two-week program designed to introduce high school students to the fundamentals of computer science, with a focus on game design, web development, and user experience (UX) design. It's particularly welcoming for female international students.",
                url: "https://girlswhocode.com/programs/summer-immersion-program"
            },
                         {
                 name: "Tandon NYU Summer Program: Automation, Robotics, Coding",
                 description: "This program is for students interested in robotics, mechatronics, and programming. Over two weeks, you'll learn to build and program interactive robotic devices.",
                 url: "https://www.nyu.edu/admissions/high-school-and-middle-school-programs/high-school-programs/summer-program-for-automation-robotics-and-coding.html"
             },
            {
                name: "MIT Beaver Works Summer Institute",
                description: "A highly selective, rigorous summer program for rising high school seniors. It offers online and hands-on courses in various engineering and computer science topics, including robotics, cybersecurity, and autonomous systems.",
                url: "https://beaverworks.ll.mit.edu/CMS/bw/bwsi"
            }
        ],
        experience: [
            {
                name: "Intern Abroad HQ",
                description: "This organization provides a variety of international and remote computer science internships. It's a great way to gain professional experience, build your resume, and work on real-world projects with international companies.",
                url: "https://www.internhq.com/fields/computer-science-and-it/"
            },
            {
                name: "The Intern Group",
                description: "Offers international internships in major cities around the world in fields like computer science, software engineering, and data analytics. They provide guaranteed placement and professional development.",
                url: "https://www.theinterngroup.com/"
            },
            {
                name: "GoAbroad.com",
                description: "This website is a great resource for finding internships and other experience-building opportunities abroad. You can filter by country and field to find a computer science internship that fits your interests.",
                url: "https://www.goabroad.com/intern-abroad/search/computer-science/internships-abroad-1"
            },
            {
                name: "Global Leadership Adventures",
                description: "Offers 'The STEM Experience' program that provides hands-on learning, cultural immersion, and opportunities to visit major tech hubs and institutions like CERN.",
                url: "https://experiencegla.com/europe/the-stem-experience-2/"
            },
            {
                name: "Build a Personal Project",
                description: "This is a crucial opportunity that doesn't require an official program. Create your own website, develop a mobile app, or contribute to an open-source project. Websites like GitHub are a great way to showcase your skills and collaborate with others.",
                url: "https://github.com/"
            }
        ],
        awards: [
            {
                name: "International Computer Science Competition",
                description: "A global online competition that challenges students to apply their logical thinking and computer science knowledge to solve problems. It offers cash prizes and global recognition.",
                url: "https://icscompetition.org/"
            },
            {
                name: "Microsoft Imagine Cup",
                description: "An international competition where individuals or teams design a software solution that addresses a global challenge. It's an excellent way to develop your skills and work on a real-world project.",
                url: "https://imaginecup.microsoft.com/"
            },
            {
                name: "The Conrad Challenge",
                description: "An annual innovation competition where high school students from around the world create solutions to real-world problems in various categories, including a 'Cyber-Technology & Security' category.",
                url: "https://www.conradchallenge.org/"
            },
            {
                name: "International Genetically Engineered Machine",
                description: "This competition is in synthetic biology but has a significant computer science component. It's an opportunity for students to design and build their own genetically engineered systems, often using computational tools.",
                url: "https://competition.igem.org/"
            },
            {
                name: "International Olympiads in Informatics",
                description: "This is the most prestigious computer science competition for high school students. It involves solving complex algorithmic problems. You typically have to qualify through your national-level competition.",
                url: "https://ioinformatics.org/"
            }
        ],
        other: [
            {
                name: "Online Courses (Coursera, edX, etc.)",
                description: "Platforms like Coursera and edX offer a vast selection of computer science courses from top universities and companies. You can learn new skills, earn certificates, and explore different areas of CS.",
                url: "https://www.coursera.org/"
            },
            {
                name: "CERN Summer Student Programme",
                description: "While primarily for university students, CERN has programs for talented students to work on projects at their facilities in Switzerland. It's an extraordinary opportunity for those interested in the intersection of physics and computer science.",
                url: "https://careers.cern/summer-student-programme"
            },
            {
                name: "NASA International Internship",
                description: "NASA offers international internships that provide hands-on experience and training. These can include a wide variety of projects, including those related to computer science and data analysis.",
                url: "https://www.nasa.gov/learning-resources/internship-programs/"
            },
            {
                name: "Scholarships for International Students",
                description: "Many universities and organizations offer scholarships specifically for international students pursuing a computer science degree. Researching these can be an opportunity in itself. Websites like Top Universities are great for this.",
                url: "https://www.topuniversities.com/"
            },
            {
                name: "Local Coding Clubs and Hackathons",
                description: "Look for local or online coding clubs and hackathons in your area or region. These provide a collaborative environment to build skills, meet new people, and work on innovative projects. Websites like Devpost often list upcoming hackathons.",
                url: "https://devpost.com/"
            }
        ]
    }
};

function initializeOpportunities() {
    const opportunityButtons = document.querySelectorAll('.opportunity-btn');
    const opportunityContent = document.getElementById('opportunity-content');
    
    console.log('Initializing opportunities...');
    console.log('Found opportunity buttons:', opportunityButtons.length);
    console.log('Current subject:', getCurrentSubject());
    
    opportunityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-opportunity');
            const subject = getCurrentSubject();
            
            console.log('Opportunity button clicked:', category);
            console.log('Subject detected:', subject);
            console.log('Available data:', opportunitiesData[subject]);
            
            if (opportunitiesData[subject] && opportunitiesData[subject][category]) {
                currentCategory = category;
                currentOpportunities = opportunitiesData[subject][category];
                currentOpportunityIndex = 0;
                showOpportunity();
            } else {
                console.log('No opportunities found for:', subject, category);
                console.log('Subject:', subject);
                console.log('Category:', category);
                console.log('Available subjects:', Object.keys(opportunitiesData));
                console.log('Available categories for subject:', subject, opportunitiesData[subject] ? Object.keys(opportunitiesData[subject]) : 'undefined');
            }
        });
    });
}

function getCurrentSubject() {
    // Determine the current subject based on the page
    console.log('Body classes:', document.body.classList);
    
    if (document.body.classList.contains('biology-page')) return 'biology';
    if (document.body.classList.contains('chemistry-page')) return 'chemistry';
    if (document.body.classList.contains('physics-page')) return 'physics';
    if (document.body.classList.contains('mathematics-page')) return 'mathematics';
    if (document.body.classList.contains('computer-science-page')) {
        console.log('Found computer-science-page, returning computer-science');
        return 'computer-science';
    }
    
    console.log('No subject page class found, defaulting to biology');
    return 'biology'; // default
}

function showOpportunity() {
    const opportunityContent = document.getElementById('opportunity-content');
    const opportunityButtons = document.querySelector('.opportunity-buttons');
    const opportunity = currentOpportunities[currentOpportunityIndex];
    
    if (!opportunity) {
        opportunityContent.innerHTML = '<h3>No opportunities found for this category.</h3>';
        return;
    }
    
    // Hide the category buttons
    opportunityButtons.style.display = 'none';
    
    const navigationButtons = `
        <div class="opportunity-navigation">
            <button class="nav-btn back-btn" onclick="${currentOpportunityIndex === 0 ? 'goBackToMainPage()' : 'previousOpportunity()'}">← Back</button>
            <span class="opportunity-counter">${currentOpportunityIndex + 1} of ${currentOpportunities.length}</span>
            <button class="nav-btn next-btn" onclick="nextOpportunity()" ${currentOpportunityIndex === currentOpportunities.length - 1 ? 'disabled' : ''}>Next →</button>
        </div>
    `;
    
    const opportunityLink = opportunity.url ? 
        `<a href="${opportunity.url}" target="_blank" class="opportunity-link">${opportunity.name}</a>` : 
        `<span class="opportunity-name">${opportunity.name}</span>`;
    
    opportunityContent.innerHTML = `
        <div class="opportunity-details">
            <h3 class="opportunity-title">${opportunityLink}</h3>
            <p class="opportunity-description">${opportunity.description}</p>
        </div>
        ${navigationButtons}
    `;
}

function nextOpportunity() {
    if (currentOpportunityIndex < currentOpportunities.length - 1) {
        currentOpportunityIndex++;
        showOpportunity();
    }
}

function previousOpportunity() {
    if (currentOpportunityIndex > 0) {
        currentOpportunityIndex--;
        showOpportunity();
    }
}

function goBackToCategories() {
    const opportunityContent = document.getElementById('opportunity-content');
    const opportunityButtons = document.querySelector('.opportunity-buttons');
    
    // Show the category buttons again
    opportunityButtons.style.display = 'flex';
    
    // Reset to initial state
    opportunityContent.innerHTML = '<h3>Select an opportunity type to see relevant options</h3>';
    
    // Reset current state
    currentCategory = null;
    currentOpportunityIndex = 0;
    currentOpportunities = [];
}

function goBackToMainPage() {
    const opportunityContent = document.getElementById('opportunity-content');
    const opportunityButtons = document.querySelector('.opportunity-buttons');
    
    // Show the category buttons again
    opportunityButtons.style.display = 'flex';
    
    // Reset to initial state with the original title
    opportunityContent.innerHTML = '<h3>Select an opportunity type to see relevant options</h3>';
    
    // Reset current state
    currentCategory = null;
    currentOpportunityIndex = 0;
    currentOpportunities = [];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing opportunities...');
    initializeOpportunities();
});

// Also try immediate initialization as backup
console.log('Script loaded, attempting immediate initialization...');
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
} else {
    console.log('Document already loaded, initializing immediately...');
    initializeOpportunities();
} 