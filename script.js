document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // Morphing CTA Logic
    const ctaContainer = document.getElementById('cta-container');
    const ctaButtons = document.getElementById('cta-buttons');
    const ctaForm = document.getElementById('cta-form');
    const talkTeamBtn = document.getElementById('talk-team-btn');
    const closeFormBtn = document.getElementById('close-form-btn');

    if(talkTeamBtn && ctaForm) {
        talkTeamBtn.addEventListener('click', () => {
            // Expand container height dynamically
            ctaContainer.style.height = ctaForm.scrollHeight + 'px';
            
            // Fade out buttons
            ctaButtons.classList.add('opacity-0');
            setTimeout(() => {
                ctaButtons.style.display = 'none';
                
                // Show form
                ctaForm.classList.remove('invisible', 'opacity-0', 'pointer-events-none');
            }, 300);
        });

        closeFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide form
            ctaForm.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                ctaForm.classList.add('invisible');
                
                // Show buttons
                ctaButtons.style.display = 'flex';
                // Trigger reflow
                void ctaButtons.offsetWidth;
                ctaButtons.classList.remove('opacity-0');
                
                // Reset container height
                ctaContainer.style.height = ctaButtons.scrollHeight + 'px';
            }, 300);
        });
    }

    // Stats Counter Animation using Intersection Observer
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    let count = +counter.innerText.replace(/,/g, '');
                    const inc = target / speed;

                    if (count < target) {
                        count += inc;
                        // Determine increment size based on target to prevent floats on small numbers
                        if(target > 1000) {
                             counter.innerText = Math.ceil(count).toLocaleString();
                        } else {
                             counter.innerText = Math.ceil(count);
                        }
                       
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(counter); // Only run once
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Content for Solutions Expanded Modal
    const solutionsData = [
        {
            title: "Executive Education",
            headline: "World-Class Academic Rigour, Designed for the Workplace",
            body: "TimesPro's Executive Education portfolio gives your employees access to 200+ programmes from 50+ of India's and the world's most respected institutions — including IIM Ahmedabad, IIM Calcutta, IIT Delhi, XLRI, SPJIMR, and global universities. Delivered as MDPs and LDPs, these programmes are built around your organisation's goals, not just the individual learner's.",
            details: [
                "<strong>Delivery Formats:</strong> Blended | On-Campus | Online | Hybrid",
                "<strong>Duration:</strong> Short-term formats from 3 days onwards — designed to minimise disruption while maximising impact."
            ],
            bullets: [
                "Single-window advisory — we help you select and manage programmes across institutions",
                "Exclusive benefits and access for corporate learners",
                "Customisable elements: campus immersion, industry expert sessions, masterclasses, 1:1 coaching, group assessments, and capstone projects",
                "Dedicated Microsite Learning Hub for your employees to browse, enrol, and track"
            ]
        },
        // ... Adding placeholder logic for others to keep snippet concise, will expand full later if needed
    ];

    // Simple Modal Toggle Logic for Demo
    const modal = document.getElementById('solution-modal');
    const modalContent = document.getElementById('solution-modal-content');
    const cards = document.querySelectorAll('.solution-card');

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // For now, loading the first data item as dummy content to show functionality
            const data = solutionsData[0]; // Replace with dynamic index logic in a real build
            
            modalContent.innerHTML = `
                <div class="p-8 md:p-12 relative">
                    <button id="close-modal" class="absolute top-6 right-6 text-gray-400 hover:text-timesred transition-colors">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div class="text-timesred text-sm font-bold uppercase tracking-widest mb-4">${data.title}</div>
                    <h2 class="text-3xl font-display font-bold text-timesdark mb-6">${data.headline}</h2>
                    <p class="text-gray-600 text-lg mb-8 leading-relaxed">${data.body}</p>
                    
                    <div class="bg-gray-50 rounded-xl p-6 mb-8 space-y-4">
                        ${data.details.map(d => `<p class="text-gray-700">${d}</p>`).join('')}
                    </div>
                    
                    <h4 class="font-bold text-timesdark mb-4 text-xl">What Makes It Different</h4>
                    <ul class="space-y-3 mb-8">
                        ${data.bullets.map(b => `
                            <li class="flex items-start">
                                <svg class="w-6 h-6 text-timesred flex-shrink-0 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span class="text-gray-600">${b}</span>
                            </li>
                        `).join('')}
                    </ul>
                    
                    <button class="bg-timesnavy text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#000066] transition-colors w-full md:w-auto">
                        Request a Consultation
                    </button>
                </div>
            `;
            
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);

            document.getElementById('close-modal').addEventListener('click', closeModal);
        });
    });

    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    // Learning Ecosystem Pillars Data
    const pillars = [
        {
            id: 1,
            title: "Outcome-Driven Strategy",
            oneliner: "Every learning solution we design starts with your business goals — not a catalogue.",
            expanded: "We start with your organisation's goals — leadership pipeline, sales targets, service excellence, transformation agenda — and design every intervention around them. Agile, responsive, and aligned across functions and industries.",
            bullets: [
                "Learning mapped to leadership pipeline, sales goals, and service excellence",
                "Strategic alignment with organisational goals and transformation agendas",
                "Agile and responsive solutioning across functions and industries"
            ]
        },
        {
            id: 2,
            title: "Instructional Design Excellence",
            oneliner: "Built by people who understand how adults actually learn — and what makes learning stick.",
            expanded: "Our team of seasoned instructional architects and L&D strategists design custom learning journeys aligned with your business KPIs — drawing on deep expertise in adult learning principles, blended design, and experiential methods.",
            bullets: [
                "Custom learning journeys aligned with business KPIs",
                "Deep expertise in adult learning, blended design, and experiential methods",
                "Proprietary case studies and business scenarios for application-oriented learning"
            ]
        },
        {
            id: 3,
            title: "Multi-Modal Content",
            oneliner: "ILT, VILT, eLearning, micro and mobile learning — the right format for every learner.",
            expanded: "We deliver across a full spectrum of formats and draw on partnerships with IIMs, IITs, INSEAD, and global universities to ensure content is academically rigorous and practically relevant.",
            bullets: [
                "Diverse formats: ILT, VILT, eLearning, micro & mobile learning",
                "Experiential and application-oriented design",
                "Partnerships with IIMs, IITs, INSEAD, and global universities"
            ]
        },
        {
            id: 4,
            title: "End-to-End Delivery",
            oneliner: "Consult. Design. Deliver. Measure. No handoff gaps, no dropped threads.",
            expanded: "Seamless execution across ILT, digital, and hybrid formats — with AI-led assessments, gamification, tech sprints, and Microsite & LMS integrations built in from day one.",
            bullets: [
                "Consult > Design > Deliver > Measure approach",
                "AI-led assessment, gamification, and tech sprints",
                "Microsite & LMS integrations for learner convenience"
            ]
        },
        {
            id: 5,
            title: "Scale & Reach",
            oneliner: "1,00,000+ learners trained annually — across India and beyond, consistently.",
            expanded: "With 10,000+ empanelled facilitators, 1,000+ in-house trainers, and pan-India delivery capability, we deliver consistently across virtual, classroom, and hybrid formats at any scale.",
            bullets: [
                "10,000+ empanelled facilitators | 1,000+ in-house trainers",
                "Pan-India and global delivery capability",
                "Seamless delivery across virtual, classroom, and hybrid formats"
            ]
        },
        {
            id: 6,
            title: "Program Enablement",
            oneliner: "Dedicated managers, real-time tracking, and full operations support.",
            expanded: "Dedicated account and programme success managers handle everything before, during, and after — with live dashboards, learner feedback loops, and full IT and operations support for every format.",
            bullets: [
                "Dedicated account and programme success managers",
                "Pre-, during-, and post-programme engagement",
                "Real-time tracking, learner feedback, and analytics dashboard"
            ]
        },
        {
            id: 7,
            title: "Results & ROI",
            oneliner: "Measurement that proves transformation, not just completion.",
            expanded: "We design for outcomes — measurable improvements in capability, productivity, and behaviour. Every engagement comes with customised ROI frameworks and business-aligned reporting that makes the investment visible.",
            bullets: [
                "Impact-first design: measurable outcomes on capability, productivity, and behaviour",
                "Customised ROI frameworks and success metrics",
                "Business-aligned reporting to showcase transformation"
            ]
        }
    ];

    const tabsContainer = document.getElementById('pillar-tabs');
    const contentContainer = document.getElementById('pillar-content');

    const renderPillarContent = (pillarId) => {
        const data = pillars.find(p => p.id === pillarId);
        
        // Update Tabs styling
        document.querySelectorAll('.pillar-tab').forEach(tab => {
            if(parseInt(tab.dataset.id) === pillarId) {
                tab.classList.remove('bg-white', 'border-transparent', 'text-gray-600', 'hover:border-gray-200');
                tab.classList.add('bg-gray-50', 'border-timesred', 'text-timesnavy', 'shadow-sm');
                tab.querySelector('.tab-number').classList.add('bg-timesred', 'text-white');
                tab.querySelector('.tab-number').classList.remove('bg-gray-100', 'text-gray-500');
            } else {
                tab.classList.add('bg-white', 'border-transparent', 'text-gray-600', 'hover:border-gray-200');
                tab.classList.remove('bg-gray-50', 'border-timesred', 'text-timesnavy', 'shadow-sm');
                tab.querySelector('.tab-number').classList.remove('bg-timesred', 'text-white');
                tab.querySelector('.tab-number').classList.add('bg-gray-100', 'text-gray-500');
            }
        });

        // Fade out existing content
        contentContainer.style.opacity = '0';
        
        setTimeout(() => {
            contentContainer.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                    <div>
                        <div class="text-timesred text-sm font-bold tracking-widest uppercase mb-4">Pillar 0${data.id}</div>
                        <h3 class="text-3xl font-display font-bold text-timesdark mb-4">${data.title}</h3>
                        <p class="text-xl text-gray-800 font-medium mb-6 leading-relaxed">${data.oneliner}</p>
                        <p class="text-gray-600 mb-8 leading-relaxed">${data.expanded}</p>
                        
                        <div class="space-y-4">
                            ${data.bullets.map(b => `
                                <div class="flex items-start">
                                    <div class="w-2 h-2 rounded-full bg-timesred mt-2 mr-4 flex-shrink-0"></div>
                                    <span class="text-gray-700 font-medium">${b}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="hidden md:block w-full h-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400" alt="Learning Framework" class="absolute inset-0 w-full h-full object-cover">
                        <div class="absolute inset-0 bg-timesnavy/10 mix-blend-multiply"></div>
                    </div>
                </div>
            `;
            // Fade in new content
            contentContainer.style.opacity = '1';
        }, 200);
    };

    // Initialize tabs
    if(tabsContainer && contentContainer) {
        pillars.forEach((pillar, index) => {
            const btn = document.createElement('button');
            btn.className = `pillar-tab w-full text-left px-6 py-4 rounded-xl border-l-[3px] transition-all flex items-center group font-medium`;
            btn.dataset.id = pillar.id;
            
            btn.innerHTML = `
                <span class="tab-number w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-4 transition-colors">
                    ${pillar.id}
                </span>
                <span class="text-lg">${pillar.title}</span>
            `;

            btn.addEventListener('click', () => renderPillarContent(pillar.id));
            tabsContainer.appendChild(btn);
        });

        // Load first pillar by default
        renderPillarContent(1);
    }

});
