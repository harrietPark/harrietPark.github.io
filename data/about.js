const ABOUT_DATA = {
    intro: {
        title: "A Design Engineer based in London, exploring how AI and XR can become everyday interfaces.",
        paragraphs: [
            "I work across design, engineering, and research to design and build interactive XR prototypes, exploring how AI and XR could shape the way we communicate, learn, play, and move through everyday life.",
            "My work spans production VR/MR experiences, AI-assisted creative workflows, spatial storytelling, and research-led interaction design, turning early ideas into working prototypes, published research, and festival-selected immersive projects."
        ],
        ctas: [
            {
                label: "Download my CV ↗",
                url: "files/SeonjeongPark_CV.pdf",
                download: true
            },
            {
                label: "How I got into XR ↗",
                url: "easterEgg.html"
            }
        ]
    },
    experiences: [
        {
            company: "NoGhost",
            icon: "NG",
            metaClass: "compact-meta",
            logo: "img/NoGhost.png",
            period: "Oct 2022 - Now",
            role: "XR Developer",
            description: [
                "NoGhost is a London-based immersive content studio creating VR, MR, and interactive experiences.",
                "I have shipped production-ready VR/MR applications in Unity and Unreal Engine across Meta Quest, Apple Vision Pro, and mobile platforms, collaborating with organisations including Epic Games, Aardman, City of Bradford, and Felix & Paul Studios."
            ],
            projects: [
                {
                    title: "Built by Sound ↗",
                    meta: "Mixed Reality, Installation, Multiplayer",
                    image: "img/BuiltBySound.png",
                    imageAlt: "Built by Sound",
                    url: "https://www.noghost.co.uk/work/built-by-sound"
                },
                {
                    title: "Wallace and Gromit: The Grand Getaway ↗",
                    meta: "Virtual Reality, Animated Adventure Game",
                    image: "img/Wallace.png",
                    imageAlt: "Wallace and Gromit: The Grand Getaway",
                    url: "https://www.noghost.co.uk/work/wallace-gromit"
                },
                {
                    title: "Grow ↗",
                    meta: "Mixed Reality, Meditation App",
                    image: "img/Grow.png",
                    imageAlt: "Grow",
                    url: "https://www.noghost.co.uk/work/grow"
                }
            ]
        },
        {
            company: "Karts AT Lab",
            icon: "K",
            metaClass: "compact-meta",
            logo: "img/KArts.png",
            period: "Oct 2024 - Aug 2025",
            role: "Lead Developer, Rapid Prototyper",
            description: [
                "ATLab is an art and technology research lab exploring new forms of immersive storytelling.",
                "I led AI + spatial storytelling R&D, integrating OpenAI, ElevenLabs, and gaze tracking to create personalised real-time narratives. I developed 8pm and the Cat, a thirteen-minute AI-driven VR film selected for Venice Immersive 2025 and BFI London Film Festival Expanded 2025."
            ],
            projects: [
                {
                    title: "8pm and the Cat ↗",
                    meta: "Virtual Reality, AI Storytelling",
                    image: "img/8pmCat.gif",
                    imageAlt: "8pm and the Cat",
                    url: "8pmAndCat.html"
                }
            ]
        },
        {
            company: "Goldsmiths & LASALLE",
            icon: "GL",
            logo: "img/Goldsmiths.png",
            period: "Apr 2022 - Jan 2025",
            role: "Lead Developer, Researcher",
            description: [
                "A collaborative research project between Goldsmiths, University of London and LASALLE College of the Arts, Singapore, extending my master's thesis at Goldsmiths.",
                "I designed, built, and validated a VR public speaking application aimed at reducing foreign language anxiety. The project was tested with 40+ participants, received ACEID conference presentation recognition, was published in Frontiers in Virtual Reality, and presented at IEEE VR 2023."
            ],
            projects: [
                {
                    title: "Public Speaking in VR Research Project ↗",
                    meta: "Virtual Reality, Research",
                    image: "img/vrPresentation.gif",
                    imageAlt: "Public Speaking in VR Research Project",
                    url: "Presentation.html"
                }
            ]
        },
        {
            company: "Triptobz",
            icon: "TB",
            metaClass: "compact-meta",
            logo: "img/Tripbtoz.png",
            period: "Feb 2020 - Apr 2022",
            role: "Contents Marketer",
            description: [
                "I created and managed content across Instagram, Facebook, YouTube, and blogs, growing the account by 8,000+ followers. I also produced AR filters and interactive content formats for brand marketing campaigns."
            ],
            projects: []
        }
    ],
    skills: [
        {
            title: "Spatial Development",
            items: ["Unity", "Unreal", "Lens Studio", "Snap Spectacles", "Apple Vision Pro", "Meta Quest", "C#", "C++", "TypeScript", "JavaScript", "Python"]
        },
        {
            title: "AI Workflows",
            items: ["OpenAI", "Stable Diffusion", "ComfyUI", "Midjourney", "ElevenLabs", "Gaussian Splatting", "World Models"]
        },
        {
            title: "Creative Tools",
            items: ["Figma", "Blender", "Maya", "Adobe"]
        }
    ],
    awards: [
        {
            title: "Venice Immersive & BFI London Film Festival Expanded Official Selection",
            year: "2025",
            detail: "8pm and the Cat",
            detailUrl: "8pmAndCat.html"
        },
        {
            title: "Guest Lecture on Game Design (Catholic University of Korea)",
            year: "2024"
        },
        {
            title: "2024 Metaverse Developer Contest",
            detail: "Baobab Diary",
            detailUrl: "BaobabDiary.html"
        },
        {
            title: "Goldsmiths-LASALLE Partnership Innovation",
            year: "2023-2024",
            detail: "Public Speaking in VR Research",
            detailUrl: "Presentation.html"
        },
        {
            title: "Travel the World Exhibition",
            year: "2020",
            detail: "Travel Illustration",
            detailUrl: "Illustration.html"
        }
    ],
    publications: [
        {
            title: "Frontiers Virtual Reality",
            year: "2025",
            detail: "Reducing Foreign Language Anxiety through Repeated Exposure to a Customizable VR Public Speaking Application",
            detailUrl: "https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2025.1519409/full"
        },
        {
            title: "ACEID Conference Presentation",
            year: "2024",
            detail: "Harnessing Virtual Reality: Tackling Foreign Language Anxiety and Elevating Public Speaking Skills",
            detailUrl: "https://www.researchgate.net/publication/381300345_Harnessing_Virtual_Reality_Tackling_Foreign_Language_Anxiety_and_Elevating_Public_Speaking_Skills"
        },
        {
            title: "IEEE VR Conference",
            year: "2023",
            detail: "Reducing Foreign Language Anxiety with Virtual Reality: In 2023 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops",
            detailUrl: "https://ieeexplore.ieee.org/abstract/document/10108684"
        }
    ],
    education: [
        {
            title: "MSc Virtual & Augmented Reality",
            year: "2021-2022",
            detail: "Goldsmiths, University of London"
        },
        {
            title: "BA Game & Interactive Media Convergence, Chinese Language and Literature",
            year: "2015-2021",
            detail: "Chung-Ang University, Seoul, Korea"
        }
    ]
};
