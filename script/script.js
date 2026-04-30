document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo');
    const nav = document.getElementById('main-nav');

    // Slow down the video to 0.50 speed
    if (video) {
        video.playbackRate = 0.85;
    }

    // Optional: Add a glassmorphism effect to navbar on scroll
    // Navbar effect on scroll
    window.addEventListener('scroll', () => {
        const logo = document.querySelector('.navbar-logo');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            if (logo) logo.classList.add('logo-hidden');
        } else {
            nav.classList.remove('scrolled');
            if (logo) logo.classList.remove('logo-hidden');
        }
    });

    // Smooth scroll for nav links (if sections were present)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Services 3D Carousel Logic
    const serviceSlides = document.querySelectorAll('.services-track .service-slide');
    const overlayContentContainer = document.getElementById('overlay-content');
    
    if (serviceSlides.length > 0) {
        let currentServiceIndex = 2; // Start with 3rd item (index 2) as center
        const totalServices = serviceSlides.length;

        const serviceMenus = [
            {
                tagline: "LENGTH, VOLUME, CONFIDENCE",
                title: "HAIR EXTENSIONS",
                items: [
                    { name: "TAPE-IN INSTALLATION (INITIAL)", price: "$250" },
                    { name: "KERATIN FUSION STRANDS", price: "$450" },
                    { name: "BEADED WEFT INSTALLATION", price: "$350" },
                    { name: "HAND-TIED WEFTS", price: "$450" },
                    { name: "CLIP-IN CUSTOM SET", price: "$180" },
                    { name: "EXTENSION REMOVAL", price: "$90" },
                    { name: "VOLUME FILL-IN (PARTIAL)", price: "$200" }
                ]
            },
            {
                tagline: "PRECISION & STYLE",
                title: "HAIRCUT & STYLING",
                items: [
                    { name: "WOMEN'S SIGNATURE CUT", price: "$85" },
                    { name: "MEN'S PRECISION CUT", price: "$45" },
                    { name: "BLOWOUT & STYLE", price: "$55" },
                    { name: "SPECIAL OCCASION UPDO", price: "$120" },
                    { name: "CHILDREN'S CUT", price: "$35" },
                    { name: "BANG TRIM", price: "$15" },
                    { name: "BEARD TRIM", price: "$20" }
                ]
            },
            {
                tagline: "VIBRANT & FLAWLESS",
                title: "HAIR COLORING",
                items: [
                    { name: "SINGLE PROCESS COLOR", price: "$110" },
                    { name: "PARTIAL HIGHLIGHTS", price: "$140" },
                    { name: "FULL HIGHLIGHTS", price: "$190" },
                    { name: "BALAYAGE / OMBRE", price: "$220" },
                    { name: "COLOR CORRECTION", price: "ASK" },
                    { name: "GLOSS / TONER", price: "$60" },
                    { name: "ROOT TOUCH-UP", price: "$80" }
                ]
            },
            {
                tagline: "NOURISH & RESTORE",
                title: "HAIR TREATMENTS",
                items: [
                    { name: "DEEP CONDITIONING MASK", price: "$45" },
                    { name: "KERATIN SMOOTHING", price: "$250" },
                    { name: "BRAZILIAN BLOWOUT", price: "$280" },
                    { name: "SCALP DETOX TREATMENT", price: "$65" },
                    { name: "OLAPLEX REPAIR", price: "$50" },
                    { name: "MOISTURE BOOST", price: "$35" },
                    { name: "SCALP MASSAGE", price: "$25" }
                ]
            },
            {
                tagline: "GLOW & RADIATE",
                title: "MAKEUP SERVICES",
                items: [
                    { name: "BRIDAL MAKEUP", price: "$180" },
                    { name: "EVENT & PARTY MAKEUP", price: "$120" },
                    { name: "AIRBRUSH MAKEUP", price: "$150" },
                    { name: "EYES ONLY", price: "$65" },
                    { name: "LASH APPLICATION", price: "$25" },
                    { name: "BROW TINT", price: "$20" },
                    { name: "MAKEUP TRIAL", price: "$90" }
                ]
            },
            {
                tagline: "RELAX & REJUVENATE",
                title: "SPA & SKINCARE",
                items: [
                    { name: "SIGNATURE FACIAL", price: "$130" },
                    { name: "ANTI-AGING FACIAL", price: "$160" },
                    { name: "HYDRAFACIAL", price: "$199" },
                    { name: "DERMAPLANING", price: "$85" },
                    { name: "BROW SHAPING", price: "$25" },
                    { name: "LIP WAX", price: "$15" },
                    { name: "NECK MASSAGE", price: "$40" }
                ]
            }
        ];

        function updateServiceCarousel() {
            serviceSlides.forEach((slide, index) => {
                slide.className = 'service-slide'; // reset all classes
                
                if (index === currentServiceIndex) {
                    slide.classList.add('slide-center');
                } else if (index === (currentServiceIndex - 1 + totalServices) % totalServices) {
                    slide.classList.add('slide-left');
                } else if (index === (currentServiceIndex + 1) % totalServices) {
                    slide.classList.add('slide-right');
                } else {
                    const diff = (index - currentServiceIndex + totalServices) % totalServices;
                    if (diff > 1 && diff <= totalServices / 2) {
                        slide.classList.add('slide-hidden-right');
                    } else {
                        slide.classList.add('slide-hidden-left');
                    }
                }
            });

            if (overlayContentContainer) {
                overlayContentContainer.style.opacity = 0;
                setTimeout(() => {
                    const menuData = serviceMenus[currentServiceIndex];
                    let listHtml = '';
                    menuData.items.forEach(item => {
                        listHtml += `<li><span class="item-name">${item.name}</span><span class="dots"></span><span class="price">${item.price}</span></li>`;
                    });
                    
                    overlayContentContainer.innerHTML = `
                        <span class="service-tagline">${menuData.tagline}</span>
                        <h2 class="service-name">${menuData.title}</h2>
                        <ul class="price-list">
                            ${listHtml}
                        </ul>
                    `;
                    overlayContentContainer.style.opacity = 1;
                }, 400); // Wait for fade out to complete before swapping
            }
        }

        setInterval(() => {
            currentServiceIndex = (currentServiceIndex + 1) % totalServices;
            updateServiceCarousel();
        }, 3000);
        
        // Setup initial display
        updateServiceCarousel();
    }

    // Video Banner Play functionality
    const videoOverlay = document.getElementById('video-banner-overlay');
    const ytVideo = document.getElementById('youtube-banner-video');
    if (videoOverlay && ytVideo) {
        videoOverlay.addEventListener('click', () => {
            // Hide the overlay
            videoOverlay.style.display = 'none';
            // Add autoplay to the iframe src to start playing
            let src = ytVideo.src;
            if (src.includes('?')) {
                ytVideo.src = src + '&autoplay=1';
            } else {
                ytVideo.src = src + '?autoplay=1';
            }
        });
    }

    // Reviews Slider Logic
    const reviewsTrack = document.getElementById('reviews-track');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dotsContainer = document.getElementById('reviews-dots');
    
    if (reviewsTrack && reviewCards.length > 0) {
        let currentReviewIndex = 0;
        let cardsVisible = 3;
        let maxReviewIndex = reviewCards.length - cardsVisible;
        let reviewAutoSlide;

        function updateReviewsSlider() {
            // Determine how many cards are visible based on screen width
            if (window.innerWidth <= 768) {
                cardsVisible = 1;
            } else if (window.innerWidth <= 1024) {
                cardsVisible = 2;
            } else {
                cardsVisible = 3;
            }

            maxReviewIndex = reviewCards.length - cardsVisible;
            if (currentReviewIndex > maxReviewIndex) currentReviewIndex = maxReviewIndex;
            
            // Calculate shift percentage and account for 30px gaps
            const percentageShift = currentReviewIndex * (100 / cardsVisible);
            const gapCorrection = currentReviewIndex * 30; 
            reviewsTrack.style.transform = `translateX(calc(-${percentageShift}% - ${gapCorrection}px))`;
            
            // Generate or update dots - only showing relevant number of dots
            // For simplicity, we can show a dot for each "possible" start position
            dotsContainer.innerHTML = '';
            const numDots = reviewCards.length - cardsVisible + 1;
            
            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === currentReviewIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentReviewIndex = i;
                    updateReviewsSlider();
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        window.addEventListener('resize', () => {
            updateReviewsSlider();
        });

        function nextReviewSlide() {
            currentReviewIndex++;
            if (currentReviewIndex > maxReviewIndex) currentReviewIndex = 0;
            updateReviewsSlider();
        }

        function prevReviewSlide() {
            currentReviewIndex--;
            if (currentReviewIndex < 0) currentReviewIndex = maxReviewIndex;
            updateReviewsSlider();
        }

        function startAutoSlide() {
            reviewAutoSlide = setInterval(nextReviewSlide, 5000);
        }

        function resetAutoSlide() {
            clearInterval(reviewAutoSlide);
            startAutoSlide();
        }

        if(nextArrow) {
            nextArrow.addEventListener('click', () => {
                nextReviewSlide();
                resetAutoSlide();
            });
        }
        
        if(prevArrow) {
            prevArrow.addEventListener('click', () => {
                prevReviewSlide();
                resetAutoSlide();
            });
        }

        // Pause on hover
        const reviewsSliderContainer = document.querySelector('.reviews-slider-container');
        if (reviewsSliderContainer) {
            reviewsSliderContainer.addEventListener('mouseenter', () => clearInterval(reviewAutoSlide));
            reviewsSliderContainer.addEventListener('mouseleave', startAutoSlide);
        }

        updateReviewsSlider();
        startAutoSlide();
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = question.classList.contains('active');
                
                // Close all FAQs
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion && otherAnswer) {
                        otherQuestion.classList.remove('active');
                        otherAnswer.style.maxHeight = null;
                    }
                });
                
                // Open clicked FAQ if it was previously closed
                if (!isOpen) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // Mobile Menu Toggle Logic
    const mobileMenuOpen = document.getElementById('mobile-menu-open');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuOpen && mobileNavOverlay) {
        mobileMenuOpen.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    if (mobileMenuClose && mobileNavOverlay) {
        mobileMenuClose.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling properly
        });
    }

    // Close overlay when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Booking Modal Logic
    const bookingModal = document.getElementById('booking-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const bookButtons = document.querySelectorAll('.btn-book, .hero-submit-btn, .service-item-btn');

    if (bookingModal) {
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Prevent default if it's a link or submit button
                if (btn.tagName === 'A' || btn.type === 'submit') {
                    e.preventDefault();
                }
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close on clicking outside the content
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
